"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Clock, Eye, Share2 } from "lucide-react";
import UpdateCard from "@/components/updates/UpdateCard";
import NewsletterCTA from "@/components/updates/NewsletterCTA";

function formatDisplayDate(iso) {
  try {
    return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return iso;
  }
}

function renderContent(text) {
  if (!text) return null;
  const blocks = text.split(/\n\n+/);
  return blocks.map((block, i) => {
    const lines = block.split("\n");
    return (
      <div key={i} className="space-y-2">
        {lines.map((line, j) => {
          const parts = line.split(/(\*\*[^*]+\*\*)/g);
          return (
            <p key={`${i}-${j}`} className="text-[15px] leading-relaxed text-slate-700 sm:text-base">
              {parts.map((part, k) => {
                if (part.startsWith("**") && part.endsWith("**")) {
                  return (
                    <strong key={k} className="font-bold text-slate-900">
                      {part.slice(2, -2)}
                    </strong>
                  );
                }
                return part;
              })}
            </p>
          );
        })}
      </div>
    );
  });
}

export default function UpdateDetailView({ update, related }) {
  const [bookmarkedIds, setBookmarkedIds] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("ci_update_bookmarks");
      setBookmarkedIds(raw ? JSON.parse(raw) : []);
    } catch {
      setBookmarkedIds([]);
    }
  }, []);

  const onToggleBookmark = useCallback((u) => {
    setBookmarkedIds((prev) => {
      const has = prev.includes(u.id);
      const next = has ? prev.filter((x) => x !== u.id) : [...prev, u.id];
      try {
        localStorage.setItem("ci_update_bookmarks", JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);
  const onShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({ title: update.title, url: window.location.href }).catch(() => {});
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 pb-20 pt-4 sm:pt-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[380px] bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(0,33,71,0.08),transparent)]" />

      <article className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Link
            href="/latest-updates"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#002147] transition hover:text-orange-600"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to updates
          </Link>

          <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-br from-[#002147] via-[#0a3d6b] to-[#0a4d8c] p-6 text-white shadow-2xl sm:p-10">
            <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange-200 ring-1 ring-white/25">
              {update.category}
            </span>
            <h1 className="mt-4 text-2xl font-bold leading-tight sm:text-4xl">{update.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-blue-100/95">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-orange-300" aria-hidden />
                {formatDisplayDate(update.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden />
                {update.readTime}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Eye className="h-4 w-4" aria-hidden />
                {update.views?.toLocaleString?.("en-IN") ?? update.views} views
              </span>
              <button
                type="button"
                onClick={onShare}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/30 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide transition hover:bg-white/20"
              >
                <Share2 className="h-3.5 w-3.5" aria-hidden />
                Share
              </button>
            </div>
          </div>

          <div className="relative -mt-8 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xl ring-1 ring-slate-100/80 sm:-mt-12">
            <div className="relative aspect-[21/9] min-h-[200px] w-full bg-slate-100">
              <Image src={update.image} alt={update.title} fill className="object-cover" sizes="(max-width:896px) 100vw, 896px" priority />
            </div>
            <div className="space-y-6 p-6 sm:p-10">
              <p className="text-lg font-medium leading-relaxed text-slate-800">{update.excerpt}</p>
              <div className="space-y-5 border-t border-slate-100 pt-6">{renderContent(update.content)}</div>
              {update.tags?.length ? (
                <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-6">
                  {update.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200/80">
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </motion.div>
      </article>

      {related?.length ? (
        <section className="relative mx-auto mt-16 max-w-[1440px] px-4 sm:px-6">
          <div className="mb-6 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Related updates</h2>
              <p className="mt-1 text-sm text-slate-600">More in {update.category} and similar topics.</p>
            </div>
            <Link href="/latest-updates" className="hidden items-center gap-1 text-sm font-bold text-[#002147] hover:text-orange-600 sm:inline-flex">
              View all
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((u, i) => (
              <UpdateCard
                key={u.id}
                update={u}
                index={i}
                bookmarked={bookmarkedIds.includes(u.id)}
                onToggleBookmark={onToggleBookmark}
              />
            ))}
          </div>
        </section>
      ) : null}

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6">
        <NewsletterCTA />
      </div>
    </div>
  );
}
