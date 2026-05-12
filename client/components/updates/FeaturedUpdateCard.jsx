"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Sparkles } from "lucide-react";

export default function FeaturedUpdateCard({ update }) {
  if (!update) return null;
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="group relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-[0_12px_40px_rgba(0,33,71,0.1)] ring-1 ring-slate-100/80"
    >
      <div className="grid gap-0 lg:grid-cols-2">
        <div className="relative aspect-[16/10] min-h-[220px] w-full overflow-hidden bg-slate-100 lg:aspect-auto lg:min-h-[320px]">
          <Image
            src={update.image}
            alt={update.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.03]"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent lg:bg-gradient-to-r" />
          <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Featured
          </span>
        </div>
        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#002147] ring-1 ring-blue-100">
            {update.category}
          </span>
          <h2 className="mt-4 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">{update.title}</h2>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600 sm:text-base">{update.excerpt}</p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 sm:text-sm">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-orange-500" aria-hidden />
              {update.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-[#002147]" aria-hidden />
              {update.readTime}
            </span>
          </div>
          <Link
            href={`/latest-updates/${update.slug}`}
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-[#002147] to-[#0a4d8c] px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:opacity-95"
          >
            Read more
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
