"use client";

import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Bookmark, GraduationCap, IndianRupee, LineChart, Timer } from "lucide-react";

function CareerCardInner({ career, bookmarked, onToggleBookmark }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_8px_30px_rgba(0,33,71,0.08)] ring-1 ring-slate-100/80 transition-shadow hover:shadow-[0_16px_44px_rgba(0,33,71,0.12)]"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <Image
          src={career.image}
          alt={career.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
          sizes="(max-width:768px) 100vw, 360px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-[#002147] shadow">
            {career.category}
          </span>
          {career.featured ? (
            <span className="rounded-full bg-orange-500 px-2.5 py-1 text-[11px] font-bold text-white shadow">Featured</span>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => onToggleBookmark?.(career)}
          className={`absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border shadow-md backdrop-blur-md transition ${
            bookmarked ? "border-rose-200 bg-rose-50 text-rose-600" : "border-white/80 bg-white/90 text-slate-600 hover:text-rose-600"
          }`}
          aria-label={bookmarked ? "Remove bookmark" : "Bookmark career"}
        >
          <Bookmark className={`h-[18px] w-[18px] ${bookmarked ? "fill-current" : ""}`} />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-lg font-bold leading-snug text-slate-900">{career.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">{career.shortDescription}</p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
          <div className="rounded-xl border border-slate-100 bg-slate-50/90 px-2.5 py-2">
            <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">
              <IndianRupee className="h-3 w-3" aria-hidden />
              Avg. salary
            </p>
            <p className="mt-0.5 font-semibold text-emerald-800">{career.averageSalary}</p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/90 px-2.5 py-2">
            <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">
              <LineChart className="h-3 w-3 text-orange-500" aria-hidden />
              Growth
            </p>
            <p className="mt-0.5 font-semibold text-slate-800">{career.growth}</p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/90 px-2.5 py-2">
            <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">
              <Timer className="h-3 w-3" aria-hidden />
              Timeline
            </p>
            <p className="mt-0.5 font-semibold text-slate-800">{career.duration}</p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/90 px-2.5 py-2">
            <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">
              <GraduationCap className="h-3 w-3" aria-hidden />
              Education
            </p>
            <p className="mt-0.5 line-clamp-2 font-semibold text-slate-800">{career.education}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {(career.skills || []).slice(0, 4).map((sk) => (
            <span
              key={sk}
              className="rounded-md bg-blue-50/90 px-2 py-0.5 text-[10px] font-semibold text-[#002147] ring-1 ring-blue-100"
            >
              {sk}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-1">
          <Link
            href={`/careers/${career.slug}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#002147] to-[#0a4d8c] px-4 py-2.5 text-sm font-bold text-white shadow-md transition hover:opacity-95"
          >
            Read more
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default memo(CareerCardInner);
