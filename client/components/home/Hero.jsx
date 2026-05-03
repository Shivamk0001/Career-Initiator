"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass rounded-3xl p-8 shadow-glow"
      >
        <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
          Build your dream future with smart guidance.
        </h1>
        <p className="mt-4 max-w-2xl text-slate-300">
          Compare colleges, discover top courses, track exams, and choose the right career path with Career Initiator.
        </p>
        <div className="mt-7 flex gap-3">
          <Link href="/colleges" className="rounded-xl bg-brand-500 px-6 py-3 font-medium">
            Explore Colleges
          </Link>
          <Link href="/careers" className="rounded-xl border border-white/20 px-6 py-3">
            Browse Careers
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
