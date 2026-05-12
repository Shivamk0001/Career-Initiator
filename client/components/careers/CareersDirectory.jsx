"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CareersHero from "@/components/careers/CareersHero";
import CareerStats from "@/components/careers/CareerStats";
import CareersSearchFilter from "@/components/careers/CareersSearchFilter";
import CareerCategories from "@/components/careers/CareerCategories";
import CareerGrid from "@/components/careers/CareerGrid";
import WhyChooseCareerSection from "@/components/careers/WhyChooseCareerSection";
import CareerCTA from "@/components/careers/CareerCTA";
import { CAREERS } from "@/data/careers";
import { salarySortKey } from "@/services/courseService";

const BOOKMARK_KEY = "ci_career_bookmarks";

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

function growthNum(g) {
  const n = parseInt(String(g).replace(/[^\d]/g, ""), 10);
  return Number.isFinite(n) ? n : 0;
}

/** Composes all careers page sections + client-side filter/sort state. */
export default function CareersDirectory() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sort, setSort] = useState("popular");
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [toast, setToast] = useState("");

  useEffect(() => {
    setBookmarkedIds(readBookmarks());
  }, []);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2400);
  }, []);

  const onToggleBookmark = useCallback(
    (career) => {
      setBookmarkedIds((prev) => {
        const has = prev.includes(career.id);
        const next = has ? prev.filter((x) => x !== career.id) : [...prev, career.id];
        writeBookmarks(next);
        showToast(has ? "Removed from saved careers" : "Saved career");
        return next;
      });
    },
    [showToast]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return CAREERS.filter((c) => {
      if (activeCategory !== "all" && c.category !== activeCategory) return false;
      if (!q) return true;
      const blob = [c.title, c.shortDescription, c.category, ...(c.skills || [])].join(" ").toLowerCase();
      return blob.includes(q);
    });
  }, [search, activeCategory]);

  const sorted = useMemo(() => {
    const list = [...filtered];
    if (sort === "salary") {
      return list.sort((a, b) => salarySortKey(b.averageSalary) - salarySortKey(a.averageSalary));
    }
    if (sort === "growth") {
      return list.sort((a, b) => growthNum(b.growth) - growthNum(a.growth));
    }
    return list.sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return a.title.localeCompare(b.title);
    });
  }, [filtered, sort]);

  const featuredFirst = useMemo(() => {
    const feat = sorted.filter((c) => c.featured);
    const rest = sorted.filter((c) => !c.featured);
    return [...feat, ...rest];
  }, [sorted]);

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
        <CareersHero />
        <CareerStats />

        <div className="mt-12">
          <CareersSearchFilter
            search={search}
            onSearchChange={setSearch}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            sort={sort}
            onSortChange={setSort}
          />
        </div>

        <CareerCategories onPickCategory={(id) => setActiveCategory(id)} />

        <section className="mt-14">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Featured careers</h2>
              <p className="mt-1 text-sm text-slate-600">
                {sorted.length} career{sorted.length !== 1 ? "s" : ""} shown — eligibility, skills, and salary at a glance.
              </p>
            </div>
          </div>
          <CareerGrid careers={featuredFirst} bookmarkedIds={bookmarkedIds} onToggleBookmark={onToggleBookmark} />
        </section>

        <WhyChooseCareerSection />
        <CareerCTA />
      </div>
    </div>
  );
}
