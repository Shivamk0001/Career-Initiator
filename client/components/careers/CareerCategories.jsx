"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Briefcase,
  Cpu,
  Gavel,
  GraduationCap,
  Landmark,
  Palette,
  Plane,
  Stethoscope
} from "lucide-react";
import { CAREER_ICON_CATEGORIES } from "@/data/careers";

const ICONS = {
  Engineering: Cpu,
  Medical: Stethoscope,
  Management: Briefcase,
  Law: Gavel,
  Design: Palette,
  "Data Science": BarChart3,
  Aviation: Plane,
  Government: Landmark
};

export default function CareerCategories({ onPickCategory }) {
  return (
    <section className="mt-14">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Explore by category</h2>
        <p className="mt-1 text-sm text-slate-600">Pick a lane — we’ll filter careers to match your interest.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CAREER_ICON_CATEGORIES.map((cat, i) => {
          const Icon = ICONS[cat.id] || GraduationCap;
          return (
            <motion.button
              key={cat.id}
              type="button"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: Math.min(i * 0.04, 0.25) }}
              whileHover={{ y: -3 }}
              onClick={() => onPickCategory(cat.id)}
              className="group flex flex-col rounded-2xl border border-slate-200/90 bg-white p-5 text-left shadow-[0_8px_28px_rgba(0,33,71,0.06)] ring-1 ring-slate-100/80 transition hover:border-orange-200 hover:shadow-[0_14px_40px_rgba(0,33,71,0.1)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#002147] to-[#0a4d8c] text-white shadow-md transition group-hover:from-orange-500 group-hover:to-amber-500">
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <p className="mt-4 text-base font-bold text-slate-900">{cat.label}</p>
              <p className="mt-1 text-xs text-slate-500">{cat.hint}</p>
              <span className="mt-3 text-xs font-semibold text-[#002147] group-hover:text-orange-600">View careers →</span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
