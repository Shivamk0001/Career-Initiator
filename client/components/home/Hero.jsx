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
    <section className="relative min-h-[92vh] w-full flex items-center justify-center bg-white overflow-hidden pt-16 md:pt-20">
      
      {/* Background Video Container */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-slate-900">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          style={{ opacity: '0.6' }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-slate-950/40" /> 
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950/40" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          
          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="mx-auto -mt-4 md:-mt-12 max-w-6xl text-3xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-bold tracking-tight text-white leading-[1.05]"
          >
            Welcome to <br />
            <span className="flex flex-wrap justify-center gap-x-4 mt-2">
              <span className="text-[#F99D1C] uppercase">
                Career
              </span>
              <span className="text-white uppercase">
                Initiator
              </span>
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-4 text-[#fff] font-medium tracking-[0.2em] uppercase text-xs sm:text-sm"
          >
            Guiding Right Career Choices
          </motion.p>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-2xl text-sm sm:text-lg md:text-xl leading-relaxed text-white/80 font-normal"
          >
            Discover the best colleges, courses, and career opportunities.
            Build your future with the right guidance and resources.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/careers"
              className="w-full sm:w-auto rounded-md bg-[#F26838] px-8 py-3 text-sm sm:text-base font-semibold text-white transition hover:bg-blue-700 active:scale-95 uppercase tracking-wide shadow-lg shadow-blue-900/20"
            >
              Admission
            </Link>

            <Link
              href="/about"
              className="w-full sm:w-auto rounded-md border border-white/30 bg-white/10 px-8 py-3 text-sm sm:text-base font-semibold text-white backdrop-blur-md transition hover:bg-white/20 active:scale-95 uppercase tracking-wide"
            >
              Read More
            </Link>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}