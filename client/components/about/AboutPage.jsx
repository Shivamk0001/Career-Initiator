"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  ChevronRight,
  Compass,
  Headphones,
  HeartHandshake,
  Mail,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Zap
} from "lucide-react";
import AnimatedStats from "@/components/about/AnimatedStats";
import {
  ABOUT_HERO,
  ABOUT_INTRO,
  ABOUT_MISSION,
  ABOUT_PROCESS_STEPS,
  ABOUT_STATS,
  ABOUT_STORY,
  ABOUT_TEAM,
  ABOUT_TESTIMONIALS_INTRO,
  ABOUT_VALUES,
  ABOUT_VISION,
  ABOUT_WHY_CHOOSE
} from "@/data/aboutPageData";
import { HOME_TESTIMONIAL_ITEMS } from "@/components/home/HomeSections";
import { SITE_CONTACT } from "@/lib/siteContact";

const WHY_ICON_MAP = {
  shield: ShieldCheck,
  zap: Zap,
  users: Users,
  target: Target,
  heart: HeartHandshake,
  award: Award
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 pb-20 pt-4 sm:pt-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(0,33,71,0.12),transparent)]" />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-[#002147] via-[#003366] to-[#0a4d8c] shadow-2xl">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.04%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-90" />

          <div className="relative grid gap-10 px-6 py-10 lg:grid-cols-2 lg:items-center lg:px-12 lg:py-14">
            <div>
              <nav className="flex flex-wrap items-center gap-1 text-xs font-semibold text-blue-100/90 sm:text-sm" aria-label="Breadcrumb">
                <Link href="/" className="transition hover:text-white">
                  Home
                </Link>
                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-blue-200/80" aria-hidden />
                <span className="text-white">About Us</span>
              </nav>

              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="mt-6">
                <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-200 ring-1 ring-white/20">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden />
                  {ABOUT_HERO.eyebrow}
                </p>
                <h1 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">{ABOUT_HERO.title}</h1>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-blue-100/95 sm:text-base">{ABOUT_HERO.subtitle}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/careers"
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#002147] shadow-lg transition hover:bg-orange-50"
                  >
                    Explore careers
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/35 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:border-orange-300 hover:bg-orange-500/20"
                  >
                    Contact us
                  </Link>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.06 }}
              className="relative mx-auto w-full max-w-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/20 shadow-2xl ring-1 ring-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&q=80"
                  alt="Students collaborating on academic and career planning"
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 560px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/80 via-transparent to-transparent" />
              </div>
              <div className="absolute -left-2 top-8 rounded-2xl border border-white/25 bg-white/15 px-4 py-3 text-white shadow-lg backdrop-blur-md sm:left-0">
                <p className="text-[10px] font-bold uppercase text-orange-200">Platform</p>
                <p className="text-lg font-bold">Careers</p>
                <p className="text-[11px] text-blue-100/90">Colleges · Courses · Exams</p>
              </div>
              <div className="absolute -right-2 bottom-10 rounded-2xl border border-white/25 bg-white/15 px-4 py-3 text-white shadow-lg backdrop-blur-md sm:right-0">
                <p className="text-[10px] font-bold uppercase text-orange-200">Updates</p>
                <p className="text-lg font-bold">Latest</p>
                <p className="text-[11px] text-blue-100/90">Exams & admissions</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Introduction */}
        <section className="mt-12 rounded-3xl border border-slate-200/90 bg-white p-8 shadow-[0_8px_30px_rgba(0,33,71,0.06)] ring-1 ring-slate-100/80 sm:mt-16 sm:p-10" aria-labelledby="about-intro-heading">
          <h2 id="about-intro-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
            {ABOUT_INTRO.heading}
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            {ABOUT_INTRO.paragraphs.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
          </div>
        </section>

        {/* Our story */}
        <section className="mt-12 sm:mt-16" aria-labelledby="about-story-heading">
          <h2 id="about-story-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
            {ABOUT_STORY.heading}
          </h2>
          <div className="mt-6 space-y-4 rounded-3xl border border-slate-200/90 bg-slate-50/60 p-8 text-sm leading-relaxed text-slate-600 ring-1 ring-slate-100/80 sm:p-10 sm:text-base">
            {ABOUT_STORY.paragraphs.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="mt-12 sm:mt-16" aria-labelledby="about-mvv-heading">
          <h2 id="about-mvv-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Mission, vision & values
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
            The same mission and vision statements featured on our company hub — plus the principles that shape product and
            support.
          </p>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <motion.article
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white to-orange-50/40 p-8 shadow-lg ring-1 ring-slate-100/80"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#002147] text-white">
                <Target className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="mt-4 text-xl font-bold text-slate-900">{ABOUT_MISSION.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">{ABOUT_MISSION.body}</p>
            </motion.article>
            <motion.article
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white to-blue-50/50 p-8 shadow-lg ring-1 ring-slate-100/80"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0a4d8c] text-white">
                <Rocket className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="mt-4 text-xl font-bold text-slate-900">{ABOUT_VISION.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">{ABOUT_VISION.body}</p>
            </motion.article>
            <motion.article
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl border border-slate-200/90 bg-white p-8 shadow-lg ring-1 ring-slate-100/80 lg:col-span-1"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/15 text-orange-600">
                <Compass className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="mt-4 text-xl font-bold text-slate-900">{ABOUT_VALUES.title}</h3>
              <ul className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
                {ABOUT_VALUES.items.map((v) => (
                  <li key={v.title}>
                    <span className="font-bold text-slate-900">{v.title}.</span> {v.text}
                  </li>
                ))}
              </ul>
            </motion.article>
          </div>
        </section>

        {/* Why choose us */}
        <section className="mt-16 sm:mt-20" aria-labelledby="about-why-heading">
          <h2 id="about-why-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Why choose us
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
            Quality guidance, trusted support, and satisfaction-focused outcomes — the same six pillars we highlight on our
            company overview.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ABOUT_WHY_CHOOSE.map((item, i) => {
              const Icon = WHY_ICON_MAP[item.icon] || ShieldCheck;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_8px_30px_rgba(0,33,71,0.06)] ring-1 ring-slate-100/80 transition hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(0,33,71,0.1)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="mt-4 font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Stats */}
        <section className="mt-16 sm:mt-20" aria-labelledby="about-stats-heading">
          <h2 id="about-stats-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Impact at a glance
          </h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Indicative reach figures used across our marketing pages; individual results depend on effort and circumstances.
          </p>
          <div className="mt-8">
            <AnimatedStats stats={ABOUT_STATS} />
          </div>
          <p className="mt-3 text-center text-[11px] text-slate-500">
            *Student satisfaction represents aggregated feedback surveys, as noted on our company hub.
          </p>
        </section>

        {/* Team (no roster in repo — honest narrative) */}
        <section className="mt-16 sm:mt-20" aria-labelledby="about-team-heading">
          <h2 id="about-team-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
            {ABOUT_TEAM.heading}
          </h2>
          <div className="mt-6 rounded-3xl border border-slate-200/90 bg-gradient-to-br from-[#002147] to-[#0a4d8c] p-8 text-white shadow-xl sm:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25">
                <Users className="h-7 w-7 text-orange-200" aria-hidden />
              </div>
              <div>
                <p className="text-sm leading-relaxed text-blue-100/95 sm:text-base">{ABOUT_TEAM.lead}</p>
                <p className="mt-4 text-sm leading-relaxed text-blue-100/90 sm:text-base">{ABOUT_TEAM.note}</p>
                <p className="mt-4 text-xs text-blue-200/80">
                  Office region: {SITE_CONTACT.addressFull} · {SITE_CONTACT.workingHours}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="mt-16 sm:mt-20" aria-labelledby="about-process-heading">
          <h2 id="about-process-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
            How we work with you
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
            From discovery on the platform to human support — aligned with our home page journey and editorial rhythm.
          </p>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {ABOUT_PROCESS_STEPS.map((s, i) => (
              <motion.li
                key={s.step}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="relative rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-100/80"
              >
                <span className="text-3xl font-black text-slate-200">{s.step}</span>
                <h3 className="mt-3 text-base font-bold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.body}</p>
              </motion.li>
            ))}
          </ol>
        </section>

        {/* Testimonials — same quotes as home */}
        <section className="mt-16 sm:mt-20" aria-labelledby="about-testimonials-heading">
          <h2 id="about-testimonials-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
            {ABOUT_TESTIMONIALS_INTRO.heading}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">{ABOUT_TESTIMONIALS_INTRO.sub}</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {HOME_TESTIMONIAL_ITEMS.map((t) => (
              <blockquote
                key={t.name}
                className="rounded-2xl border border-slate-100 bg-slate-50/30 p-6 text-sm leading-relaxed text-slate-600 shadow-sm transition hover:border-slate-200 hover:bg-white hover:shadow-md"
              >
                <p>&ldquo;{t.text}&rdquo;</p>
                <footer className="mt-4 text-xs font-bold uppercase tracking-wide text-cyan-600">{t.name}</footer>
              </blockquote>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 sm:mt-20">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-[#002147] via-[#003366] to-[#0a4d8c] px-6 py-10 text-white shadow-xl sm:px-10 sm:py-12">
            <div className="pointer-events-none absolute -right-16 top-0 h-64 w-64 rounded-full bg-orange-500/25 blur-3xl" />
            <div className="relative max-w-3xl">
              <h2 className="text-2xl font-bold sm:text-3xl">Work with {SITE_CONTACT.companyName}</h2>
              <p className="mt-3 text-sm leading-relaxed text-blue-100/95 sm:text-base">
                Ready for a clearer next step? Explore colleges, careers, or exams — or start a conversation for counseling,
                partnerships, or student support.
              </p>
              <div className="mt-8 flex flex-col flex-wrap gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#002147] shadow-md transition hover:bg-blue-50"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  Contact us
                </Link>
                <Link
                  href="/colleges"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  <BookOpen className="h-4 w-4" aria-hidden />
                  Explore colleges
                </Link>
                <Link
                  href="/more"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-transparent px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  <Headphones className="h-4 w-4" aria-hidden />
                  Company hub
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
