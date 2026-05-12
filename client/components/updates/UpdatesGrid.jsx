"use client";

import UpdateCard from "@/components/updates/UpdateCard";

export default function UpdatesGrid({ updates, bookmarkedIds, onToggleBookmark }) {
  if (!updates.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 py-16 text-center">
        <p className="text-sm font-medium text-slate-600">No updates match your filters.</p>
        <p className="mt-1 text-xs text-slate-500">Try another category or clear your search.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {updates.map((u, i) => (
        <UpdateCard
          key={u.id}
          update={u}
          index={i}
          bookmarked={bookmarkedIds.includes(u.id)}
          onToggleBookmark={onToggleBookmark}
        />
      ))}
    </div>
  );
}
