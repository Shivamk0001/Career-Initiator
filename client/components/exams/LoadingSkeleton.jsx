"use client";

import { motion } from "framer-motion";

function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap justify-between gap-3">
        <div className="flex-1 space-y-3">
          <div className="h-6 w-2/3 animate-pulse rounded-lg bg-slate-200" />
          <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-slate-100" />
        </div>
        <div className="flex gap-2">
          <div className="h-10 w-10 animate-pulse rounded-full bg-slate-100" />
          <div className="h-10 w-10 animate-pulse rounded-full bg-slate-100" />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <div className="h-7 w-16 animate-pulse rounded-full bg-slate-100" />
        <div className="h-7 w-20 animate-pulse rounded-full bg-slate-100" />
        <div className="h-7 w-24 animate-pulse rounded-full bg-slate-100" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-16 animate-pulse rounded-lg bg-slate-50" />
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-8 w-24 animate-pulse rounded-lg bg-slate-100" />
        ))}
      </div>
    </div>
  );
}

export default function LoadingSkeleton({ count = 4 }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1.1, repeatType: "reverse", delay: i * 0.05 }}
        >
          <CardSkeleton />
        </motion.div>
      ))}
    </div>
  );
}
