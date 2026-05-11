"use client";

import { ChevronDown, RotateCcw, SlidersHorizontal } from "lucide-react";
import { useMemo } from "react";
import { STREAM_OPTIONS } from "@/lib/collegeSearchUtils";

function Accordion({ title, children, defaultOpen = true }) {
  return (
    <details open={defaultOpen} className="group rounded-xl border border-slate-200/80 bg-white/60">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-3 py-2.5 text-sm font-semibold text-slate-800 [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown className="h-4 w-4 shrink-0 text-slate-500 transition group-open:rotate-180" />
      </summary>
      <div className="border-t border-slate-100 px-3 pb-3 pt-2">{children}</div>
    </details>
  );
}

export default function FiltersSidebar({ filters, onChange, onClear, activeChips, className = "" }) {
  const set = (patch) => onChange({ ...filters, ...patch });

  const chipList = useMemo(() => activeChips.filter(Boolean), [activeChips]);

  return (
    <aside
      className={`sticky top-24 max-h-[calc(100vh-6.5rem)] space-y-3 overflow-y-auto rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-lg shadow-slate-900/5 backdrop-blur-xl ${className}`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-slate-900">
          <SlidersHorizontal className="h-4 w-4 text-[#002147]" />
          <span className="text-sm font-bold">Filters</span>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-1 text-xs font-medium text-slate-600 hover:border-orange-300 hover:text-orange-600"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Clear
        </button>
      </div>

      {chipList.length ? (
        <div className="flex flex-wrap gap-1.5">
          {chipList.map((c) => (
            <span
              key={c.key}
              className="inline-flex items-center rounded-full bg-orange-50 px-2 py-0.5 text-[11px] font-medium text-orange-800 ring-1 ring-orange-200"
            >
              {c.label}
            </span>
          ))}
        </div>
      ) : null}

      <Accordion title="Refine in results">
        <input
          value={filters.within}
          onChange={(e) => set({ within: e.target.value })}
          placeholder="Keyword in current results…"
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#002147]"
        />
      </Accordion>

      <Accordion title="Location">
        <div className="space-y-2">
          <label className="block text-xs text-slate-500">Country</label>
          <select
            value={filters.country}
            onChange={(e) => set({ country: e.target.value })}
            className="w-full rounded-lg border border-slate-200 px-2 py-2 text-sm"
          >
            <option value="all">All</option>
            <option value="India">India</option>
            <option value="International">International</option>
          </select>
          <label className="block text-xs text-slate-500">State / Region</label>
          <input
            value={filters.state}
            onChange={(e) => set({ state: e.target.value })}
            placeholder="e.g. Maharashtra"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
          <label className="block text-xs text-slate-500">City</label>
          <input
            value={filters.city}
            onChange={(e) => set({ city: e.target.value })}
            placeholder="e.g. Mumbai"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
      </Accordion>

      <Accordion title="Programme">
        <label className="block text-xs text-slate-500">Course keyword</label>
        <input
          value={filters.course}
          onChange={(e) => set({ course: e.target.value })}
          placeholder="e.g. B.Tech, MBA"
          className="mb-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
        />
        <label className="block text-xs text-slate-500">Stream</label>
        <select
          value={filters.stream}
          onChange={(e) => set({ stream: e.target.value })}
          className="w-full rounded-lg border border-slate-200 px-2 py-2 text-sm"
        >
          <option value="all">All streams</option>
          {STREAM_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </Accordion>

      <Accordion title="Fees & quality">
        <label className="mb-1 block text-xs text-slate-500">
          Fees (₹ Lakhs / yr, indicative) — {filters.feeMin} – {filters.feeMax}
        </label>
        <div className="flex gap-2">
          <input
            type="range"
            min={0}
            max={40}
            value={filters.feeMin}
            onChange={(e) => set({ feeMin: Math.min(Number(e.target.value), filters.feeMax) })}
            className="flex-1 accent-orange-500"
          />
          <input
            type="range"
            min={0}
            max={50}
            value={filters.feeMax}
            onChange={(e) => set({ feeMax: Math.max(Number(e.target.value), filters.feeMin) })}
            className="flex-1 accent-[#002147]"
          />
        </div>
        <label className="mt-3 block text-xs text-slate-500">Minimum rating</label>
        <input
          type="range"
          min={0}
          max={5}
          step={0.1}
          value={filters.ratingMin}
          onChange={(e) => set({ ratingMin: Number(e.target.value) })}
          className="w-full accent-orange-500"
        />
        <p className="text-xs text-slate-500">{filters.ratingMin.toFixed(1)}+ stars</p>
        <label className="mt-2 block text-xs text-slate-500">Max NIRF-style rank (indicative)</label>
        <input
          type="range"
          min={1}
          max={300}
          value={filters.rankingMax}
          onChange={(e) => set({ rankingMax: Number(e.target.value) })}
          className="w-full accent-[#002147]"
        />
        <p className="text-xs text-slate-500">Up to #{filters.rankingMax}</p>
      </Accordion>

      <Accordion title="Campus" defaultOpen={false}>
        <label className="mb-2 block text-xs text-slate-500">Ownership</label>
        <select
          value={filters.ownership}
          onChange={(e) => set({ ownership: e.target.value })}
          className="mb-3 w-full rounded-lg border border-slate-200 px-2 py-2 text-sm"
        >
          <option value="all">All</option>
          <option value="public">Public / Govt</option>
          <option value="private">Private</option>
        </select>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={filters.hostel} onChange={(e) => set({ hostel: e.target.checked })} className="accent-[#002147]" />
          Hostel available
        </label>
        <label className="mt-2 flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={filters.scholarship}
            onChange={(e) => set({ scholarship: e.target.checked })}
            className="accent-[#002147]"
          />
          Scholarship options
        </label>
      </Accordion>

      <p className="text-[10px] leading-relaxed text-slate-400">
        *Fees, ranks, and tags are indicative for discovery. Verify on the official college website.
      </p>
    </aside>
  );
}
