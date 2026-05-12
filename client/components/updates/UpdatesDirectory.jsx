"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import UpdatesHero from "@/components/updates/UpdatesHero";
import UpdatesStats from "@/components/updates/UpdatesStats";
import UpdatesSearchFilter from "@/components/updates/UpdatesSearchFilter";
import FeaturedUpdateCard from "@/components/updates/FeaturedUpdateCard";
import UpdatesGrid from "@/components/updates/UpdatesGrid";
import TrendingTopics from "@/components/updates/TrendingTopics";
import NewsletterCTA from "@/components/updates/NewsletterCTA";
import { UPDATES } from "@/data/updates";

const BOOKMARK_KEY = "ci_update_bookmarks";

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

function parseDate(iso) {
  const t = new Date(iso).getTime();
  return Number.isFinite(t) ? t : 0;
}

function trendingScore(u) {
  const views = u.views || 0;
  const days = Math.max(0, (Date.now() - parseDate(u.date)) / 86400000);
  return views / (1 + days * 0.12);
}

export default function UpdatesDirectory() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sort, setSort] = useState("latest");
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [toast, setToast] = useState("");

  useEffect(() => {
    setBookmarkedIds(readBookmarks());
  }, []);

  useEffect(() => {
    const topic = searchParams.get("topic");
    if (topic) setSearch(decodeURIComponent(topic.replace(/\+/g, " ")));
  }, [searchParams]);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2400);
  }, []);

  const onToggleBookmark = useCallback(
    (update) => {
      setBookmarkedIds((prev) => {
        const has = prev.includes(update.id);
        const next = has ? prev.filter((x) => x !== update.id) : [...prev, update.id];
        writeBookmarks(next);
        showToast(has ? "Removed from saved updates" : "Saved update");
        return next;
      });
    },
    [showToast]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return UPDATES.filter((u) => {
      if (activeCategory !== "all" && u.category !== activeCategory) return false;
      if (!q) return true;
      const blob = [u.title, u.excerpt, u.category, ...(u.tags || [])].join(" ").toLowerCase();
      return blob.includes(q);
    });
  }, [search, activeCategory]);

  const sorted = useMemo(() => {
    const list = [...filtered];
    if (sort === "latest") {
      return list.sort((a, b) => parseDate(b.date) - parseDate(a.date));
    }
    if (sort === "popular") {
      return list.sort((a, b) => (b.views || 0) - (a.views || 0));
    }
    if (sort === "trending") {
      return list.sort((a, b) => trendingScore(b) - trendingScore(a));
    }
    return list;
  }, [filtered, sort]);

  const featuredUpdate = useMemo(() => {
    const feat = sorted.find((u) => u.featured);
    return feat || sorted[0] || null;
  }, [sorted]);

  const gridUpdates = useMemo(() => {
    if (!featuredUpdate) return sorted;
    return sorted.filter((u) => u.slug !== featuredUpdate.slug);
  }, [sorted, featuredUpdate]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 pb-20 pt-4 sm:pt-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(0,33,71,0.1),transparent)]" />

      <AnimatePresence mode="wait">
        {toast ? (
          <motion.div
            key={toast}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-6 left-1/2 z-[60] max-w-sm -translate-x-1/2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-center text-sm font-medium text-slate-800 shadow-xl"
            role="status"
          >
            {toast}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6">
        <UpdatesHero />
        <UpdatesStats />

        <div className="mt-10">
          <UpdatesSearchFilter
            search={search}
            onSearchChange={setSearch}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            sort={sort}
            onSortChange={setSort}
          />
        </div>

        <section className="mt-12 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Featured update</h2>
            <p className="mt-1 text-sm text-slate-600">Editor&apos;s pick — deadlines, circulars, and high-impact news.</p>
          </div>
          <FeaturedUpdateCard update={featuredUpdate} />
        </section>

        <section className="mt-14">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Latest updates</h2>
              <p className="mt-1 text-sm text-slate-600">
                {gridUpdates.length} article{gridUpdates.length !== 1 ? "s" : ""} — exams, admissions, scholarships, and careers.
              </p>
            </div>
          </div>
          <UpdatesGrid updates={gridUpdates} bookmarkedIds={bookmarkedIds} onToggleBookmark={onToggleBookmark} />
        </section>

        <TrendingTopics />
        <NewsletterCTA />
      </div>
    </div>
  );
}
