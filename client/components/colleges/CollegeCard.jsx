"use client";

import Link from "next/link";
import { memo } from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink, GitCompare, Heart, MapPin, Sparkles, Star } from "lucide-react";
import CollegeImage from "@/components/colleges/CollegeImage";

function CollegeCardInner({ college, saved, compared, compareDisabled, onSave, onCompare }) {
  const title = college.displayName || college.name;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_8px_30px_rgba(0,33,71,0.08)] ring-1 ring-slate-100/80 before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:opacity-0 before:shadow-[0_0_0_1px_rgba(249,115,22,0.35),0_20px_50px_rgba(0,33,71,0.12)] before:transition-opacity hover:before:opacity-100"
    >
      <div className="relative flex flex-col lg:flex-row">
        <div className="group/image relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-slate-100 lg:aspect-auto lg:h-auto lg:min-h-[220px] lg:w-[min(100%,20rem)]">
          <CollegeImage
            src={college.image}
            alt={college.name || title}
            sizes="(max-width: 1024px) 100vw, 320px"
            className="object-cover transition duration-500 ease-out group-hover/image:scale-[1.05]"
          />
          <div className="absolute left-3 top-3 z-[1] flex flex-wrap gap-2">
            <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold tracking-tight text-[#002147] shadow-md backdrop-blur-sm">
              NIRF #{college.ranking}*
            </span>
            <span className="inline-flex items-center gap-0.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-md">
              <Star className="h-3 w-3 fill-white text-white" aria-hidden />
              {typeof college.rating === "number" ? college.rating.toFixed(1) : college.rating}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onSave?.(college)}
            className={`absolute right-3 top-3 z-[1] grid h-10 w-10 place-items-center rounded-full border shadow-lg backdrop-blur-md transition ${
              saved
                ? "border-rose-200 bg-rose-50 text-rose-600"
                : "border-white/80 bg-white/90 text-slate-600 hover:scale-105 hover:text-rose-600"
            }`}
            aria-label={saved ? "Remove from saved" : "Save college"}
          >
            <Heart className={`h-[18px] w-[18px] ${saved ? "fill-current" : ""}`} />
          </button>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-3 p-5 sm:p-6">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-bold leading-snug text-slate-900 sm:text-xl">{title}</h3>
              {college.stream ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-[#002147] ring-1 ring-blue-100">
                  <Sparkles className="h-3 w-3 text-orange-500" aria-hidden />
                  {college.stream}
                </span>
              ) : null}
            </div>
            {college.shortName && college.name && college.name !== title ? (
              <p className="mt-1 line-clamp-2 text-xs font-medium text-slate-500">{college.name}</p>
            ) : null}
            <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-slate-600">
              <MapPin className="h-4 w-4 shrink-0 text-orange-500" aria-hidden />
              {college.location || [college.city, college.state].filter(Boolean).join(", ") || "India"}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {(college.tags || []).slice(0, 5).map((t) => (
              <span
                key={t}
                className="rounded-full border border-slate-200/80 bg-slate-50 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700"
              >
                {t}
              </span>
            ))}
          </div>

          <p className="flex items-start gap-2 text-xs text-slate-500">
            <Award className="mt-0.5 h-4 w-4 shrink-0 text-[#002147]" aria-hidden />
            <span>{college.accreditation}</span>
          </p>

          <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">
            {college.description || "Explore programmes, eligibility, and official updates on the institution website."}
          </p>

          <div className="rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Featured programmes</p>
            <p className="mt-0.5 text-sm font-semibold text-slate-800">
              {college.coursesText || (college.courses || []).join(" · ")}
            </p>
          </div>
        </div>

        <div className="flex flex-row items-stretch justify-between gap-4 border-t border-slate-100 p-5 sm:p-6 lg:w-56 lg:flex-col lg:justify-center lg:border-l lg:border-t-0 lg:bg-gradient-to-b lg:from-slate-50/50 lg:to-white">
          <div className="flex flex-col justify-center">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Fees (indicative)</p>
            <p className="mt-1 text-base font-bold text-slate-900">{college.feesDisplay}</p>
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-center gap-2.5 lg:w-full">
            {college.website_link ? (
              <Link
                href={college.website_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#002147] via-[#002b5c] to-[#003d7a] px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-[#002147]/25 transition hover:brightness-110 active:scale-[0.98]"
              >
                Apply / Visit
                <ExternalLink className="h-4 w-4 opacity-90" aria-hidden />
              </Link>
            ) : null}
            <button
              type="button"
              disabled={compareDisabled && !compared}
              onClick={() => onCompare?.(college)}
              className={`inline-flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-2.5 text-sm font-semibold transition active:scale-[0.98] ${
                compared
                  ? "border-orange-400 bg-orange-50 text-orange-900"
                  : "border-slate-200 text-slate-800 hover:border-orange-300 hover:bg-orange-50/50"
              } disabled:cursor-not-allowed disabled:opacity-45`}
            >
              <GitCompare className="h-4 w-4" aria-hidden />
              {compared ? "In compare" : "Compare"}
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default memo(CollegeCardInner);
