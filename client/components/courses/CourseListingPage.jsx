"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, SlidersHorizontal, Sun } from "lucide-react";
import mockCourses from "@/data/mockCourses.json";
import CourseHero from "@/components/courses/CourseHero";
import CourseSearchBar from "@/components/courses/CourseSearchBar";
import CourseSidebar from "@/components/courses/CourseSidebar";
import CourseFilterDrawer from "@/components/courses/CourseFilterDrawer";
import CourseCard from "@/components/courses/CourseCard";
import CourseHighlights from "@/components/courses/CourseHighlights";
import FeaturedCategories from "@/components/courses/FeaturedCategories";
import LoadingSkeleton from "@/components/courses/LoadingSkeleton";
import EmptyState from "@/components/courses/EmptyState";
import Pagination from "@/components/colleges/Pagination";
import { COURSE_SORT_OPTIONS, defaultCourseFilters } from "@/lib/courseConstants";
import { useCourses } from "@/hooks/useCourses";

const BOOKMARK_KEY = "ci_course_bookmarks";
const COMPARE_KEY = "ci_course_compare";
const MAX_COMPARE = 3;

function readIds(key) {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeIds(key, ids) {
  try {
    localStorage.setItem(key, JSON.stringify(ids));
  } catch {
    /* ignore */
  }
}

export default function CourseListingPage() {
  const {
    filters,
    setFilters,
    toggleFilterValue,
    setFeeRange,
    setRatingMin,
    clearFilters,
    sort,
    setSort,
    search,
    setSearch,
    items,
    total,
    hasMore,
    loading,
    loadingMore,
    error,
    loadMore,
    activeFilterTags,
    removeTag
  } = useCourses({ pageSize: 9 });

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [bookmarkIds, setBookmarkIds] = useState([]);
  const [compareIds, setCompareIds] = useState([]);
  const [darkShell, setDarkShell] = useState(false);

  const catalogSize = mockCourses.length;

  const popularCourses = useMemo(() => mockCourses.filter((c) => c.isPopular).slice(0, 8), []);
  const trendingCourses = useMemo(() => mockCourses.filter((c) => c.isTrending).slice(0, 10), []);

  useEffect(() => {
    setBookmarkIds(readIds(BOOKMARK_KEY));
    setCompareIds(readIds(COMPARE_KEY));
  }, []);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2800);
  }, []);

  const toggleBookmark = useCallback(
    (course) => {
      setBookmarkIds((prev) => {
        const has = prev.includes(course.id);
        const next = has ? prev.filter((x) => x !== course.id) : [...prev, course.id];
        writeIds(BOOKMARK_KEY, next);
        showToast(has ? "Removed from saved courses" : "Saved to your list");
        return next;
      });
    },
    [showToast]
  );

  const toggleCompare = useCallback(
    (course) => {
      setCompareIds((prev) => {
        const has = prev.includes(course.id);
        if (has) {
          const next = prev.filter((x) => x !== course.id);
          writeIds(COMPARE_KEY, next);
          showToast("Removed from compare");
          return next;
        }
        if (prev.length >= MAX_COMPARE) {
          showToast(`You can compare up to ${MAX_COMPARE} courses`);
          return prev;
        }
        const next = [...prev, course.id];
        writeIds(COMPARE_KEY, next);
        showToast("Added to compare");
        return next;
      });
    },
    [showToast]
  );

  const shareCourse = useCallback(
    async (course) => {
      const url = typeof window !== "undefined" ? `${window.location.origin}/courses/${course.slug}` : "";
      if (typeof navigator !== "undefined" && navigator.share) {
        try {
          await navigator.share({ title: course.courseName, text: course.description?.slice(0, 140), url });
          return;
        } catch {
          /* fall through */
        }
      }
      try {
        await navigator.clipboard.writeText(url);
        showToast("Course link copied");
      } catch {
        showToast("Could not copy link");
      }
    },
    [showToast]
  );

  const onSelectStream = useCallback((stream) => {
    setFilters({ ...defaultCourseFilters, streams: [stream] });
    setDrawerOpen(false);
    showToast(`Filtered: ${stream}`);
  }, [setFilters, showToast]);

  const shell = darkShell
    ? "bg-slate-950 text-slate-100"
    : "bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900";

  const toolbar = darkShell
    ? "border-slate-700/80 bg-slate-900/95 backdrop-blur-md"
    : "border-slate-200/80 bg-white/95 backdrop-blur-md";

  const filterCount = activeFilterTags.length;

  const railProps = {
    bookmarkIds,
    compareIds,
    onBookmark: toggleBookmark,
    onShare: shareCourse,
    onCompare: toggleCompare
  };

  return (
    <div className={`relative min-h-screen pb-20 pt-4 sm:pt-6 ${shell}`}>
      {!darkShell ? (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(0,33,71,0.1),transparent)]" />
      ) : (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(59,130,246,0.06),transparent)]" />
      )}

      <AnimatePresence mode="wait">
        {toast ? (
          <motion.div
            key={toast}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed bottom-6 left-1/2 z-[60] max-w-[min(92vw,420px)] -translate-x-1/2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-center text-sm font-medium text-slate-800 shadow-xl"
            role="status"
          >
            {toast}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6">
        <CourseHero totalInDirectory={catalogSize} onTagClick={(tag) => setSearch(tag)} />

        {/* Sticky search + sort while scrolling (esp. mobile) */}
        <div
          className={`sticky top-20 z-30 -mx-4 mt-4 border-y px-4 py-3 sm:-mx-6 sm:top-24 sm:px-6 lg:top-24 ${toolbar}`}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 flex-1">
              <CourseSearchBar
                value={search}
                onChange={setSearch}
                sort={sort}
                onSortChange={setSort}
                sortOptions={COURSE_SORT_OPTIONS}
                variant={darkShell ? "dark" : "light"}
              />
            </div>
            <button
              type="button"
              onClick={() => setDarkShell((d) => !d)}
              className={`inline-flex shrink-0 items-center gap-2 self-end rounded-xl border px-3 py-2 text-xs font-semibold shadow-sm sm:self-center ${
                darkShell
                  ? "border-slate-600 bg-slate-800 text-slate-100"
                  : "border-slate-200 bg-white text-slate-700"
              }`}
              aria-pressed={darkShell}
            >
              {darkShell ? <Sun className="h-4 w-4 text-amber-300" /> : <Moon className="h-4 w-4 text-[#002147]" />}
              {darkShell ? "Light" : "Dim"}
            </button>
          </div>
        </div>

        {activeFilterTags.length > 0 ? (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className={`text-xs font-semibold ${darkShell ? "text-slate-400" : "text-slate-500"}`}>Active:</span>
            {activeFilterTags.map((tag) => (
              <button
                key={tag.key}
                type="button"
                onClick={() => removeTag(tag)}
                className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-medium text-orange-900 ring-1 ring-orange-200 hover:bg-orange-100"
              >
                {tag.label}
                <span className="text-orange-600" aria-hidden>
                  ×
                </span>
              </button>
            ))}
            <button
              type="button"
              onClick={clearFilters}
              className={`text-xs font-semibold underline-offset-2 hover:underline ${darkShell ? "text-sky-400" : "text-[#002147]"}`}
            >
              Clear all
            </button>
          </div>
        ) : null}

        <p className={`mt-2 text-sm ${darkShell ? "text-slate-400" : "text-slate-600"}`}>
          {loading ? (
            <span>Loading directory…</span>
          ) : (
            <>
              <span className={`font-semibold ${darkShell ? "text-sky-400" : "text-[#002147]"}`}>{total}</span> programmes
              match
              {search ? (
                <>
                  {" "}
                  for “<span className="font-medium">{search}</span>”
                </>
              ) : null}
            </>
          )}
        </p>

        <FeaturedCategories onSelectStream={onSelectStream} />

        <CourseHighlights
          popularCourses={popularCourses}
          trendingCourses={trendingCourses}
          {...railProps}
        />

        <div className="mt-10 flex items-center justify-between gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold shadow-sm ${
              darkShell ? "border-slate-600 bg-slate-800 text-slate-100" : "border-slate-200 bg-white text-[#002147]"
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {filterCount > 0 ? (
              <span className="rounded-full bg-orange-500 px-2 py-0.5 text-[11px] text-white">{filterCount}</span>
            ) : null}
          </button>
        </div>

        <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-start">
          <div className="hidden w-full max-w-[320px] shrink-0 lg:block">
            <CourseSidebar
              filters={filters}
              onToggle={toggleFilterValue}
              onClearAll={clearFilters}
              onFeeRange={setFeeRange}
              onRatingMin={setRatingMin}
            />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="mb-4 text-lg font-bold text-slate-900 sm:text-xl">All programmes</h2>
            {error ? (
              <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800" role="alert">
                {error}
              </div>
            ) : null}

            {loading ? <LoadingSkeleton count={9} /> : null}

            {!loading && !error && items.length === 0 ? (
              <EmptyState
                title="No courses match"
                subtitle="Try widening the fee range, clearing specialization filters, or searching with a shorter keyword."
                onOpenFilters={() => setDrawerOpen(true)}
              />
            ) : null}

            {!loading && !error && items.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    bookmarked={bookmarkIds.includes(course.id)}
                    compared={compareIds.includes(course.id)}
                    compareDisabled={compareIds.length >= MAX_COMPARE && !compareIds.includes(course.id)}
                    onBookmark={toggleBookmark}
                    onShare={shareCourse}
                    onCompare={toggleCompare}
                  />
                ))}
              </div>
            ) : null}

            {!loading && !error && items.length > 0 ? (
              <Pagination hasMore={hasMore} loading={loadingMore} onLoadMore={loadMore} className="pt-8" />
            ) : null}
          </div>
        </div>
      </div>

      <CourseFilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        onToggle={toggleFilterValue}
        onClearAll={clearFilters}
        onFeeRange={setFeeRange}
        onRatingMin={setRatingMin}
      />
    </div>
  );
}
