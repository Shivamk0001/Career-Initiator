"use client";

export function CollegeCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-md">
      <div className="flex flex-col lg:flex-row">
        <div className="relative h-48 w-full shrink-0 animate-pulse bg-slate-200 lg:h-auto lg:w-56" />
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="h-5 w-2/3 animate-pulse rounded bg-slate-200" />
          <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200" />
          <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
          <div className="h-3 w-[83%] animate-pulse rounded bg-slate-200" />
          <div className="mt-auto flex gap-2">
            <div className="h-9 flex-1 animate-pulse rounded-xl bg-slate-200" />
            <div className="h-9 w-24 animate-pulse rounded-xl bg-slate-200" />
          </div>
        </div>
        <div className="hidden w-40 flex-col gap-2 border-t border-slate-100 p-5 lg:flex lg:border-l lg:border-t-0">
          <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
          <div className="h-10 animate-pulse rounded-xl bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

export default function CollegeGridSkeleton({ count = 6 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <CollegeCardSkeleton key={i} />
      ))}
    </div>
  );
}
