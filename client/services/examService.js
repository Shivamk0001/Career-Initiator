import mockExams from "@/data/mockExams.json";
import { defaultExamFilters } from "@/lib/examConstants";

const MS_DAY = 86400000;

function parseDate(value) {
  if (!value) return null;
  const t = Date.parse(value);
  return Number.isFinite(t) ? t : null;
}

function matchesMultiFilter(selected, value) {
  if (!selected?.length) return true;
  return selected.includes(value);
}

/**
 * Client-side filter (mirrors future API query semantics).
 * When wiring a real backend, send the same keys in the query string / POST body.
 */
export function applyExamFilters(exams, filters = defaultExamFilters, search = "") {
  const q = search.trim().toLowerCase();
  return exams.filter((exam) => {
    if (q) {
      const blob = `${exam.examName} ${exam.description} ${exam.stream}`.toLowerCase();
      if (!blob.includes(q)) return false;
    }
    if (!matchesMultiFilter(filters.streams, exam.stream)) return false;
    if (!matchesMultiFilter(filters.levels, exam.level)) return false;
    if (!matchesMultiFilter(filters.modes, exam.mode)) return false;
    if (!matchesMultiFilter(filters.examTypes, exam.examType)) return false;
    if (!matchesMultiFilter(filters.applicationStatuses, exam.applicationStatus)) return false;
    return true;
  });
}

export function sortExams(exams, sortKey = "latest") {
  const list = [...exams];
  switch (sortKey) {
    case "deadline":
      return list.sort((a, b) => (parseDate(a.registrationEnd) ?? Infinity) - (parseDate(b.registrationEnd) ?? Infinity));
    case "popularity":
      return list.sort((a, b) => (b.popularityScore ?? 0) - (a.popularityScore ?? 0));
    case "upcoming":
      return list.sort((a, b) => (parseDate(a.examDate) ?? Infinity) - (parseDate(b.examDate) ?? Infinity));
    case "latest":
    default:
      return list.sort((a, b) => (parseDate(b.createdAt) ?? 0) - (parseDate(a.createdAt) ?? 0));
  }
}

/**
 * Serialize filters for a future REST call (e.g. ?stream=Engineering&stream=Medical&sort=latest).
 */
export function buildExamQueryString({ filters, sort, search, page, pageSize }) {
  const params = new URLSearchParams();
  if (search) params.set("q", search);
  if (sort && sort !== "latest") params.set("sort", sort);
  if (page) params.set("page", String(page));
  if (pageSize) params.set("limit", String(pageSize));
  filters.streams.forEach((s) => params.append("stream", s));
  filters.levels.forEach((s) => params.append("level", s));
  filters.modes.forEach((s) => params.append("mode", s));
  filters.examTypes.forEach((s) => params.append("examType", s));
  filters.applicationStatuses.forEach((s) => params.append("applicationStatus", s));
  return params.toString();
}

/**
 * Simulated network latency — swap implementation for `fetch("/api/exams?...")` later.
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let cachedSource = null;

function getSourceExams() {
  if (!cachedSource) {
    cachedSource = mockExams.map((e) => ({ ...e }));
  }
  return cachedSource;
}

/**
 * @param {object} options
 * @param {object} options.filters
 * @param {string} options.sort
 * @param {string} options.search
 * @param {number} options.page — 1-based
 * @param {number} options.pageSize
 * @param {boolean} options.simulateError — for QA only
 */
export async function fetchExamsPage({
  filters = defaultExamFilters,
  sort = "latest",
  search = "",
  page = 1,
  pageSize = 6,
  simulateError = false
} = {}) {
  await delay(380);
  if (simulateError) {
    const err = new Error("Unable to load exams. Please try again.");
    err.code = "EXAM_FETCH_FAILED";
    throw err;
  }

  const filtered = applyExamFilters(getSourceExams(), filters, search);
  const sorted = sortExams(filtered, sort);
  const total = sorted.length;
  const start = (page - 1) * pageSize;
  const items = sorted.slice(start, start + pageSize);
  const hasMore = start + items.length < total;

  return {
    items,
    total,
    page,
    pageSize,
    hasMore,
    query: buildExamQueryString({ filters, sort, search, page, pageSize })
  };
}

/** Reset in-memory mock mutations (tests / hot reload). */
export function resetExamMockCache() {
  cachedSource = null;
}

export function formatExamDate(iso) {
  if (!iso) return "—";
  const t = parseDate(iso);
  if (t == null) return iso;
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(t);
}

export function daysUntil(iso) {
  const t = parseDate(iso);
  if (t == null) return null;
  return Math.ceil((t - Date.now()) / MS_DAY);
}
