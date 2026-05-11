"use client";

import Link from "next/link";
import { memo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Sparkles, Star } from "lucide-react";
import CollegeImage from "@/components/colleges/CollegeImage";

function TopCollegesCarouselInner({ colleges }) {
  if (!colleges?.length) return null;

  return (
    <section className="mb-12">
      <div className="mb-6 flex flex-col gap-1 px-0.5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">Spotlight</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Top Colleges</h2>
          <p className="mt-2 max-w-xl text-sm text-slate-500">
            Curated flagship institutions — verified links and campus imagery. Not algorithm-generated.
          </p>
        </div>
      </div>

      <div
        className="-mx-1 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 pt-1 sm:mx-0 sm:gap-6"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {colleges.map((c, idx) => {
          const headline = c.shortName || c.displayName || c.name;
          const sub = c.shortName && c.name && c.name !== headline ? c.name : null;
          return (
            <motion.div
              key={c._id || c.website_link || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.35, delay: Math.min(idx * 0.05, 0.35) }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="group snap-center shrink-0 w-[min(92vw,340px)] sm:w-[300px] md:w-[320px]"
            >
              <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/75 shadow-[0_12px_40px_rgba(0,33,71,0.12)] ring-1 ring-slate-200/60 backdrop-blur-xl">
                <div className="relative aspect-[5/3] w-full overflow-hidden bg-slate-100">
                  <CollegeImage
                    src={c.image}
                    alt={c.name || headline}
                    sizes="(max-width: 768px) 92vw, 320px"
                    priority={idx < 3}
                    className="object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute left-3 top-3 z-[1] flex flex-wrap gap-2">
                    <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-[#002147] shadow-md backdrop-blur-sm">
                      #{c.ranking}
                    </span>
                    <span className="inline-flex items-center gap-0.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-md">
                      <Star className="h-3 w-3 fill-white" aria-hidden />
                      {typeof c.rating === "number" ? c.rating.toFixed(1) : c.rating}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 z-[1] inline-flex items-center gap-1 rounded-full bg-[#002147]/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                    <Sparkles className="h-3 w-3 text-orange-300" aria-hidden />
                    Featured
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="line-clamp-2 text-lg font-bold leading-tight text-slate-900">{headline}</h3>
                  {sub ? <p className="mt-1 line-clamp-2 text-xs text-slate-500">{sub}</p> : null}
                  <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-slate-600">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-orange-500" aria-hidden />
                    {c.location || c.city}
                  </p>
                  <p className="mt-3 text-sm font-bold text-[#002147]">{c.feesDisplay}</p>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">
                    {c.coursesText || (c.courses || []).join(" · ")}
                  </p>
                  {c.website_link ? (
                    <Link
                      href={c.website_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#002147] to-[#003d7a] py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-110"
                    >
                      View Details
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  ) : null}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default memo(TopCollegesCarouselInner);
