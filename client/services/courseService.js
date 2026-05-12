import mockCourses from "@/data/mockCourses.json";
import { defaultCourseFilters } from "@/lib/courseConstants";

function parseDate(value) {
  if (!value) return null;
  const t = Date.parse(value);
  return Number.isFinite(t) ? t : null;
}

/** Midpoint of "8-12 LPA" style strings for sorting (0 if not parseable). */
export function salarySortKey(str) {
  if (!str || str === "—") return 0;
  const nums = String(str).match(/\d+(\.\d+)?/g);
  if (!nums?.length) return 0;
  if (nums.length >= 2) return (parseFloat(nums[0]) + parseFloat(nums[1])) / 2;
  return parseFloat(nums[0]);
}

function matchesMulti(selected, value) {
  if (!selected?.length) return true;
  return selected.includes(value);
}

function matchesEntranceExams(selected, courseExams) {
  if (!selected?.length) return true;
  const set = courseExams || [];
  return selected.some((e) => set.includes(e));
}

function matchesSpecializations(selected, course) {
  if (!selected?.length) return true;
  const spec = (course.specialization || "").toLowerCase();
  const name = (course.courseName || "").toLowerCase();
  return selected.some((s) => {
    const t = s.toLowerCase();
    return spec.includes(t) || name.includes(t) || spec === t;
  });
}

export function applyCourseFilters(courses, filters = defaultCourseFilters, search = "") {
  const q = search.trim().toLowerCase();
  return courses.filter((c) => {
    if (q) {
      const blob = [c.courseName, c.stream, c.specialization, ...(c.entranceExams || [])].join(" ").toLowerCase();
      if (!blob.includes(q)) return false;
    }
    if (!matchesMulti(filters.streams, c.stream)) return false;
    if (!matchesMulti(filters.levels, c.level)) return false;
    if (!matchesMulti(filters.durations, c.duration)) return false;
    if (!matchesMulti(filters.modes, c.mode)) return false;
    const fee = typeof c.fees === "number" ? c.fees : 0;
    if (fee < filters.feeMin || fee > filters.feeMax) return false;
    if ((c.rating || 0) < (filters.ratingMin || 0)) return false;
    if (!matchesEntranceExams(filters.entranceExams, c.entranceExams)) return false;
    if (!matchesSpecializations(filters.specializations, c)) return false;
    return true;
  });
}

export function sortCourses(courses, sortKey = "popularity") {
  const list = [...courses];
  const pop = (c) => (c.rating || 0) * Math.log10((c.totalStudents || 0) + 10);
  switch (sortKey) {
    case "feesLow":
      return list.sort((a, b) => (a.fees || 0) - (b.fees || 0));
    case "feesHigh":
      return list.sort((a, b) => (b.fees || 0) - (a.fees || 0));
    case "salaryHigh":
      return list.sort((a, b) => salarySortKey(b.averageSalary) - salarySortKey(a.averageSalary));
    case "latest":
      return list.sort((a, b) => (parseDate(b.createdAt) ?? 0) - (parseDate(a.createdAt) ?? 0));
    case "mostViewed":
      return list.sort((a, b) => (b.totalStudents || 0) - (a.totalStudents || 0));
    case "popularity":
    default:
      return list.sort((a, b) => pop(b) - pop(a));
  }
}

export function buildCourseQueryString({ filters, sort, search, page, pageSize }) {
  const params = new URLSearchParams();
  if (search) params.set("q", search);
  if (sort && sort !== "popularity") params.set("sort", sort);
  if (page) params.set("page", String(page));
  if (pageSize) params.set("limit", String(pageSize));
  filters.streams.forEach((s) => params.append("stream", s));
  filters.levels.forEach((s) => params.append("level", s));
  filters.durations.forEach((s) => params.append("duration", s));
  filters.modes.forEach((s) => params.append("mode", s));
  filters.entranceExams.forEach((s) => params.append("exam", s));
  filters.specializations.forEach((s) => params.append("spec", s));
  params.set("feeMin", String(filters.feeMin));
  params.set("feeMax", String(filters.feeMax));
  params.set("ratingMin", String(filters.ratingMin));
  return params.toString();
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let cachedSource = null;

function getSourceCourses() {
  if (!cachedSource) {
    cachedSource = mockCourses.map((c) => ({ ...c }));
  }
  return cachedSource;
}

export async function fetchCoursesPage({
  filters = defaultCourseFilters,
  sort = "popularity",
  search = "",
  page = 1,
  pageSize = 9,
  simulateError = false
} = {}) {
  await delay(280);
  if (simulateError) {
    const err = new Error("Unable to load courses.");
    err.code = "COURSE_FETCH_FAILED";
    throw err;
  }

  const filtered = applyCourseFilters(getSourceCourses(), filters, search);
  const sorted = sortCourses(filtered, sort);
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
    query: buildCourseQueryString({ filters, sort, search, page, pageSize })
  };
}