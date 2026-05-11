"use client";

import { Building2, Search } from "lucide-react";

export default function EmptyState({ title = "No colleges match your filters", subtitle, hasQuery }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/90 px-6 py-16 text-center shadow-sm backdrop-blur-sm">
      {hasQuery ? (
        <Search className="mb-4 h-12 w-12 text-slate-300" strokeWidth={1.25} />
      ) : (
        <Building2 className="mb-4 h-12 w-12 text-slate-300" strokeWidth={1.25} />
      )}
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      {subtitle ? <p className="mt-2 max-w-md text-sm text-slate-500">{subtitle}</p> : null}
    </div>
  );
}
