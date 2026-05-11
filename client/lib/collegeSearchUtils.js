/**
 * Client-side helpers for college search UI.
 * SerpApi returns: name, description, image, website_link, location
 * Enrichment adds stable display-only fields for filters/cards (until backend provides them).
 */

export const STREAM_OPTIONS = ["Engineering", "Science", "Commerce", "Arts", "Management", "Law", "Medical", "Design"];
const COURSE_POOL = ["B.Tech", "B.E.", "BBA", "MBA", "B.Sc", "M.Sc", "B.Com", "LLB", "MBBS", "B.Arch", "MCA", "B.Pharm"];
const TAG_POOL = ["NAAC A+", "UGC", "AICTE", "Research", "Placements", "Campus", "Scholarship", "Hostel"];

function hashString(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function enrichCollege(raw, index = 0) {
  const key = raw.website_link || raw.name || String(index);
  const h = hashString(key);
  const rating = Math.round((36 + (h % 14)) / 10 * 10) / 10;
  const ranking = (h % 180) + 1;
  const feeLakh = 2 + (h % 28);
  const stream = STREAM_OPTIONS[h % STREAM_OPTIONS.length];
  const courses = [
    COURSE_POOL[h % COURSE_POOL.length],
    COURSE_POOL[(h >> 3) % COURSE_POOL.length],
    COURSE_POOL[(h >> 6) % COURSE_POOL.length]
  ].filter((v, i, a) => a.indexOf(v) === i).slice(0, 3);
  const tags = [TAG_POOL[h % TAG_POOL.length], TAG_POOL[(h >> 4) % TAG_POOL.length]].filter(
    (v, i, a) => a.indexOf(v) === i
  );
  const isPublic = h % 2 === 0;
  const hostel = h % 3 !== 0;
  const scholarship = h % 4 === 0;
  const accreditation = h % 5 === 0 ? "NAAC A++" : h % 3 === 0 ? "NAAC A+" : "NAAC A";

  const loc = (raw.location || "").trim();
  const parts = loc.split(/[,|]/).map((p) => p.trim()).filter(Boolean);
  const city = parts[parts.length - 1] || loc || "India";
  const state = parts.length > 1 ? parts[parts.length - 2] : "";
  const country = /singapore|usa|uk|canada|australia|dubai|uae/i.test(raw.name + raw.description) ? "International" : "India";

  const displayName = raw.shortName || raw.name;

  const out = {
    ...raw,
    displayName,
    _id: key,
    rating,
    ranking,
    feeLakh,
    feesDisplay: `₹${feeLakh}L – ₹${feeLakh + 2}L / yr*`,
    stream,
    courses,
    tags,
    isPublic,
    hostel,
    scholarship,
    accreditation,
    city,
    state,
    country,
    coursesText: courses.join(" · ")
  };

  if (raw.ranking != null && raw.ranking !== "") out.ranking = Number(raw.ranking) || out.ranking;
  if (raw.rating != null && raw.rating !== "") out.rating = Number(raw.rating) || out.rating;
  if (raw.feesDisplay) out.feesDisplay = raw.feesDisplay;
  if (Array.isArray(raw.courses) && raw.courses.length) {
    out.courses = raw.courses;
    out.coursesText = raw.courses.join(" · ");
  }
  if (raw.coursesText) out.coursesText = raw.coursesText;
  if (Array.isArray(raw.tags) && raw.tags.length) out.tags = raw.tags;
  if (raw.shortName) out.shortName = raw.shortName;

  return out;
}

const BLOCK_HOST_SUBSTRINGS = [
  "shiksha.com",
  "collegedunia.com",
  "careers360.com",
  "indiatoday.in",
  "timesofindia",
  "ndtv.com",
  "youtube.com",
  "youtu.be",
  "facebook.com",
  "twitter.com",
  "x.com",
  "medium.com",
  "scribd.com",
  "slideshare.net",
  "reddit.com",
  "quora.com",
  "wikipedia.org/wiki/list",
  "amazon.",
  "flipkart."
];

const BLOCK_TITLE_SNIPPET = [
  "nirf ranking",
  "nirf rank",
  "nirf 20",
  "ranking 202",
  "ranking list",
  "top 10 colleges",
  "top 20 colleges",
  "top 50 colleges",
  "best colleges in",
  "top colleges in",
  "college predictor",
  "cut off list",
  "cutoff list",
  "exam date",
  "application form pdf",
  "download pdf",
  " pdf ",
  ".pdf",
  "news18",
  "india.com",
  "blog.",
  "article:",
  "list of iit",
  "list of nit",
  "full list",
  "complete list",
  "vs ",
  " compared "
];

const POSITIVE_TLD = [".ac.in", ".edu.in", ".edu/", ".ac.uk", ".edu.sg", ".gov.in", ".nic.in"];

const INSTITUTION_HINT = /\b(university|institute|college|iit|nit|iiit|bits|iim|iisc|aiims|iiser|isro|school of|academy|campus)\b/i;

/**
 * Filters noisy SerpApi organic rows (listicles, PDFs, ranking portals, etc.).
 */
export function isValidCollegeResult(item) {
  if (!item || typeof item !== "object") return false;
  const link = String(item.website_link || "").trim().toLowerCase();
  const title = String(item.name || "").trim().toLowerCase();
  const desc = String(item.description || "").trim().toLowerCase();
  const blob = `${link} ${title} ${desc}`;

  if (!link || !title) return false;
  if (link.includes(".pdf") || title.includes(".pdf")) return false;

  for (const h of BLOCK_HOST_SUBSTRINGS) {
    if (link.includes(h)) return false;
  }

  for (const phrase of BLOCK_TITLE_SNIPPET) {
    if (blob.includes(phrase)) return false;
  }

  if (/\btop\s+\d+\s+colleges\b/i.test(title) || /\bbest\s+\d+\s+colleges\b/i.test(title)) return false;

  if (/\b(nirf|nirfindia|ranking parameters)\b/i.test(title) && /\b(list|ranking|pdf|overview)\b/i.test(title)) {
    return false;
  }

  const hasAcademicHost =
    POSITIVE_TLD.some((t) => link.includes(t)) || /\.edu\b/i.test(link) || link.includes(".edu/");
  const looksInstitution = INSTITUTION_HINT.test(`${title} ${link}`);

  if (!hasAcademicHost && !looksInstitution) {
    if (!/\.(edu|ac)\./i.test(link)) return false;
  }

  return true;
}

export function sanitizeCollegeSearchResults(results) {
  if (!Array.isArray(results)) return [];
  return results.filter(isValidCollegeResult);
}

export function defaultFilters() {
  return {
    within: "",
    country: "all",
    state: "",
    city: "",
    course: "",
    stream: "all",
    feeMin: 0,
    feeMax: 50,
    ratingMin: 0,
    rankingMax: 300,
    ownership: "all",
    hostel: false,
    scholarship: false
  };
}

export function filterColleges(list, filters) {
  const w = (filters.within || "").trim().toLowerCase();
  return list.filter((c) => {
    if (w) {
      const blob = `${c.name} ${c.description} ${c.location} ${c.coursesText} ${c.tags?.join(" ")}`.toLowerCase();
      if (!blob.includes(w)) return false;
    }
    if (filters.country !== "all") {
      if (filters.country === "India" && c.country !== "India") return false;
      if (filters.country === "International" && c.country === "India") return false;
    }
    if (filters.state && !(c.state || "").toLowerCase().includes(filters.state.toLowerCase())) return false;
    if (filters.city && !(c.city || "").toLowerCase().includes(filters.city.toLowerCase())) return false;
    if (filters.course) {
      const q = filters.course.toLowerCase();
      const hit = (c.courses || []).some((x) => x.toLowerCase().includes(q)) || (c.name + c.description).toLowerCase().includes(q);
      if (!hit) return false;
    }
    if (filters.stream !== "all" && c.stream !== filters.stream) return false;
    if (c.feeLakh < filters.feeMin || c.feeLakh > filters.feeMax) return false;
    if (c.rating < filters.ratingMin) return false;
    if (c.ranking > filters.rankingMax) return false;
    if (filters.ownership === "public" && !c.isPublic) return false;
    if (filters.ownership === "private" && c.isPublic) return false;
    if (filters.hostel && !c.hostel) return false;
    if (filters.scholarship && !c.scholarship) return false;
    return true;
  });
}

export async function fetchCollegeSearchPage(q, page) {
  const qs = new URLSearchParams({ q: q.trim(), page: String(page) });
  const res = await fetch(`/api/colleges/search?${qs.toString()}`);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || "Search failed.");
  }
  if (data.error) {
    throw new Error(data.error);
  }
  const raw = Array.isArray(data.results) ? data.results : [];
  return {
    results: sanitizeCollegeSearchResults(raw),
    hasMore: Boolean(data.hasMore),
    page: data.page || page
  };
}
