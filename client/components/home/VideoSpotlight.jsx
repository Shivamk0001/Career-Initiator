"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Youtube, Info, Sparkles, ArrowRight } from "lucide-react";

export default function VideoSpotlight() {
  return (
    <section
      id="watch"
      className="scroll-mt-28 px-4 py-24 md:py-32 bg-white relative overflow-hidden"
    >
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600"
          >
            <Sparkles size={12} />
            Watch & learn
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-3xl font-bold text-slate-900 md:text-5xl tracking-tight"
          >
            See how structured career guidance <br className="hidden md:block" />
            <span className="text-blue-600">
              changes decisions
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-base text-slate-600"
          >
            A comprehensive walkthrough of our platform is being curated.
          </motion.p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5 lg:items-stretch">

          {/* Main Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-3 group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm"
          >
            <div className="absolute inset-0 bg-slate-50/40" />

            <div className="relative flex aspect-video w-full flex-col items-center justify-center p-8 text-center">

              {/* Play button */}
              <div className="relative mb-6">
                <div className="absolute inset-0 animate-ping rounded-full bg-blue-200/30" />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-transform group-hover:scale-110">
                  <Play fill="currentColor" size={32} className="ml-1" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                Walkthrough Coming Soon
              </h3>

              <p className="mt-2 max-w-xs text-sm text-slate-600">
                We are currently filming a detailed guide.
              </p>

              {/* bottom bar */}
              <div className="absolute bottom-0 left-0 right-0 flex items-center gap-4 bg-white p-4 border-t border-slate-100">
                <div className="h-1 w-full rounded-full bg-slate-200">
                  <div className="h-full w-1/3 rounded-full bg-blue-500" />
                </div>
                <div className="h-2 w-24 rounded-full bg-slate-200" />
              </div>

            </div>
          </motion.div>

          {/* YouTube Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col justify-between overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
          >
            <div>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                <Youtube size={28} />
              </div>

              <h3 className="text-2xl font-bold text-slate-900">
                Stay Updated
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                Join our YouTube community for expert talks and updates.
              </p>
            </div>

            <div className="mt-8 space-y-4">

              <Link
                href="https://www.youtube.com/@careerinitiator"
                target="_blank"
                className="flex items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-4 text-sm font-bold text-white hover:bg-blue-700 transition"
              >
                Subscribe on YouTube
                <ArrowRight size={18} />
              </Link>

              <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 border border-slate-100">
                <Info size={18} className="mt-0.5 shrink-0 text-blue-500" />
                <p className="text-[11px] leading-snug text-slate-600">
                  Weekly campus stories and exam updates.
                </p>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}