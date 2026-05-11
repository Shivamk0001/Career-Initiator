"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, Sparkles } from "lucide-react";
import SearchBar from "@/components/colleges/SearchBar";
import FiltersSidebar from "@/components/colleges/FiltersSidebar";
import MobileFilterDrawer from "@/components/colleges/MobileFilterDrawer";
import TopCollegesCarousel from "@/components/colleges/TopCollegesCarousel";
import CollegeGrid from "@/components/colleges/CollegeGrid";
import CollegeGridSkeleton from "@/components/colleges/CollegeSkeleton";
import EmptyState from "@/components/colleges/EmptyState";
import Pagination from "@/components/colleges/Pagination";
import { MOCK_TOP_COLLEGES, QUICK_CATEGORIES } from "@/components/colleges/collegeSearchConstants";
import {
  defaultFilters,
  enrichCollege,
  fetchCollegeSearchPage,
  filterColleges
} from "@/lib/collegeSearchUtils";

const WISH_KEY = "ci_college_wishlist";
const CMP_KEY = "ci_college_compare";

function buildFeaturedFromMock() {
  return MOCK_TOP_COLLEGES.map((m, i) => {
    const e = enrichCollege(
      {
        name: m.name,
        description: m.description || "",
        image: m.image,
        website_link: m.website_link,
        location: m.location
      },
      i
    );
    return {
      ...e,
      ranking: m.ranking,
      rating: m.rating,
      feesDisplay: m.feesDisplay,
      courses: m.courses,
      coursesText: m.courses.join(" · ")
    };
  });
}

function readList(key) {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeList(key, list) {
  try {
    localStorage.setItem(key, JSON.stringify(list));
  } catch {
    /* ignore */
  }
}

export default function CollegeSearchPage() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [resultsRaw, setResultsRaw] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(defaultFilters);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [topColleges, setTopColleges] = useState(() => buildFeaturedFromMock());
  const [wishlist, setWishlist] = useState([]);
  const [compareList, setCompareList] = useState([]);

  useEffect(() => {
    setWishlist(readList(WISH_KEY));
    setCompareList(readList(CMP_KEY));
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { results } = await fetchCollegeSearchPage("NIRF ranked colleges India 2024", 1);
        if (cancelled) return;
        if (results.length >= 8) {
          setTopColleges(results.slice(0, 16).map((r, i) => enrichCollege(r, i)));
        }
      } catch {
        /* keep mock */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2600);
  };

  const enriched = useMemo(() => resultsRaw.map((r, i) => enrichCollege(r, i)), [resultsRaw]);

  const filtered = useMemo(() => filterColleges(enriched, filters), [enriched, filters]);

  const activeChips = useMemo(() => {
    const chips = [];
    if (filters.within) chips.push({ key: "w", label: `In results: ${filters.within}` });
    if (filters.country !== "all") chips.push({ key: "c", label: filters.country });
    if (filters.state) chips.push({ key: "st", label: filters.state });
    if (filters.city) chips.push({ key: "ci", label: filters.city });
    if (filters.course) chips.push({ key: "co", label: filters.course });
    if (filters.stream !== "all") chips.push({ key: "str", label: filters.stream });
    if (filters.ratingMin > 0) chips.push({ key: "r", label: `${filters.ratingMin}+★` });
    if (filters.rankingMax < 300) chips.push({ key: "rk", label: `Rank ≤ ${filters.rankingMax}` });
    if (filters.ownership !== "all") chips.push({ key: "o", label: filters.ownership });
    if (filters.hostel) chips.push({ key: "h", label: "Hostel" });
    if (filters.scholarship) chips.push({ key: "s", label: "Scholarship" });
    if (filters.feeMin > 0 || filters.feeMax < 50) chips.push({ key: "f", label: `Fees ₹${filters.feeMin}–${filters.feeMax}L` });
    return chips;
  }, [filters]);

  const handleSearch = async (term) => {
    const t = (term ?? input).trim();
    if (!t) {
      setError("Enter a college or keyword to search.");
      return;
    }
    setInput(t);
    setError(null);
    setLoading(true);
    setResultsRaw([]);
    setHasMore(false);
    setPage(1);
    try {
      const { results, hasMore: more } = await fetchCollegeSearchPage(t, 1);
      setResultsRaw(results);
      setHasMore(more);
      setQuery(t);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Search failed.");
      setResultsRaw([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (!query || loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const { results, hasMore: more } = await fetchCollegeSearchPage(query, nextPage);
      setResultsRaw((prev) => {
        const seen = new Set(prev.map((p) => p.website_link).filter(Boolean));
        const merged = [...prev];
        for (const row of results) {
          if (row.website_link && !seen.has(row.website_link)) {
            seen.add(row.website_link);
            merged.push(row);
          }
        }
        return merged;
      });
      setPage(nextPage);
      setHasMore(more);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load more.");
    } finally {
      setLoadingMore(false);
    }
  };

  const clearFilters = () => {
    setFilters(defaultFilters());
    setDrawerOpen(false);
  };

  const toggleWish = (c) => {
    const id = c._id || c.website_link;
    setWishlist((prev) => {
      const exists = prev.some((x) => (x._id || x.website_link) === id);
      const next = exists ? prev.filter((x) => (x._id || x.website_link) !== id) : [...prev, { ...c }];
      writeList(WISH_KEY, next);
      showToast(exists ? "Removed from saved" : "Saved to your list");
      return next;
    });
  };

  const toggleCompare = (c) => {
    const id = c._id || c.website_link;
    setCompareList((prev) => {
      const exists = prev.some((x) => (x._id || x.website_link) === id);
      if (exists) {
        const next = prev.filter((x) => (x._id || x.website_link) !== id);
        writeList(CMP_KEY, next);
        showToast("Removed from compare");
        return next;
      }
      if (prev.length >= 3) {
        showToast("You can compare up to 3 colleges.");
        return prev;
      }
      const next = [...prev, { ...c }];
      writeList(CMP_KEY, next);
      showToast("Added to compare");
      return next;
    });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 pb-16 pt-4 sm:pt-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,33,71,0.12),transparent)]" />

      <AnimatePresence mode="wait">
        {toast ? (
          <motion.div
            key={toast}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-800 shadow-xl"
          >
            {toast}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-[#002147] via-[#003366] to-[#0a4d8c] px-6 py-12 text-white shadow-2xl sm:px-10 sm:py-14">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-200 ring-1 ring-white/20">
              <Sparkles className="h-3.5 w-3.5" />
              College Search & Discovery
            </p>
            <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Find Your Perfect College
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-blue-100/90 sm:text-base">
              Explore institutions across India and abroad. Real-time search with smart filters — built for students who
              want clarity, not clutter.
            </p>
          </motion.div>
          <div className="relative z-10 mt-8">
            <SearchBar value={input} onChange={setInput} onSearch={handleSearch} loading={loading} />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="text-xs font-semibold text-blue-200/90">Quick categories:</span>
            {QUICK_CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                type="button"
                onClick={() => {
                  setInput(cat.q);
                  handleSearch(cat.q);
                }}
                className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm transition hover:border-orange-300 hover:bg-orange-500/20"
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        <div className="mt-10">
          <TopCollegesCarousel colleges={topColleges} />
        </div>

        <div className="mt-6 flex items-center justify-between gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-[#002147] shadow-sm"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeChips.length ? (
              <span className="rounded-full bg-orange-500 px-2 py-0.5 text-[11px] text-white">{activeChips.length}</span>
            ) : null}
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className="hidden w-full max-w-[300px] shrink-0 lg:block">
            <FiltersSidebar
              filters={filters}
              onChange={setFilters}
              onClear={clearFilters}
              activeChips={activeChips}
            />
          </div>

          <div className="min-w-0 flex-1">
            <AnimatePresence mode="wait">
              {error ? (
                <motion.div
                  key="err"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"
                >
                  {error}
                </motion.div>
              ) : null}
            </AnimatePresence>

            {loading ? <CollegeGridSkeleton count={5} /> : null}

            {!loading && query && !enriched.length ? (
              <EmptyState
                title="No results found"
                subtitle="Try different keywords or check your SerpApi configuration in .env.local."
                hasQuery
              />
            ) : null}

            {!loading && query && enriched.length > 0 && !filtered.length ? (
              <EmptyState
                title="No colleges match your filters"
                subtitle="Try clearing filters or broadening your search keywords."
                hasQuery
              />
            ) : null}

            {!loading && query && filtered.length > 0 ? (
              <>
                <p className="mb-4 text-sm text-slate-500">
                  Showing <span className="font-semibold text-slate-800">{filtered.length}</span> of{" "}
                  <span className="font-semibold text-slate-800">{enriched.length}</span> in this search
                </p>
                <CollegeGrid
                  colleges={filtered}
                  wishlist={wishlist}
                  compareList={compareList}
                  onSave={toggleWish}
                  onCompare={toggleCompare}
                />
                <Pagination hasMore={hasMore} loading={loadingMore} onLoadMore={handleLoadMore} />
              </>
            ) : null}

            {!loading && !query ? (
              <EmptyState
                title="Start your college search"
                subtitle="Use the search bar above or pick a quick category. Results appear here without refreshing the page."
              />
            ) : null}
          </div>
        </div>
      </div>

      <MobileFilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        onFilterChange={setFilters}
        onClear={clearFilters}
        activeChips={activeChips}
      />
    </div>
  );
}
