"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Hash } from "lucide-react";

const TOPICS = [
  { label: "JEE Main", href: "/latest-updates?topic=JEE%20Main" },
  { label: "NEET", href: "/latest-updates?topic=NEET" },
  { label: "CUET", href: "/latest-updates?topic=CUET" },
  { label: "CAT", href: "/latest-updates?topic=CAT" },
  { label: "GATE", href: "/latest-updates?topic=GATE" },
  { label: "UPSC", href: "/latest-updates?topic=UPSC" },
  { label: "Scholarships", href: "/latest-updates?topic=Scholarships" },
  { label: "Admissions 2025", href: "/latest-updates?topic=Admissions" }
];

export default function TrendingTopics() {
  return (
    <section className="mt-16 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-[0_8px_30px_rgba(0,33,71,0.06)] ring-1 ring-slate-100/80 sm:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange-700 ring-1 ring-orange-200/60">
          <Hash className="h-3.5 w-3.5" aria-hidden />
          Trending topics
        </span>
        <h2 className="text-lg font-bold text-slate-900 sm:text-xl">Jump to what students read most</h2>
      </div>
      <p className="mt-2 max-w-2xl text-sm text-slate-600">Tap a topic to open Latest Updates with that keyword in search.</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {TOPICS.map((t, i) => (
          <motion.div key={t.label} initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
            <Link
              href={t.href}
              className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-[#002147]/30 hover:bg-[#002147]/5 hover:text-[#002147]"
            >
              {t.label}
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
