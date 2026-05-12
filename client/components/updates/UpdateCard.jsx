"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Bookmark, Calendar, Clock, Eye } from "lucide-react";

function formatDisplayDate(iso) {
  try {
    return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return iso;
  }
}

export default function UpdateCard({ update, bookmarked, onToggleBookmark, index = 0 }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.24) }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_8px_30px_rgba(0,33,71,0.06)] ring-1 ring-slate-100/80 transition hover:-translate-y-1 hover:shadow-[0_16px_44px_rgba(0,33,71,0.12)]"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <Image
          src={update.image}
          alt={update.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
        />
        <button
          type="button"
          onClick={() => onToggleBookmark?.(update)}
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl border backdrop-blur-md transition ${
            bookmarked
              ? "border-orange-200 bg-orange-500 text-white shadow-md"
              : "border-white/40 bg-white/85 text-slate-700 hover:border-orange-200 hover:text-orange-600"
          }`}
          aria-label={bookmarked ? "Remove bookmark" : "Bookmark update"}
        >
          <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-current" : ""}`} aria-hidden />
        </button>
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#002147] shadow-sm ring-1 ring-slate-200/80">
          {update.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="line-clamp-2 text-base font-bold leading-snug text-slate-900 sm:text-lg">{update.title}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-600">{update.excerpt}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-slate-500">
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-orange-500" aria-hidden />
            {formatDisplayDate(update.date)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-[#002147]" aria-hidden />
            {update.readTime}
          </span>
          <span className="inline-flex items-center gap-1">
            <Eye className="h-3.5 w-3.5 text-slate-400" aria-hidden />
            {update.views >= 1000 ? `${(update.views / 1000).toFixed(1)}k` : update.views}
          </span>
        </div>
        <Link
          href={`/latest-updates/${update.slug}`}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-sm font-bold text-[#002147] transition group-hover:border-[#002147]/25 group-hover:bg-[#002147]/5"
        >
          Read more
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </motion.article>
  );
}
