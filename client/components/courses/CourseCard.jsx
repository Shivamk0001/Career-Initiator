"use client";

import Link from "next/link";
import Image from "next/image";
import { memo } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Download,
  GitCompare,
  Heart,
  IndianRupee,
  Share2,
  Sparkles,
  Star,
  Timer,
  Users
} from "lucide-react";

function CourseCardInner({
  course,
  compact = false,
  bookmarked,
  compared,
  compareDisabled,
  onBookmark,
  onShare,
  onCompare
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_8px_30px_rgba(0,33,71,0.08)] ring-1 ring-slate-100/80 transition-shadow hover:shadow-[0_16px_40px_rgba(0,33,71,0.12)]"
    >
      <div className={`relative w-full overflow-hidden bg-slate-100 ${compact ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
        <Image
          src={course.image}
          alt={course.courseName}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
          sizes="(max-width:768px) 100vw, 360px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-[#002147] shadow">
            {course.stream}
          </span>
          {course.status === "Trending" ? (
            <span className="rounded-full bg-orange-500 px-2.5 py-1 text-[11px] font-bold text-white shadow">Trending</span>
          ) : null}
          {course.status === "New" ? (
            <span className="rounded-full bg-emerald-500 px-2.5 py-1 text-[11px] font-bold text-white shadow">New</span>
          ) : null}
        </div>
        <div className="absolute right-3 top-3 flex gap-2">
          <button
            type="button"
            onClick={() => onBookmark?.(course)}
            className={`grid h-9 w-9 place-items-center rounded-full border shadow-md backdrop-blur-md transition ${
              bookmarked ? "border-rose-200 bg-rose-50 text-rose-600" : "border-white/80 bg-white/90 text-slate-600 hover:text-rose-600"
            }`}
            aria-label={bookmarked ? "Remove bookmark" : "Bookmark"}
          >
            <Heart className={`h-4 w-4 ${bookmarked ? "fill-current" : ""}`} />
          </button>
          <button
            type="button"
            onClick={() => onShare?.(course)}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/80 bg-white/90 text-slate-600 shadow-md backdrop-blur-md transition hover:text-[#002147]"
            aria-label="Share"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
          <span className="inline-flex items-center gap-1 text-xs font-semibold drop-shadow">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden />
            {course.rating?.toFixed(1)}
          </span>
          <span className="text-xs font-medium opacity-95">{course.level}</span>
        </div>
      </div>

      <div className={`flex flex-1 flex-col gap-3 ${compact ? "p-3 sm:p-4" : "p-4 sm:p-5"}`}>
        <div>
          <h3 className="line-clamp-2 text-base font-bold leading-snug text-slate-900 sm:text-lg">{course.courseName}</h3>
          <p className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-slate-500">
            <Sparkles className="h-3 w-3 text-orange-500" aria-hidden />
            {course.specialization}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
          <div className="rounded-xl border border-slate-100 bg-slate-50/90 px-2.5 py-2">
            <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">
              <Timer className="h-3 w-3" aria-hidden />
              Duration
            </p>
            <p className="mt-0.5 font-semibold text-slate-800">{course.duration}</p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/90 px-2.5 py-2">
            <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">
              <IndianRupee className="h-3 w-3" aria-hidden />
              Fees
            </p>
            <p className="mt-0.5 font-semibold text-slate-800">{course.feesDisplay}</p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/90 px-2.5 py-2">
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Avg. package</p>
            <p className="mt-0.5 font-semibold text-emerald-800">{course.averageSalary}</p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/90 px-2.5 py-2">
            <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">
              <Users className="h-3 w-3" aria-hidden />
              Interest
            </p>
            <p className="mt-0.5 font-semibold text-slate-800">{course.totalStudents?.toLocaleString("en-IN")}+</p>
          </div>
        </div>

        <p className="line-clamp-2 text-xs leading-relaxed text-slate-600">{course.description}</p>

        <div className="flex flex-wrap gap-1">
          {(course.entranceExams || []).slice(0, 3).map((ex) => (
            <span key={ex} className="rounded-md bg-blue-50/90 px-2 py-0.5 text-[10px] font-semibold text-[#002147] ring-1 ring-blue-100">
              {ex}
            </span>
          ))}
          {(course.entranceExams || []).length > 3 ? (
            <span className="text-[10px] font-medium text-slate-400">+{(course.entranceExams || []).length - 3}</span>
          ) : null}
        </div>

        <div className="mt-auto flex flex-wrap gap-2 border-t border-slate-100 pt-3">
          <Link
            href={`/courses/${course.slug}`}
            className="inline-flex flex-1 min-w-[120px] items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-[#002147] to-[#0a4d8c] px-3 py-2 text-center text-xs font-bold text-white shadow-sm transition hover:opacity-95 sm:text-sm"
          >
            View details
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
          <button
            type="button"
            onClick={() => onCompare?.(course)}
            disabled={compareDisabled && !compared}
            className={`inline-flex items-center justify-center gap-1 rounded-xl border px-3 py-2 text-xs font-semibold shadow-sm transition sm:text-sm ${
              compared
                ? "border-[#002147] bg-[#002147]/5 text-[#002147]"
                : "border-slate-200 bg-white text-slate-700 hover:border-orange-300 hover:text-orange-700 disabled:opacity-45"
            }`}
          >
            <GitCompare className="h-3.5 w-3.5" aria-hidden />
            Compare
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-orange-300 hover:bg-orange-50/50"
            title="Brochure download when CMS is connected"
          >
            <Download className="h-3.5 w-3.5" aria-hidden />
            Brochure
          </button>
          <button
            type="button"
            className="inline-flex flex-1 min-w-[100px] items-center justify-center rounded-xl border border-orange-200 bg-orange-50/80 px-3 py-2 text-xs font-bold text-orange-900 transition hover:bg-orange-100 sm:text-sm"
            title="Apply flow connects to institute later"
          >
            <BookOpen className="h-3.5 w-3.5" aria-hidden />
            Apply
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default memo(CourseCardInner);
