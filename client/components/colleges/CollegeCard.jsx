"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Award, Building2, ExternalLink, GitCompare, Heart, MapPin, Star } from "lucide-react";

export default function CollegeCard({ college, saved, compared, compareDisabled, onSave, onCompare }) {
  const hasImg = Boolean(college.image);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, boxShadow: "0 20px 40px rgba(0,33,71,0.12)" }}
      transition={{ duration: 0.22 }}
      className="group overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-md ring-1 ring-transparent transition hover:ring-orange-200/60"
    >
      <div className="flex flex-col lg:flex-row">
        {/* LEFT — image */}
        <div className="relative h-52 w-full shrink-0 overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50 to-slate-50 lg:h-auto lg:w-64">
          {hasImg ? (
            <>
              <Image
                src={college.image}
                alt={college.name || "College"}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 256px"
                loading="lazy"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/55 via-transparent to-transparent" />
            </>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-[#002147]/35">
              <Building2 className="h-14 w-14" strokeWidth={1.1} />
            </div>
          )}
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/95 px-2.5 py-0.5 text-[11px] font-bold text-[#002147] shadow-sm">
              #{college.ranking} Rank*
            </span>
            <span className="inline-flex items-center gap-0.5 rounded-full bg-orange-500 px-2 py-0.5 text-[11px] font-bold text-white shadow-sm">
              <Star className="h-3 w-3 fill-white text-white" />
              {college.rating?.toFixed?.(1) ?? college.rating}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onSave?.(college)}
            className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border shadow-md backdrop-blur-sm transition ${
              saved ? "border-rose-300 bg-rose-50 text-rose-600" : "border-white/70 bg-white/90 text-slate-600 hover:text-rose-600"
            }`}
            aria-label={saved ? "Remove from saved" : "Save college"}
          >
            <Heart className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* CENTER */}
        <div className="flex flex-1 flex-col gap-2 p-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900 transition group-hover:text-[#002147]">{college.name}</h3>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-slate-600">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-orange-500" />
              {college.location || [college.city, college.state].filter(Boolean).join(", ") || "India"}
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(college.tags || []).slice(0, 4).map((t) => (
              <span key={t} className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                {t}
              </span>
            ))}
            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-800">{college.stream}</span>
          </div>
          <p className="flex items-start gap-1 text-xs text-slate-500">
            <Award className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#002147]" />
            {college.accreditation}
          </p>
          <p className="line-clamp-2 text-sm text-slate-600">{college.description || "Explore programmes and admissions on the official website."}</p>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Top courses</p>
            <p className="text-sm font-medium text-slate-800">{college.coursesText || (college.courses || []).join(" · ")}</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-row items-center justify-between gap-3 border-t border-slate-100 p-5 lg:w-52 lg:flex-col lg:items-stretch lg:justify-center lg:border-l lg:border-t-0">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">Fees (indicative)</p>
            <p className="text-sm font-bold text-slate-900">{college.feesDisplay}</p>
          </div>
          <div className="flex flex-1 flex-col gap-2 lg:w-full">
            {college.website_link ? (
              <Link
                href={college.website_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#002147] to-[#003d7a] px-4 py-2.5 text-center text-sm font-semibold text-white shadow-md transition hover:from-[#003366] hover:to-[#002147]"
              >
                Apply / Visit
                <ExternalLink className="h-4 w-4 opacity-90" />
              </Link>
            ) : null}
            <button
              type="button"
              disabled={compareDisabled && !compared}
              onClick={() => onCompare?.(college)}
              className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                compared
                  ? "border-orange-400 bg-orange-50 text-orange-800"
                  : "border-slate-200 text-slate-700 hover:border-orange-300 hover:bg-orange-50/40"
              } disabled:cursor-not-allowed disabled:opacity-50`}
            >
              <GitCompare className="h-4 w-4" />
              {compared ? "In compare" : "Compare"}
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
