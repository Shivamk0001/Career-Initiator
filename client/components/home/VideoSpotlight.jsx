"use client";

import Link from "next/link";
import { motion } from "framer-motion"; // Make sure to install framer-motion
import { Play, Youtube, Info, Sparkles, ArrowRight } from "lucide-react";

export default function VideoSpotlight() {
  return (
    <section id="watch" className="scroll-mt-28 px-4 py-24 md:py-32 bg-[#05070a]">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400"
          >
            <Sparkles size={12} />
            Watch & learn
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-3xl font-bold text-white md:text-5xl tracking-tight"
          >
            See how structured career guidance <br className="hidden md:block" />
            <span className="text-slate-500">changes decisions</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-base text-slate-400"
          >
            A comprehensive walkthrough of our platform is being curated. 
            In the meantime, explore our resources or watch our latest YouTube updates.
          </motion.p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5 lg:items-stretch">
          
          {/* Main Video Placeholder (3/5 Columns) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-3 group relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/50 shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-brand-500/10 mix-blend-overlay" />
            
            <div className="relative flex aspect-video w-full flex-col items-center justify-center p-8 text-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 animate-ping rounded-full bg-cyan-500/20" />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500 text-white shadow-xl transition-transform group-hover:scale-110">
                  <Play fill="currentColor" size={32} className="ml-1" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white">Walkthrough Coming Soon</h3>
              <p className="mt-2 max-w-xs text-sm text-slate-400">
                We are currently filming a detailed guide to help you navigate your career path.
              </p>
              
              <div className="absolute bottom-0 left-0 right-0 flex items-center gap-4 bg-white/5 p-4 backdrop-blur-md">
                <div className="h-1 w-full rounded-full bg-white/10">
                  <div className="h-full w-1/3 rounded-full bg-cyan-500" />
                </div>
                <div className="h-2 w-24 rounded-full bg-white/10" />
              </div>
            </div>
          </motion.div>

          {/* YouTube Card (2/5 Columns) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm"
          >
            <div>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
                <Youtube size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white">Stay Updated</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                Join our community on YouTube for expert talks, campus deep-dives, 
                and success stories from educators and students alike.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <Link
                href="https://www.youtube.com/@careerinitiator"
                target="_blank"
                className="flex items-center justify-center gap-3 rounded-xl bg-white px-6 py-4 text-sm font-bold text-black transition-all hover:bg-slate-200"
              >
                Subscribe on YouTube
                <ArrowRight size={18} />
              </Link>
              
              <div className="flex items-start gap-3 rounded-xl bg-white/5 p-4 border border-white/5">
                <Info size={18} className="mt-0.5 shrink-0 text-cyan-400" />
                <p className="text-[11px] leading-snug text-slate-500">
                  New campus stories and exam explainers are uploaded every week.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}