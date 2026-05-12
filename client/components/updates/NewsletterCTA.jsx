"use client";

import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";

export default function NewsletterCTA() {
  return (
    <section id="newsletter" className="scroll-mt-24 mt-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-br from-[#002147] via-[#0a3d6b] to-[#0a4d8c] p-8 shadow-2xl sm:p-10 lg:p-12"
      >
        <div className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-orange-500/25 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="relative mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/25">
            <Mail className="h-6 w-6" aria-hidden />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">Never Miss an Important Update</h2>
          <p className="mt-3 text-sm leading-relaxed text-blue-100/95 sm:text-base">
            Subscribe to receive the latest education and career news directly in your inbox.
          </p>
          <form
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-stretch sm:justify-center"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <label htmlFor="updates-newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="updates-newsletter-email"
              type="email"
              required
              placeholder="you@example.com"
              className="min-h-[48px] w-full rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-blue-200/70 outline-none ring-0 backdrop-blur-sm transition focus:border-orange-300 focus:bg-white/15 sm:max-w-xs sm:flex-1"
            />
            <button
              type="submit"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-orange-400"
            >
              Subscribe
              <Send className="h-4 w-4" aria-hidden />
            </button>
          </form>
          <p className="mt-4 text-[11px] text-blue-200/80">We respect your privacy. Unsubscribe anytime.</p>
        </div>
      </motion.div>
    </section>
  );
}
