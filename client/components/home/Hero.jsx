"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Search, Sparkles } from "lucide-react";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    },
  };

  return (
    <section className="relative min-h-[90vh] overflow-hidden px-4 py-12 md:py-24 flex items-center justify-center">
      {/* 1. Animated Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-brand-500/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-[100px]" />
      </div>

      {/* 2. Grid Pattern Overlay */}
      <div className="absolute inset-0 -z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="mx-auto max-w-6xl w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-[3rem] p-6 md:p-16 lg:p-24 shadow-2xl overflow-hidden"
        >
          {/* Decorative Corner Light */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-brand-500/30 blur-[80px]" />

          {/* Badge */}
          <motion.div 
            variants={itemVariants}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs md:text-sm font-medium text-brand-300 backdrop-blur-md"
          >
            <Sparkles size={14} className="text-brand-400" />
            <span className="tracking-wide uppercase">Empowering Futures</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Design Your Destiny with <br className="hidden md:block" />
            <span className="relative inline-block mt-2">
              <span className="relative z-10 bg-gradient-to-r from-brand-400 via-emerald-400 to-brand-500 bg-clip-text text-transparent">
                Career Initiator
              </span>
              {/* Subtle underline glow */}
              <div className="absolute bottom-2 left-0 h-[2px] w-full bg-brand-500/30 blur-sm" />
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            variants={itemVariants}
            className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-slate-400 md:text-xl"
          >
            Navigate the complex world of education with ease. From college comparisons 
            to exam tracking, we provide the tools you need to succeed.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants} 
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/colleges"
              className="group relative flex w-full sm:w-auto items-center justify-center gap-2 overflow-hidden rounded-2xl bg-brand-500 px-8 py-4 font-bold text-white transition-all hover:scale-105 active:scale-95"
            >
              <span>Explore Colleges</span>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            
            <Link
              href="/careers"
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20"
            >
              <Search size={18} />
              Browse Careers
            </Link>
          </motion.div>

          {/* Stats / Trust Section */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 grid grid-cols-2 gap-8 border-t border-white/5 pt-12 md:grid-cols-3"
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-3xl font-bold text-white">500+</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">Colleges Partnered</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-3xl font-bold text-white">50+</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">Exam Trackers</span>
            </div>
            <div className="flex flex-col items-center gap-1 col-span-2 md:col-span-1">
              <span className="text-3xl font-bold text-white">10k+</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">Success Stories</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}