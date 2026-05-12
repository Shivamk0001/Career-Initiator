"use client";

import { motion } from "framer-motion";
import { BookOpen, Building2, Newspaper, Users } from "lucide-react";

const STATS = [
  { icon: Newspaper, value: "500+", label: "Daily Updates", sub: "News & circulars" },
  { icon: BookOpen, value: "100+", label: "Exams Covered", sub: "National & state" },
  { icon: Building2, value: "1000+", label: "Colleges", sub: "Admission trackers" },
  { icon: Users, value: "50K+", label: "Students Reading", sub: "Each month*" }
];

export default function UpdatesStats() {
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {STATS.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_8px_30px_rgba(0,33,71,0.06)] ring-1 ring-slate-100/80 transition hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(0,33,71,0.1)]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#002147]/8 text-[#002147]">
            <s.icon className="h-5 w-5" aria-hidden />
          </div>
          <p className="mt-4 text-2xl font-bold tabular-nums text-slate-900">{s.value}</p>
          <p className="mt-1 text-sm font-bold text-slate-800">{s.label}</p>
          <p className="mt-0.5 text-xs text-slate-500">{s.sub}</p>
        </motion.div>
      ))}
    </div>
  );
}
