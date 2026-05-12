"use client";

import { Search, ArrowUpDown } from "lucide-react";

/**
 * Top search + sort controls. Count and filter chips are composed in the parent for layout flexibility.
 */
export default function ExamSearchBar({
  value,
  onChange,
  sort,
  onSortChange,
  sortOptions = [],
  variant = "light",
  className = ""
}) {
  const isDark = variant === "dark";
  const field = isDark
    ? "border-slate-600 bg-slate-800 text-slate-100 placeholder:text-slate-500 focus:border-sky-500/50 focus:ring-sky-500/20"
    : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#002147]/40 focus:ring-[#002147]/10";
  const icon = isDark ? "text-slate-500" : "text-slate-400";

  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:items-center ${className}`}>
      <div className="relative min-w-0 flex-1">
        <Search
          className={`pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${icon}`}
          aria-hidden
        />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search exams (e.g. JEE, CAT, NEET…)"
          className={`w-full rounded-xl border py-2.5 pl-10 pr-3 text-sm shadow-sm outline-none ring-[#002147]/0 transition ${field}`}
          autoComplete="off"
          aria-label="Search exams"
        />
      </div>
      <div className="relative shrink-0 sm:w-56">
        <ArrowUpDown className={`pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${icon}`} />
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className={`w-full cursor-pointer appearance-none rounded-xl border py-2.5 pl-10 pr-8 text-sm font-medium shadow-sm outline-none transition ${field}`}
          aria-label="Sort exams"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">▾</span>
      </div>
    </div>
  );
}
