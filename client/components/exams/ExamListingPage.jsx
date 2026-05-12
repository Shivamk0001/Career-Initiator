"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, SlidersHorizontal, Sparkles, Sun } from "lucide-react";
import ExamFilters from "@/components/exams/ExamFilters";
import ExamFilterDrawer from "@/components/exams/ExamFilterDrawer";
import ExamSearchBar from "@/components/exams/ExamSearchBar";
import ExamCard from "@/components/exams/ExamCard";
import EmptyState from "@/components/exams/EmptyState";
import LoadingSkeleton from "@/components/exams/LoadingSkeleton";
import Pagination from "@/components/colleges/Pagination";
import { SORT_OPTIONS } from "@/lib/examConstants";
import { useExams } from "@/hooks/useExams";

const BOOKMARK_KEY = "ci_exam_bookmarks";

function readBookmarks() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(BOOKMARK_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeBookmarks(ids) {
  try {
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(ids));
  } catch {
    /* ignore */
  }
}

export default function ExamListingPage() {
  const {
    filters,
    toggleFilterValue,
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
  } = useExams({ pageSize: 6 });

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [bookmarkIds, setBookmarkIds] = useState([]);
  const [darkShell, setDarkShell] = useState(false);

  useEffect(() => {
    setBookmarkIds(readBookmarks());
  }, []);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2800);
  }, []);

  const toggleBookmark = useCallback(
    (exam) => {
      setBookmarkIds((prev) => {
        const has = prev.includes(exam.id);
        const next = has ? prev.filter((x) => x !== exam.id) : [...prev, exam.id];
        writeBookmarks(next);
        showToast(has ? "Removed from saved exams" : "Saved to your list");
        return next;
      });
    },
    [showToast]
  );

  const shareExam = useCallback(
    async (exam) => {
      const url = typeof window !== "undefined" ? `${window.location.origin}/exams/${exam.slug}` : "";
      if (typeof navigator !== "undefined" && navigator.share) {
        try {
          await navigator.share({ title: exam.examName, text: exam.description?.slice(0, 140), url });
          return;
        } catch {
          /* fall through */
        }
      }
      try {
        await navigator.clipboard.writeText(url);
        showToast("Exam link copied to clipboard");
      } catch {
        showToast("Could not copy link");
      }
    },
    [showToast]
  );

  const setAlert = useCallback(
    (exam) => {
      showToast(`Alert set for “${exam.examName}”. We’ll remind you before key dates.`);
    },
    [showToast]
  );

  const onQuickAction = useCallback(
    (key, exam) => {
      const map = {
        eligibility: exam.eligibility,
        examPattern: exam.examPattern,
        syllabus: exam.syllabus,
        mockTest: "Official mock tests — see full details page.",
        samplePapers: "Sample papers — see full details page.",
        apply: "Redirect to official registration portal when backend is connected."
      };
      const text = map[key] || "";
      showToast(text.length > 140 ? `${text.slice(0, 137)}…` : text);
    },
    [showToast]
  );

  const shell = darkShell
    ? "bg-slate-950 text-slate-100"
    : "bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900";

  const heroCard = darkShell
    ? "border-slate-700/80 bg-gradient-to-br from-slate-900 via-slate-900 to-[#0a1628]"
    : "border-slate-200/80 bg-gradient-to-br from-[#002147] via-[#003366] to-[#0a4d8c]";

  const toolbarSticky = darkShell
    ? "border-slate-700/80 bg-slate-900/95 backdrop-blur-md"
    : "border-slate-200/80 bg-white/95 backdrop-blur-md";

  const filterCount = useMemo(() => activeFilterTags.length, [activeFilterTags]);

  return (
    <div className={`relative min-h-screen pb-16 pt-4 sm:pt-6 ${shell}`}>
      {!darkShell ? (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,33,71,0.12),transparent)]" />
      ) : (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(59,130,246,0.08),transparent)]" />
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
        <section
          className={`relative overflow-hidden rounded-3xl border px-6 py-10 text-white shadow-2xl sm:px-10 sm:py-12 ${heroCard}`}
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-200 ring-1 ring-white/20">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Exam directory
            </p>
            <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Explore entrance exams
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-blue-100/90 sm:text-base">
              National, state, and university-level exams in one place — filter by stream, mode, and application status.
              Built for quick discovery and deep-dive prep.
            </p>
          </motion.div>
        </section>

        <div
          className={`sticky top-20 z-30 -mx-4 mt-6 border-y px-4 py-3 sm:-mx-6 sm:top-24 sm:px-6 lg:static lg:mx-0 lg:mt-8 lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 ${toolbarSticky} lg:backdrop-blur-0`}
        >
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0 flex-1">
              <ExamSearchBar
                value={search}
                onChange={setSearch}
                sort={sort}
                onSortChange={setSort}
                sortOptions={SORT_OPTIONS}
                variant={darkShell ? "dark" : "light"}
              />
            </div>
            <div className="flex items-center justify-end gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setDarkShell((d) => !d)}
                className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold shadow-sm transition ${
                  darkShell
                    ? "border-slate-600 bg-slate-800 text-slate-100 hover:bg-slate-700"
                    : "border-slate-200 bg-white text-slate-700 hover:border-orange-200"
                }`}
                aria-pressed={darkShell}
                title="Toggle page contrast"
              >
                {darkShell ? <Sun className="h-4 w-4 text-amber-300" /> : <Moon className="h-4 w-4 text-[#002147]" />}
                {darkShell ? "Light" : "Dim"}
              </button>
            </div>
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
                className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-medium text-orange-900 ring-1 ring-orange-200 transition hover:bg-orange-100"
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
              className="text-xs font-semibold text-[#002147] underline-offset-2 hover:underline"
            >
              Clear all
            </button>
          </div>
        ) : null}

        <p className={`mt-2 text-sm ${darkShell ? "text-slate-400" : "text-slate-600"}`}>
          {loading ? (
            <span>Loading exams…</span>
          ) : (
            <>
              <span className={`font-semibold ${darkShell ? "text-sky-400" : "text-[#002147]"}`}>{total}</span> exams match
              your criteria
              {search ? (
                <>
                  {" "}
                  for “<span className="font-medium">{search}</span>”
                </>
              ) : null}
            </>
          )}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold shadow-sm ${
              darkShell
                ? "border-slate-600 bg-slate-800 text-slate-100"
                : "border-slate-200 bg-white text-[#002147]"
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {filterCount > 0 ? (
              <span className="rounded-full bg-orange-500 px-2 py-0.5 text-[11px] text-white">{filterCount}</span>
            ) : null}
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className="hidden w-full max-w-[300px] shrink-0 lg:block">
            <ExamFilters filters={filters} onToggle={toggleFilterValue} onClearAll={clearFilters} />
          </div>

          <div className="min-w-0 flex-1">
            {error ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"
                role="alert"
              >
                {error}
              </motion.div>
            ) : null}

            {loading ? <LoadingSkeleton count={4} /> : null}

            {!loading && !error && items.length === 0 ? (
              <EmptyState
                title="No exams match your filters"
                subtitle="Try clearing filters or searching with a broader keyword like “engineering” or “MBA”."
                showFiltersCta
                onOpenFilters={() => setDrawerOpen(true)}
              />
            ) : null}

            {!loading && !error && items.length > 0 ? (
              <ul className="space-y-6">
                {items.map((exam) => (
                  <li key={exam.id}>
                    <ExamCard
                      exam={exam}
                      bookmarked={bookmarkIds.includes(exam.id)}
                      onBookmark={toggleBookmark}
                      onShare={shareExam}
                      onAlert={setAlert}
                      onQuickAction={onQuickAction}
                    />
                  </li>
                ))}
              </ul>
            ) : null}

            {!loading && !error && items.length > 0 ? (
              <Pagination hasMore={hasMore} loading={loadingMore} onLoadMore={loadMore} className="pb-4" />
            ) : null}
          </div>
        </div>
      </div>

      <ExamFilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        onToggle={toggleFilterValue}
        onClearAll={clearFilters}
      />
    </div>
  );
}
