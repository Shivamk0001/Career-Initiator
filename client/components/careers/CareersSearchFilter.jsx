"use client";

import { Search, ArrowUpDown } from "lucide-react";
import { CAREER_SORT_OPTIONS, CAREER_TABS } from "@/data/careers";

export default function CareersSearchFilter({
  search,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  sort,
  onSortChange
}) {
  return (
    <div id="careers-directory" className="scroll-mt-24 space-y-5 rounded-2xl border border-slate-200/90 bg-white/95 p-4 shadow-lg shadow-slate-900/5 backdrop-blur-sm sm:p-6">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search careers (e.g. UPSC, MBA, design…)"
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#002147]/35 focus:ring-4 focus:ring-[#002147]/10"
          aria-label="Search careers"
        />
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="-mx-1 flex gap-1.5 overflow-x-auto pb-1 lg:flex-wrap lg:overflow-visible">
          {CAREER_TABS.map((tab) => {
            const active = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onCategoryChange(tab.id)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition sm:text-sm ${
                  active
                    ? "bg-[#002147] text-white shadow-md ring-1 ring-[#002147]/30"
                    : "border border-slate-200 bg-slate-50 text-slate-700 hover:border-orange-200 hover:bg-orange-50/60"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="relative w-full shrink-0 lg:w-56">
          <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-8 text-sm font-medium text-slate-800 shadow-sm outline-none transition focus:border-[#002147]/35 focus:ring-4 focus:ring-[#002147]/10"
            aria-label="Sort careers"
          >
            {CAREER_SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">▾</span>
        </div>
      </div>
    </div>
  );
}
