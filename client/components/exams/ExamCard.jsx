"use client";

import Link from "next/link";
import { memo } from "react";
import { motion } from "framer-motion";
import { Bell, Heart, Share2, Sparkles, ChevronRight } from "lucide-react";
import ExamDateRow from "@/components/exams/ExamDateRow";
import ExamActionButtons from "@/components/exams/ExamActionButtons";
import { formatExamDate } from "@/services/examService";

function statusStyles(status) {
  const s = (status || "").toLowerCase();
  if (s === "open") return "bg-emerald-50 text-emerald-800 ring-emerald-200";
  if (s === "closed") return "bg-slate-100 text-slate-700 ring-slate-200";
  if (s === "tentative") return "bg-amber-50 text-amber-900 ring-amber-200";
  if (s === "upcoming") return "bg-sky-50 text-sky-800 ring-sky-200";
  return "bg-slate-50 text-slate-700 ring-slate-200";
}

function ExamCardInner({ exam, bookmarked, onBookmark, onShare, onAlert, onQuickAction }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_8px_30px_rgba(0,33,71,0.08)] ring-1 ring-slate-100/80 before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:opacity-0 before:shadow-[0_0_0_1px_rgba(249,115,22,0.35),0_20px_50px_rgba(0,33,71,0.12)] before:transition-opacity hover:before:opacity-100"
    >
      <div className="relative flex flex-col gap-4 p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-bold leading-snug text-slate-900 sm:text-xl">{exam.examName}</h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-[#002147] ring-1 ring-blue-100">
                <Sparkles className="h-3 w-3 text-orange-500" aria-hidden />
                {exam.stream}
              </span>
              <span className="rounded-full bg-slate-50 px-2 py-0.5 text-[11px] font-semibold text-slate-600 ring-1 ring-slate-200">
                {exam.level}
              </span>
            </div>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">{exam.description}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 self-start">
            <button
              type="button"
              onClick={() => onAlert?.(exam)}
              className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-orange-300 hover:text-orange-600"
              aria-label="Set alert"
            >
              <Bell className="h-[18px] w-[18px]" />
            </button>
            <button
              type="button"
              onClick={() => onBookmark?.(exam)}
              className={`grid h-10 w-10 place-items-center rounded-full border shadow-sm transition hover:scale-105 ${
                bookmarked
                  ? "border-rose-200 bg-rose-50 text-rose-600"
                  : "border-slate-200 bg-white text-slate-600 hover:text-rose-600"
              }`}
              aria-label={bookmarked ? "Remove bookmark" : "Bookmark exam"}
            >
              <Heart className={`h-[18px] w-[18px] ${bookmarked ? "fill-current" : ""}`} />
            </button>
            <button
              type="button"
              onClick={() => onShare?.(exam)}
              className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-[#002147]/30 hover:text-[#002147]"
              aria-label="Share exam"
            >
              <Share2 className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ${statusStyles(exam.status)}`}>
            {exam.status}
          </span>
          <span className="rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200">
            {exam.mode}
          </span>
          <span className="rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200">
            {exam.examType}
          </span>
          <span className="rounded-full border border-orange-100 bg-orange-50/90 px-2.5 py-1 text-[11px] font-bold text-orange-800">
            Application: {exam.applicationStatus}
          </span>
        </div>

        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Important dates</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
            <ExamDateRow label="Registration" isoDate={exam.registrationEnd} highlight />
            <ExamDateRow label="Exam" isoDate={exam.examDate} />
            <ExamDateRow label="Result" isoDate={exam.resultDate} />
            <ExamDateRow label="Admit card" isoDate={exam.admitCardDate} />
          </div>
        </div>

        <ExamActionButtons exam={exam} onAction={onQuickAction} />

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <p className="text-xs text-slate-500">
            Registration opens{" "}
            <span className="font-semibold text-slate-700">{formatExamDate(exam.registrationStart)}</span>
          </p>
          <Link
            href={`/exams/${exam.slug}`}
            className="inline-flex items-center gap-1 rounded-xl bg-gradient-to-r from-[#002147] to-[#0a4d8c] px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:shadow-lg"
          >
            View full details
            <ChevronRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default memo(ExamCardInner);
