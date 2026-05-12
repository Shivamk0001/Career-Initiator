"use client";

import { CalendarDays } from "lucide-react";
import { formatExamDate } from "@/services/examService";

export default function ExamDateRow({ label, isoDate, highlight = false }) {
  return (
    <div
      className={`flex items-start gap-2 rounded-lg px-2 py-1.5 text-xs sm:text-sm ${
        highlight ? "bg-orange-50/80 ring-1 ring-orange-100" : "bg-slate-50/80"
      }`}
    >
      <CalendarDays className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange-500 sm:h-4 sm:w-4" aria-hidden />
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{label}</p>
        <p className="font-semibold text-slate-800">{formatExamDate(isoDate)}</p>
      </div>
    </div>
  );
}
