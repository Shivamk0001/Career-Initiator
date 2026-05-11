"use client";

import { Loader2 } from "lucide-react";

export default function Pagination({ hasMore, loading, onLoadMore, className = "" }) {
  if (!hasMore) return null;
  return (
    <div className={`flex justify-center pt-6 ${className}`}>
      <button
        type="button"
        onClick={onLoadMore}
        disabled={loading}
        className="inline-flex min-w-[200px] items-center justify-center gap-2 rounded-xl border border-[#002147]/20 bg-white px-8 py-3 text-sm font-semibold text-[#002147] shadow-sm transition hover:border-orange-400 hover:bg-orange-50/50 disabled:opacity-60"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {loading ? "Loading…" : "Load more results"}
      </button>
    </div>
  );
}
