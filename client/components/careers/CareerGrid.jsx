"use client";

import { motion } from "framer-motion";
import CareerCard from "@/components/careers/CareerCard";

export default function CareerGrid({ careers, bookmarkedIds, onToggleBookmark }) {
  if (!careers.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white/80 py-16 text-center text-slate-600">
        <p className="text-sm font-medium">No careers match your filters.</p>
        <p className="mt-1 text-xs text-slate-500">Try another category or clear your search.</p>
      </div>
    );
  }

  return (
    <motion.div layout className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {careers.map((career) => (
        <CareerCard
          key={career.id}
          career={career}
          bookmarked={bookmarkedIds.includes(career.id)}
          onToggleBookmark={onToggleBookmark}
        />
      ))}
    </motion.div>
  );
}
