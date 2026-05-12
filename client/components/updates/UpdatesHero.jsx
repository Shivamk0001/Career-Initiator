"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bell, Newspaper, Sparkles, Zap } from "lucide-react";

export default function UpdatesHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-[#002147] via-[#003366] to-[#0a4d8c] shadow-2xl">
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 left-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative grid gap-10 px-6 py-12 lg:grid-cols-2 lg:items-center lg:px-12 lg:py-16">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-200 ring-1 ring-white/20">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Updated Daily
          </p>
          <h1 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Latest Education News, Exams & Admission Updates
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-blue-100/95 sm:text-base">
            Stay updated with exam notifications, admissions, scholarships, results, and career news — curated for Indian
            students and parents.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#updates-feed"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#002147] shadow-lg transition hover:bg-orange-50"
            >
              Explore Updates
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a
              href="#newsletter"
              className="inline-flex items-center gap-2 rounded-xl border border-white/35 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:border-orange-300 hover:bg-orange-500/20"
            >
              Subscribe Now
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.06 }}
          className="relative mx-auto w-full max-w-lg lg:max-w-none"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/20 shadow-2xl ring-1 ring-white/10">
            <Image
              src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=80"
              alt="Education news and updates"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 560px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/85 via-transparent to-transparent" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute -left-2 top-6 max-w-[11rem] rounded-2xl border border-white/25 bg-white/15 px-4 py-3 text-white shadow-lg backdrop-blur-md sm:left-0"
          >
            <p className="flex items-center gap-1 text-[10px] font-bold uppercase text-orange-200">
              <Newspaper className="h-3 w-3" aria-hidden />
              Coverage
            </p>
            <p className="mt-1 text-lg font-bold">500+</p>
            <p className="text-[11px] text-blue-100/90">Daily updates tracked*</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute -right-2 top-1/3 max-w-[10rem] rounded-2xl border border-white/25 bg-white/15 px-4 py-3 text-white shadow-lg backdrop-blur-md sm:right-0"
          >
            <p className="flex items-center gap-1 text-[10px] font-bold uppercase text-orange-200">
              <Zap className="h-3 w-3" aria-hidden />
              Exams
            </p>
            <p className="mt-1 text-lg font-bold">100+</p>
            <p className="text-[11px] text-blue-100/90">Entrances & boards*</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-6 left-1/2 w-[min(100%,13rem)] -translate-x-1/2 rounded-2xl border border-white/25 bg-white/15 px-4 py-3 text-white shadow-lg backdrop-blur-md sm:left-10 sm:translate-x-0"
          >
            <p className="flex items-center gap-1 text-[10px] font-bold uppercase text-orange-200">
              <Bell className="h-3 w-3" aria-hidden />
              Alerts
            </p>
            <p className="mt-1 text-lg font-bold">Real-time</p>
            <p className="text-[11px] text-blue-100/90">Push & email ready*</p>
          </motion.div>
        </motion.div>
      </div>
      <p className="border-t border-white/10 px-6 py-2.5 text-center text-[10px] text-blue-200/80 lg:px-12">
        *Indicative platform metrics — always verify with official notices.
      </p>
    </section>
  );
}
