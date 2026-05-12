"use client";

import { BookOpen, Layers, Star } from "lucide-react";

/** Quick credibility metrics under the hero search. */
export default function CourseStats({ totalCourses }) {
  const n = typeof totalCourses === "number" ? totalCourses : 0;
  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-3">
      <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-orange-200">
          <BookOpen className="h-4 w-4" aria-hidden />
          <span className="text-[10px] font-bold uppercase tracking-wider">Catalogued</span>
        </div>
        <p className="mt-1 text-2xl font-bold tabular-nums">{n.toLocaleString("en-IN")}+</p>
        <p className="text-xs text-blue-100/80">Programmes in this directory</p>
      </div>
      <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-orange-200">
          <Layers className="h-4 w-4" aria-hidden />
          <span className="text-[10px] font-bold uppercase tracking-wider">Streams</span>
        </div>
        <p className="mt-1 text-2xl font-bold">14</p>
        <p className="text-xs text-blue-100/80">Major categories covered</p>
      </div>
      <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-orange-200">
          <Star className="h-4 w-4" aria-hidden />
          <span className="text-[10px] font-bold uppercase tracking-wider">Quality bar</span>
        </div>
        <p className="mt-1 text-2xl font-bold">4.2+</p>
        <p className="text-xs text-blue-100/80">Avg. listing rating (indicative)</p>
      </div>
    </div>
  );
}
