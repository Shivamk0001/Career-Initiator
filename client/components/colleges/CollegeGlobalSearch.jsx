"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, ExternalLink, Loader2, Search } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 }
  }
};

const itemMotion = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 }
};

function CollegeCard({ college }) {
  const hasImage = Boolean(college.image);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/40 bg-white/70 shadow-md shadow-slate-900/5 backdrop-blur-md transition hover:shadow-lg hover:shadow-blue-900/10">
      <div className="relative h-40 w-full bg-gradient-to-br from-slate-100 to-blue-50">
        {hasImage ? (
          <Image
            src={college.image}
            alt={college.name || "College"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 25vw"
            unoptimized
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[#002147]/30">
            <Building2 className="h-14 w-14" strokeWidth={1.25} />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-base font-bold text-slate-900">{college.name}</h3>
        {college.location ? (
          <p className="mt-1 text-xs font-medium text-blue-800/80">{college.location}</p>
        ) : null}
        <p className="mt-2 line-clamp-3 flex-1 text-sm text-slate-600">
          {college.description || "No description available for this result."}
        </p>
        {college.website_link ? (
          <a
            href={college.website_link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-[#002147] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#003366]"
          >
            View Details
            <ExternalLink className="h-4 w-4 opacity-90" />
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="mt-4 rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm text-slate-400"
          >
            No link available
          </button>
        )}
      </div>
    </article>
  );
}

function ResultsSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl border border-white/30 bg-white/50 shadow-sm backdrop-blur-sm"
        >
          <div className="h-40 animate-pulse bg-slate-200/80" />
          <div className="space-y-3 p-4">
            <div className="h-4 w-[75%] animate-pulse rounded bg-slate-200" />
            <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
            <div className="h-3 w-5/6 animate-pulse rounded bg-slate-200" />
            <div className="h-10 animate-pulse rounded-xl bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CollegeGlobalSearch() {
  const [query, setQuery] = useState("");
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  const fetchPage = useCallback(async (searchQuery, pageNum, append) => {
    const qs = new URLSearchParams({ q: searchQuery, page: String(pageNum) });
    const res = await fetch(`/api/colleges/search?${qs.toString()}`);
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.error || "Search failed.");
    }
    if (data.error) {
      throw new Error(data.error);
    }

    const next = Array.isArray(data.results) ? data.results : [];
    if (append) {
      setResults((prev) => {
        const seen = new Set(prev.map((p) => p.website_link).filter(Boolean));
        const merged = [...prev];
        for (const row of next) {
          if (row.website_link && !seen.has(row.website_link)) {
            seen.add(row.website_link);
            merged.push(row);
          }
        }
        return merged;
      });
    } else {
      setResults(next);
    }
    setHasMore(Boolean(data.hasMore));
    setPage(pageNum);
  }, []);

  const handleSearch = async (e) => {
    e?.preventDefault?.();
    const q = input.trim();
    if (!q) {
      setError("Enter a college name to search.");
      return;
    }
    setError(null);
    setLoading(true);
    setResults([]);
    setHasMore(false);
    try {
      await fetchPage(q, 1, false);
      setQuery(q);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setResults([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (!query || loadingMore || !hasMore) return;
    setLoadingMore(true);
    setError(null);
    try {
      await fetchPage(query, page + 1, true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load more.");
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <section className="relative min-h-[70vh] px-4 py-10 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,33,71,0.08),_transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Colleges</h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Search Indian and international colleges — live results powered by Google via SerpApi.
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="mb-10 rounded-2xl border border-white/50 bg-white/40 p-4 shadow-lg shadow-slate-900/5 backdrop-blur-xl sm:p-5"
        >
          <label className="sr-only" htmlFor="college-search">
            Search colleges
          </label>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200/80 bg-white/80 px-4 py-3 shadow-inner">
              <Search className="h-5 w-5 shrink-0 text-[#002147]" />
              <input
                id="college-search"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g. IIT Bombay, Ashoka University, NUS Singapore…"
                className="min-w-0 flex-1 bg-transparent text-slate-900 placeholder:text-slate-400 outline-none"
                autoComplete="off"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#002147] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#003366] disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {loading ? "Searching…" : "Search"}
            </button>
          </div>
        </form>

        <AnimatePresence mode="wait">
          {error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"
            >
              {error}
            </motion.div>
          ) : null}
        </AnimatePresence>

        {loading ? <ResultsSkeleton /> : null}

        {!loading && query && !results.length && !error ? (
          <div className="rounded-2xl border border-slate-200 bg-white/60 py-16 text-center text-slate-600 backdrop-blur-sm">
            <Building2 className="mx-auto mb-3 h-10 w-10 text-slate-300" />
            <p className="font-medium text-slate-800">No results found</p>
            <p className="mt-1 text-sm">Try a different college name or broader keywords.</p>
          </div>
        ) : null}

        {!loading && results.length > 0 ? (
          <>
            <motion.div
              key={query + page}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {results.map((college, idx) => (
                <motion.div
                  key={`${college.website_link || college.name}-${idx}`}
                  variants={itemMotion}
                  className="h-full"
                >
                  <CollegeCard college={college} />
                </motion.div>
              ))}
            </motion.div>

            {hasMore ? (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="rounded-xl border border-slate-200 bg-white/80 px-8 py-3 text-sm font-semibold text-[#002147] shadow-sm backdrop-blur-sm transition hover:bg-white disabled:opacity-60"
                >
                  {loadingMore ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Loading…
                    </span>
                  ) : (
                    "Load more"
                  )}
                </button>
              </div>
            ) : null}
          </>
        ) : null}

        {!loading && !query && !results.length ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white/40 py-16 text-center text-slate-500 backdrop-blur-sm">
            <p className="text-slate-700">Start typing a college name and press Search.</p>
            <p className="mt-1 text-sm">Results load in real time from Google (up to 20 per page).</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
