"use client";

import { motion } from "framer-motion";
import { Sparkles, TrendingUp } from "lucide-react";
import CourseStats from "@/components/courses/CourseStats";
import { COURSE_MARKETING_TOTAL } from "@/lib/courseConstants";

const TRENDING_TAGS = ["B.Tech CSE", "MBA Finance", "NEET UG", "CLAT", "BCA", "Data Science", "UI/UX", "GATE"];
/**
 * Premium hero with stats and quick trending chips (search lives in sticky toolbar below).
 */
export default function CourseHero({ totalInDirectory, onTagClick, className = "" }) {
  return (
    <section
      className={`relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-[#002147] via-[#003366] to-[#0a4d8c] px-6 py-10 text-white shadow-2xl sm:px-10 sm:py-14 ${className}`}
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-200 ring-1 ring-white/20">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          Courses portal
        </p>
        <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
          Explore {COURSE_MARKETING_TOTAL} courses across India
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-blue-100/95 sm:text-base">
          Compare programmes by stream, fees, careers, and entrances — built for serious discovery, not cluttered
          listicles.
        </p>
      </motion.div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1 text-xs font-semibold text-blue-200/90">
          <TrendingUp className="h-3.5 w-3.5" aria-hidden />
          Trending:
        </span>
        {TRENDING_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => onTagClick?.(tag)}
            className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm transition hover:border-orange-300 hover:bg-orange-500/25"
          >
            {tag}
          </button>
        ))}
      </div>

      <CourseStats totalCourses={totalInDirectory} />
    </section>
  );
}
