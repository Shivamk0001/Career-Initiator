"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, GitCompare, MessageCircle } from "lucide-react";

export default function CareerCTA() {
  return (
    <section className="mt-20">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35 }}
        className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-[#002147] via-[#003366] to-[#0a4d8c] px-6 py-12 text-center text-white shadow-2xl sm:px-12 sm:py-14"
      >
        <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-orange-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">Still confused about your career?</h2>
          <p className="mt-4 text-sm text-blue-100/95 sm:text-base">
            Talk to our experts and get personalised career guidance — from stream selection to exam planning and skill
            roadmap.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#002147] shadow-lg transition hover:bg-orange-50"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              Talk to expert
            </Link>
            <a
              href="#careers-directory"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/35 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:border-orange-300 hover:bg-orange-500/20"
            >
              <GitCompare className="h-4 w-4" aria-hidden />
              Compare careers
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
