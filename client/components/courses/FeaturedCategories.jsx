"use client";

import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { COURSE_STREAMS } from "@/lib/courseConstants";

const streamHints = {
  Engineering: "B.Tech · M.Tech · Diploma",
  Medical: "MBBS · BDS · Allied health",
  Management: "MBA · BBA · PGDM",
  Law: "LLB · BA LLB · LLM",
  Commerce: "B.Com · CA · Finance",
  Science: "B.Sc · M.Sc · Research",
  "Arts & Humanities": "BA · MA · Social sciences",
  "Computer & IT": "BCA · MCA · Cloud",
  Design: "B.Des · UI/UX · NIFT",
  "Hotel Management": "BHM · Hospitality",
  Aviation: "Pilot · Airport ops",
  Agriculture: "B.Sc Ag · ICAR",
  "Government & Skill Courses": "ITI · NSDC · Skills",
  "Online Certification Courses": "Cloud · Data · Product"
};

/**
 * Category tiles — clicking narrows the directory to that stream.
 */
export default function FeaturedCategories({ onSelectStream }) {
  return (
    <section className="mt-12">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Featured categories</h2>
          <p className="mt-1 text-sm text-slate-600">Jump into a stream — filters update instantly.</p>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {COURSE_STREAMS.map((stream, i) => (
          <motion.button
            key={stream}
            type="button"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: Math.min(i * 0.03, 0.3) }}
            onClick={() => onSelectStream?.(stream)}
            className="group flex flex-col rounded-2xl border border-slate-200/90 bg-white p-4 text-left shadow-sm transition hover:border-orange-200 hover:shadow-md"
          >
            <span className="text-sm font-bold text-[#002147] group-hover:text-orange-600">{stream}</span>
            <span className="mt-1 line-clamp-2 text-xs text-slate-500">{streamHints[stream] || "Programmes"}</span>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-orange-600">
              Explore
              <ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" aria-hidden />
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
