"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Search, GraduationCap } from "lucide-react";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    },
  };

  return (
    // Background color matched with header for seamless look
    <section className="relative min-h-[85vh] overflow-hidden px-6 pt-12 pb-24 flex flex-col items-center justify-center bg-[#05070a]">
      
      {/* 1. Subtle Glow Backgrounds (No Grids) */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-brand-500/10 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-6xl w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative text-center"
        >
          {/* Badge: Career Initiator Branding */}
          <motion.div 
            variants={itemVariants}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-brand-300 backdrop-blur-xl"
          >
            <GraduationCap size={14} className="text-brand-400" />
            <span className="tracking-widest uppercase">Career Initiator • Clarity In Every Step</span>
          </motion.div>

          {/* Main Heading: Tightened margins and larger scale */}
          <motion.h1 
            variants={itemVariants}
            className="mx-auto max-w-5xl text-5xl font-black tracking-tight text-white sm:text-7xl lg:text-8xl leading-[1.1]"
          >
            To achieve your goals <br />
            <span className="bg-gradient-to-r from-brand-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
               know your strength
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            variants={itemVariants}
            className="mx-auto mt-0 max-w-3xl text-base leading-relaxed text-slate-500 md:text-xl"
          >
            Stop guessing your future. Move from confusion to a structured plan with 
            expert guidance, college intelligence, and exam tracking.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            variants={itemVariants} 
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="#get-started"
              className="group flex w-full sm:w-auto items-center justify-center gap-3 rounded-xl bg-brand-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-brand-500/20 transition-all hover:bg-brand-600 hover:scale-[1.02] active:scale-95"
            >
              Get Started Now
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            
            <Link
              href="/careers"
              className="flex w-full sm:w-auto items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-base font-bold text-white transition-all hover:bg-white/10"
            >
              <Search size={18} />
              Browse Careers
            </Link>
          </motion.div>

          {/* Clean Stats (No Border Box) */}
          <motion.div 
            variants={itemVariants}
            className="mt-20 grid grid-cols-2 gap-12 md:grid-cols-3 opacity-80"
          >
            <div className="text-center">
              <p className="text-3xl font-bold text-white">500+</p>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-slate-500 font-bold">Partnered Colleges</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">50+</p>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-slate-500 font-bold">Exam Trackers</p>
            </div>
            <div className="text-center col-span-2 md:col-span-1">
              <p className="text-3xl font-bold text-emerald-400">10k+</p>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-slate-500 font-bold">Success Stories</p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}