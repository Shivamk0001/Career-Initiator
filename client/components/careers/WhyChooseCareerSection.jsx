"use client";

import { motion } from "framer-motion";
import { Globe2, LineChart, Shield, Zap } from "lucide-react";

const ITEMS = [
  {
    icon: LineChart,
    title: "High Salary Potential",
    body: "Understand realistic pay bands by role, city, and experience — so expectations match the market early."
  },
  {
    icon: Globe2,
    title: "Global Opportunities",
    body: "Many Indian pathways open international mobility — tech, medicine, design, and research careers scale worldwide."
  },
  {
    icon: Shield,
    title: "Long-Term Stability",
    body: "Pick careers with durable demand: governance, healthcare, infrastructure, and digital core skills age well."
  },
  {
    icon: Zap,
    title: "Skill-Based Growth",
    body: "Modern careers reward proof: portfolios, certifications, and projects — not just degrees on paper."
  }
];

export default function WhyChooseCareerSection() {
  return (
    <section className="mt-20">
      <div className="mb-8 max-w-2xl">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Why choosing the right career matters</h2>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          A clear direction reduces wasted years, improves motivation, and helps you stack the right skills and exams at
          the right time.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {ITEMS.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.07 }}
            className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_8px_30px_rgba(0,33,71,0.06)] ring-1 ring-slate-100/80 transition hover:-translate-y-0.5 hover:border-orange-100 hover:shadow-[0_14px_40px_rgba(0,33,71,0.1)]"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600 ring-1 ring-orange-100">
              <item.icon className="h-5 w-5" aria-hidden />
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-900">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
