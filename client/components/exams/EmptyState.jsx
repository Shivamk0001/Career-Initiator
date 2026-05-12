"use client";

import { FileQuestion, SlidersHorizontal } from "lucide-react";

export default function EmptyState({ title, subtitle, onOpenFilters, showFiltersCta = false }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/80 px-6 py-16 text-center shadow-sm">
      <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-slate-50 ring-1 ring-slate-200">
        <FileQuestion className="h-7 w-7 text-slate-400" aria-hidden />
      </div>
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-slate-600">{subtitle}</p>
      {showFiltersCta && onOpenFilters ? (
        <button
          type="button"
          onClick={onOpenFilters}
          className="mt-6 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#002147] shadow-sm transition hover:border-orange-300 hover:bg-orange-50/50"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Adjust filters
        </button>
      ) : null}
    </div>
  );
}
