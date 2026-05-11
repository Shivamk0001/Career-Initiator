"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Building2, MapPin, Star } from "lucide-react";

export default function TopCollegesCarousel({ colleges }) {
  if (!colleges?.length) return null;

  return (
    <section className="mb-10">
      <div className="mb-4 flex items-end justify-between gap-4 px-1">
        <div>
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Top Colleges</h2>
          <p className="mt-1 text-sm text-slate-500">Hand-picked spotlight + live picks. Swipe on mobile.</p>
        </div>
      </div>
      <div className="-mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pt-1 scrollbar-thin sm:mx-0">
        {colleges.map((c, idx) => (
          <motion.div
            key={c._id || c.website_link || idx}
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: idx * 0.04 }}
            whileHover={{ scale: 1.02 }}
            className="snap-start shrink-0 w-[min(88vw,300px)] sm:w-[280px]"
          >
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-lg ring-1 ring-slate-100">
              <div className="relative h-40 bg-gradient-to-br from-slate-100 to-blue-50">
                {c.image ? (
                  <Image src={c.image} alt={c.name || "College"} fill className="object-cover" sizes="300px" unoptimized />
                ) : (
                  <div className="flex h-full items-center justify-center text-[#002147]/25">
                    <Building2 className="h-12 w-12" />
                  </div>
                )}
                <div className="absolute left-2 top-2 rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-bold text-[#002147] shadow">
                  #{c.ranking}
                </div>
                <div className="absolute right-2 top-2 inline-flex items-center gap-0.5 rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-bold text-white shadow">
                  <Star className="h-3 w-3 fill-white" />
                  {typeof c.rating === "number" ? c.rating.toFixed(1) : c.rating}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="line-clamp-2 text-base font-bold text-slate-900">{c.name}</h3>
                <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                  <MapPin className="h-3 w-3 shrink-0 text-orange-500" />
                  {c.location || c.city}
                </p>
                <p className="mt-2 text-xs font-semibold text-slate-700">{c.feesDisplay}</p>
                <p className="mt-1 line-clamp-2 text-xs text-slate-500">{c.coursesText || (c.courses || []).join(" · ")}</p>
                {c.website_link ? (
                  <Link
                    href={c.website_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center justify-center gap-1 rounded-xl bg-[#002147] py-2 text-xs font-semibold text-white transition hover:bg-[#003366]"
                  >
                    View Details
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ) : null}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
