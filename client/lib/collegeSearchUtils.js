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

  return {
    ...raw,
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
  return {
    results: Array.isArray(data.results) ? data.results : [],
    hasMore: Boolean(data.hasMore),
    page: data.page || page
  };
}
