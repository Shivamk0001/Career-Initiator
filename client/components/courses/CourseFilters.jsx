"use client";

import { RotateCcw, SlidersHorizontal } from "lucide-react";
import FilterSection from "@/components/exams/FilterSection";
import {
  COURSE_DURATION_FILTERS,
  COURSE_LEVELS,
  COURSE_MODES,
  COURSE_STREAMS,
  ENTRANCE_EXAM_OPTIONS,
  SPECIALIZATION_FILTERS,
  defaultCourseFilters
} from "@/lib/courseConstants";

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

export default function CourseFilters({
  filters,
  onToggle,
  onClearAll,
  onFeeRange,
  onRatingMin,
  className = ""
}) {
  const anyActive =
    filters.streams.length +
      filters.levels.length +
      filters.durations.length +
      filters.modes.length +
      filters.entranceExams.length +
      filters.specializations.length >
      0;
  const feeActive =
    filters.feeMin > defaultCourseFilters.feeMin || filters.feeMax < defaultCourseFilters.feeMax;
  const ratingActive = filters.ratingMin > 0;
  const clearDisabled = !anyActive && !feeActive && !ratingActive;

  return (
    <aside
      className={`sticky top-24 max-h-[calc(100vh-6.5rem)] space-y-3 overflow-y-auto rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-lg shadow-slate-900/5 backdrop-blur-xl ${className}`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-slate-900">
          <SlidersHorizontal className="h-4 w-4 text-[#002147]" aria-hidden />
          <span className="text-sm font-bold">Refine courses</span>
        </div>
        <button
          type="button"
          onClick={onClearAll}
          disabled={clearDisabled}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-1 text-xs font-medium text-slate-600 transition hover:border-orange-300 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden />
          Clear all
        </button>
      </div>

      <FilterSection title="Stream">
        <div className="flex max-h-52 flex-col gap-0.5 overflow-y-auto pr-1">
          {COURSE_STREAMS.map((s) => (
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

      <FilterSection title="Level">
        <div className="flex flex-col gap-0.5">
          {COURSE_LEVELS.map((s) => (
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

      <FilterSection title="Duration">
        <div className="flex max-h-44 flex-col gap-0.5 overflow-y-auto pr-1">
          {COURSE_DURATION_FILTERS.map((s) => (
            <CheckboxRow
              key={s}
              name={`dur-${s}`}
              label={s}
              checked={filters.durations.includes(s)}
              onToggle={() => onToggle("durations", s)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Fees (₹ Lakhs / year)">
        <p className="mb-2 text-xs text-slate-500">
          Range: {filters.feeMin} – {filters.feeMax} L
        </p>
        <div className="flex gap-2">
          <input
            type="range"
            min={0}
            max={40}
            step={0.5}
            value={filters.feeMin}
            onChange={(e) =>
              onFeeRange(Math.min(Number(e.target.value), filters.feeMax), filters.feeMax)
            }
            className="flex-1 accent-orange-500"
            aria-label="Minimum fee"
          />
          <input
            type="range"
            min={0}
            max={40}
            step={0.5}
            value={filters.feeMax}
            onChange={(e) =>
              onFeeRange(filters.feeMin, Math.max(Number(e.target.value), filters.feeMin))
            }
            className="flex-1 accent-[#002147]"
            aria-label="Maximum fee"
          />
        </div>
      </FilterSection>

      <FilterSection title="Mode">
        <div className="flex flex-col gap-0.5">
          {COURSE_MODES.map((s) => (
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

      <FilterSection title="Minimum rating">
        <input
          type="range"
          min={0}
          max={5}
          step={0.1}
          value={filters.ratingMin}
          onChange={(e) => onRatingMin(Number(e.target.value))}
          className="w-full accent-[#002147]"
          aria-label="Minimum rating"
        />
        <p className="mt-1 text-xs text-slate-500">{filters.ratingMin.toFixed(1)}+ stars</p>
      </FilterSection>

      <FilterSection title="Entrance exams" defaultOpen={false}>
        <div className="flex max-h-48 flex-col gap-0.5 overflow-y-auto pr-1">
          {ENTRANCE_EXAM_OPTIONS.map((s) => (
            <CheckboxRow
              key={s}
              name={`exam-${s}`}
              label={s}
              checked={filters.entranceExams.includes(s)}
              onToggle={() => onToggle("entranceExams", s)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Specialization" defaultOpen={false}>
        <div className="flex max-h-48 flex-col gap-0.5 overflow-y-auto pr-1">
          {SPECIALIZATION_FILTERS.map((s) => (
            <CheckboxRow
              key={s}
              name={`spec-${s}`}
              label={s}
              checked={filters.specializations.includes(s)}
              onToggle={() => onToggle("specializations", s)}
            />
          ))}
        </div>
      </FilterSection>

      <p className="text-[10px] leading-relaxed text-slate-400">
        Fees, salaries, and ratings are indicative for discovery. Confirm with official institute brochures.
      </p>
    </aside>
  );
}
