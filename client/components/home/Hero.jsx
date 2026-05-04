"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative min-h-[92vh] w-full flex items-center justify-center bg-white overflow-hidden pt-24 md:pt-28">

{/* Background Video Container */}
<div className="absolute inset-0 z-0 overflow-hidden">
  <video
    autoPlay
    loop
    muted
    playsInline
    className="h-full w-full object-cover"
    style={{ opacity: '0.8' }} // Increased opacity slightly for better book color visibility
  >
    <source src="/hero-video.mp4" type="video/mp4" />
  </video>

  {/* 
      DYNAMIC OVERLAY: 
      1. bg-slate-900/5 adds a tiny bit of "weight" to the dark colors without losing light mode feel.
      2. The gradient ensures text readability at the top and bottom.
  */}
  <div className="absolute inset-0 bg-slate-900/5" /> 
  
  <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/40" />

  {/* Subtle Glassmorphism Blur - Optional for high-end look */}
  <div className="absolute inset-0 backdrop-blur-[2px]" />
</div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >

          {/* Heading (UNCHANGED SIZE) */}
          <motion.h1
            variants={itemVariants}
            className="mx-auto -mt-3 md:-mt-6 max-w-4xl text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-semibold tracking-tight text-slate-900 leading-tight"
          >
            Welcome to <br />

            <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-blue-700 bg-clip-text text-transparent font-bold">
              Career Initiator
            </span>
          </motion.h1>

          {/* Subtext (UNCHANGED SIZE) */}
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-2xl text-sm sm:text-lg md:text-xl leading-relaxed text-slate-600 font-normal"
          >
            Discover the best colleges, courses, and career opportunities.
            Build your future with the right guidance and resources.
          </motion.p>

          {/* Buttons (light mode professional) */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/careers"
              className="w-full sm:w-auto rounded-md bg-blue-600 px-8 py-3 text-sm sm:text-base font-semibold text-white transition hover:bg-blue-700 active:scale-95 uppercase tracking-wide"
            >
              Admission
            </Link>

            <Link
              href="/about"
              className="w-full sm:w-auto rounded-md border border-slate-300 bg-white px-8 py-3 text-sm sm:text-base font-semibold text-slate-700 backdrop-blur-md transition hover:bg-slate-100 active:scale-95 uppercase tracking-wide"
            >
              Read More
            </Link>
          </motion.div>

          {/* Stats (light mode clean) */}
          {/* <motion.div
            variants={itemVariants}
            className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-6 border-t border-slate-200 pt-8"
          >
            <div className="p-3 rounded-lg text-center">
              <p className="text-2xl sm:text-3xl font-bold text-slate-900">500+</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-slate-500">
                Colleges
              </p>
            </div>

            <div className="p-3 rounded-lg text-center">
              <p className="text-2xl sm:text-3xl font-bold text-slate-900">100+</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-slate-500">
                Courses
              </p>
            </div>

            <div className="col-span-2 md:col-span-1 p-3 rounded-lg text-center">
              <p className="text-2xl sm:text-3xl font-bold text-slate-900">10k+</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-slate-500">
                Success Stories
              </p>
            </div>
          </motion.div> */}

        </motion.div>
      </div>
    </section>
  );
}