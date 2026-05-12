"use client";

import { RotateCcw, SlidersHorizontal } from "lucide-react";
import FilterSection from "@/components/exams/FilterSection";
import {
  APPLICATION_STATUSES,
  EXAM_LEVELS,
  EXAM_MODES,
  EXAM_STREAMS,
  EXAM_TYPES
} from "@/lib/examConstants";

function CheckboxRow({ checked, label, onToggle, name }) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition ${
        checked ? "bg-[#002147]/8 font-medium text-[#002147] ring-1 ring-[#002147]/15" : "text-slate-700 hover:bg-slate-50"
      }`}
    >
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onToggle}
        className="h-3.5 w-3.5 shrink-0 rounded border-slate-300 accent-[#002147]"
      />
      <span>{label}</span>
    </label>
  );
}

export default function ExamFilters({ filters, onToggle, onClearAll, className = "" }) {
  const anyActive =
    filters.streams.length +
      filters.levels.length +
      filters.modes.length +
      filters.examTypes.length +
      filters.applicationStatuses.length >
    0;

  return (
    <aside
      className={`sticky top-24 max-h-[calc(100vh-6.5rem)] space-y-3 overflow-y-auto rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-lg shadow-slate-900/5 backdrop-blur-xl ${className}`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-slate-900">
          <SlidersHorizontal className="h-4 w-4 text-[#002147]" aria-hidden />
          <span className="text-sm font-bold">Refine exams</span>
        </div>
        <button
          type="button"
          onClick={onClearAll}
          disabled={!anyActive}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-1 text-xs font-medium text-slate-600 transition hover:border-orange-300 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden />
          Clear all
        </button>
      </div>

      <FilterSection title="Streams">
        <div className="flex flex-col gap-0.5">
          {EXAM_STREAMS.map((s) => (
            <CheckboxRow
              key={s}
              name={`stream-${s}`}
              label={s}
              checked={filters.streams.includes(s)}
              onToggle={() => onToggle("streams", s)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Levels">
        <div className="flex flex-col gap-0.5">
          {EXAM_LEVELS.map((s) => (
            <CheckboxRow
              key={s}
              name={`level-${s}`}
              label={s}
              checked={filters.levels.includes(s)}
              onToggle={() => onToggle("levels", s)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Mode">
        <div className="flex flex-col gap-0.5">
          {EXAM_MODES.map((s) => (
            <CheckboxRow
              key={s}
              name={`mode-${s}`}
              label={s}
              checked={filters.modes.includes(s)}
              onToggle={() => onToggle("modes", s)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Exam type">
        <div className="flex flex-col gap-0.5">
          {EXAM_TYPES.map((s) => (
            <CheckboxRow
              key={s}
              name={`examType-${s}`}
              label={s}
              checked={filters.examTypes.includes(s)}
              onToggle={() => onToggle("examTypes", s)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Application status" defaultOpen={false}>
        <div className="flex flex-col gap-0.5">
          {APPLICATION_STATUSES.map((s) => (
            <CheckboxRow
              key={s}
              name={`app-${s}`}
              label={s}
              checked={filters.applicationStatuses.includes(s)}
              onToggle={() => onToggle("applicationStatuses", s)}
            />
          ))}
        </div>
      </FilterSection>

      <p className="text-[10px] leading-relaxed text-slate-400">
        Dates and status are indicative. Always confirm on the official exam website.
      </p>
    </aside>
  );
}
