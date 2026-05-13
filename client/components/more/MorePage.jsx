"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Building2,
  ChevronDown,
  Clock,
  GraduationCap,
  HeartHandshake,
  Mail,
  MapPin,
  Phone,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Zap
} from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp, FaYoutube } from "react-icons/fa6";
import { SITE_CONTACT } from "@/lib/siteContact";

const FAQS = [
  {
    q: "How does Career Initiator help students?",
    a: "We bring together careers, colleges, courses, and exam updates in one place so you can compare options, understand eligibility, and plan next steps with clarity — from school to your first job."
  },
  {
    q: "Is counseling free?",
    a: "Many resources on the platform are free to browse. Personalized counseling may be a paid service depending on the package you choose — contact us for current offerings."
  },
  {
    q: "How often is information updated?",
    a: "Our editorial team tracks official notices, exam calendars, and admission circulars regularly. Always verify critical dates on the official website of the exam or university."
  },
  {
    q: "How can I contact the team?",
    a: "Email us, call during working hours, or message on WhatsApp. We typically respond within one business day for general queries."
  }
];

const WHY = [
  { icon: ShieldCheck, title: "Trusted Career Guidance", desc: "Structured pathways and verified sources — no random advice." },
  { icon: Zap, title: "Updated Information", desc: "Exam dates, fees, and admission news refreshed as circulars drop." },
  { icon: Users, title: "Expert Counselors", desc: "Human support when you need clarity beyond articles and filters." },
  { icon: Target, title: "Personalized Recommendations", desc: "Suggestions aligned to your stream, marks, and goals." },
  { icon: HeartHandshake, title: "Student-Focused Approach", desc: "Plain language, mobile-friendly layouts, and zero jargon walls." },
  { icon: Award, title: "Proven Results", desc: "Thousands of students use our tools to shortlist careers and colleges." }
];

const SERVICES = [
  { icon: Briefcase, title: "Career Counseling", desc: "Explore roles that fit your strengths and market demand." },
  { icon: Building2, title: "College Selection Guidance", desc: "Compare campuses, placements, and fees side by side." },
  { icon: BookOpen, title: "Course Recommendations", desc: "UG, PG, and professional courses mapped to outcomes." },
  { icon: GraduationCap, title: "Exam Updates", desc: "JEE, NEET, CUET, CAT, GATE, UPSC, and state entrances." },
  { icon: Sparkles, title: "Scholarship Assistance", desc: "National and state schemes with eligibility snapshots." },
  { icon: Rocket, title: "Admission Support", desc: "Forms, deadlines, and document checklists in one flow." }
];

const STATS = [
  { value: "50K+", label: "Students Guided" },
  { value: "500+", label: "Career Options" },
  { value: "1000+", label: "Colleges Covered" },
  { value: "95%", label: "Student Satisfaction*" }
];

const QUICK = [
  { href: "/careers", label: "Careers" },
  { href: "/colleges", label: "Colleges" },
  { href: "/exams", label: "Exams" },
  { href: "/courses", label: "Courses" },
  { href: "/latest-updates", label: "Latest Updates" },
  { href: "/contact", label: "Contact Us" }
];

export default function MorePage() {
  const [openFaq, setOpenFaq] = useState(-1);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 pb-20 pt-4 sm:pt-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(0,33,71,0.1),transparent)]" />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6">
        {/* 1 Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-[#002147] via-[#003366] to-[#0a4d8c] shadow-2xl">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="relative grid gap-10 px-6 py-12 lg:grid-cols-2 lg:items-center lg:px-12 lg:py-16">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-200 ring-1 ring-white/20">
                <Sparkles className="h-3.5 w-3.5" aria-hidden />
                About Career Initiator
              </p>
              <h1 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                Empowering Students to Make Smarter Career Decisions
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-blue-100/95 sm:text-base">
                Career Initiator helps students discover the right careers, colleges, courses, and opportunities through trusted
                guidance and updated information.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/careers"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#002147] shadow-lg transition hover:bg-orange-50"
                >
                  Explore Careers
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/35 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:border-orange-300 hover:bg-orange-500/20"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.06 }}
              className="relative mx-auto w-full max-w-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/20 shadow-2xl ring-1 ring-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&q=80"
                  alt="Students planning careers"
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 560px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/80 via-transparent to-transparent" />
              </div>
              <div className="absolute -left-2 top-8 rounded-2xl border border-white/25 bg-white/15 px-4 py-3 text-white shadow-lg backdrop-blur-md sm:left-0">
                <p className="text-[10px] font-bold uppercase text-orange-200">Trusted</p>
                <p className="text-lg font-bold">50K+</p>
                <p className="text-[11px] text-blue-100/90">Students guided*</p>
              </div>
              <div className="absolute -right-2 bottom-10 rounded-2xl border border-white/25 bg-white/15 px-4 py-3 text-white shadow-lg backdrop-blur-md sm:right-0">
                <p className="text-[10px] font-bold uppercase text-orange-200">Coverage</p>
                <p className="text-lg font-bold">1000+</p>
                <p className="text-[11px] text-blue-100/90">Colleges*</p>
              </div>
            </motion.div>
          </div>
          <p className="border-t border-white/10 px-6 py-2.5 text-center text-[10px] text-blue-200/80 lg:px-12">
            *Indicative metrics — results vary by individual effort and circumstances.
          </p>
        </section>

        {/* 2 About */}
        <section className="mt-16 rounded-3xl border border-slate-200/90 bg-white p-8 shadow-[0_8px_30px_rgba(0,33,71,0.06)] ring-1 ring-slate-100/80 sm:p-10">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Who we are</h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            <p>
              Career Initiator is an education technology platform built for Indian students and parents navigating an increasingly
              complex landscape of entrance exams, admissions, scholarships, and career choices.
            </p>
            <p>
              <strong className="text-slate-900">What we do:</strong> We aggregate reliable information, present it in a clean
              interface, and layer guidance so you can move from exploration to shortlisting to action — without drowning in PDFs
              and unofficial Telegram forwards.
            </p>
            <p>
              <strong className="text-slate-900">How we help:</strong> Whether you are in Class 10 deciding streams, in Class 12
              preparing for competitive exams, or a graduate evaluating PG options, we surface pathways, deadlines, and next steps
              in language you can actually use.
            </p>
            <p>
              <strong className="text-slate-900">Our long-term vision:</strong> A country where every learner, regardless of city
              or school tier, has access to the same quality of career intelligence as top metro counseling centres.
            </p>
          </div>
        </section>

        {/* 3 Mission & Vision */}
        <section className="mt-12 grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white to-orange-50/40 p-8 shadow-lg ring-1 ring-slate-100/80"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#002147] text-white">
              <Target className="h-6 w-6" aria-hidden />
            </div>
            <h3 className="mt-4 text-xl font-bold text-slate-900">Our Mission</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              To democratize career clarity — combining data, design, and human empathy so students make confident decisions about
              what to study, where to apply, and how to prepare.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white to-blue-50/50 p-8 shadow-lg ring-1 ring-slate-100/80"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0a4d8c] text-white">
              <Rocket className="h-6 w-6" aria-hidden />
            </div>
            <h3 className="mt-4 text-xl font-bold text-slate-900">Our Vision</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              To become India&apos;s most trusted student companion — from first career question to first offer letter — with tools
              that feel as polished as consumer apps and as serious as admission season demands.
            </p>
          </motion.div>
        </section>

        {/* 4 Why choose us */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Why choose us</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">Six reasons students and parents keep coming back.</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_8px_30px_rgba(0,33,71,0.06)] ring-1 ring-slate-100/80 transition hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(0,33,71,0.1)]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600">
                  <item.icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-4 font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 5 Services */}
        <section className="mt-16 rounded-3xl border border-slate-200/90 bg-slate-50/80 p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Services we offer</h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">End-to-end support across your academic journey.</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-md transition hover:border-[#002147]/20"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#002147]/8 text-[#002147]">
                  <s.icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-4 font-bold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 6 Impact stats */}
        <section className="mt-16">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-slate-200/90 bg-white p-6 text-center shadow-[0_8px_30px_rgba(0,33,71,0.06)] ring-1 ring-slate-100/80"
              >
                <p className="text-2xl font-bold tabular-nums text-[#002147]">{s.value}</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">{s.label}</p>
              </motion.div>
            ))}
          </div>
          <p className="mt-3 text-center text-[11px] text-slate-500">*Satisfaction figure represents aggregated feedback surveys.</p>
        </section>

        {/* 7 FAQ */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Frequently asked questions</h2>
          <div className="mt-6 space-y-3">
            {FAQS.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div key={faq.q} className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-100/80">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-sm font-bold text-slate-900 sm:text-base"
                  >
                    {faq.q}
                    <ChevronDown className={`h-5 w-5 shrink-0 text-slate-500 transition ${open ? "rotate-180" : ""}`} aria-hidden />
                  </button>
                  <AnimatePresence initial={false}>
                    {open ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="overflow-hidden border-t border-slate-100"
                      >
                        <p className="px-5 py-4 text-sm leading-relaxed text-slate-600">{faq.a}</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* 8 Contact */}
        <section className="mt-16 rounded-3xl border border-slate-200/90 bg-white p-8 shadow-lg ring-1 ring-slate-100/80 sm:p-10">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Contact information</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-5">
              <Building2 className="h-6 w-6 shrink-0 text-orange-500" aria-hidden />
              <div>
                <p className="text-xs font-bold uppercase text-slate-500">Company</p>
                <p className="mt-1 font-semibold text-slate-900">{SITE_CONTACT.companyName}</p>
              </div>
            </div>
            <div className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-5">
              <Mail className="h-6 w-6 shrink-0 text-orange-500" aria-hidden />
              <div>
                <p className="text-xs font-bold uppercase text-slate-500">Email</p>
                <a href={`mailto:${SITE_CONTACT.email}`} className="mt-1 block font-semibold text-[#002147] hover:underline">
                  {SITE_CONTACT.email}
                </a>
              </div>
            </div>
            <div className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-5">
              <Phone className="h-6 w-6 shrink-0 text-orange-500" aria-hidden />
              <div>
                <p className="text-xs font-bold uppercase text-slate-500">Phone</p>
                <a href={`tel:${SITE_CONTACT.phoneE164}`} className="mt-1 block font-semibold text-[#002147] hover:underline">
                  {SITE_CONTACT.phoneDisplay}
                </a>
              </div>
            </div>
            <div className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-5">
              <MapPin className="h-6 w-6 shrink-0 text-orange-500" aria-hidden />
              <div>
                <p className="text-xs font-bold uppercase text-slate-500">Address</p>
                <p className="mt-1 font-semibold text-slate-900">{SITE_CONTACT.addressFull}</p>
              </div>
            </div>
            <div className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-5 sm:col-span-2">
              <Clock className="h-6 w-6 shrink-0 text-orange-500" aria-hidden />
              <div>
                <p className="text-xs font-bold uppercase text-slate-500">Working hours</p>
                <p className="mt-1 font-semibold text-slate-900">{SITE_CONTACT.workingHours}</p>
              </div>
            </div>
          </div>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#002147] to-[#0a4d8c] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:opacity-95"
          >
            Contact Us
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </section>

        {/* 9 Social */}
        <section className="mt-16 rounded-3xl border border-slate-200/90 bg-gradient-to-br from-[#002147] to-[#0a4d8c] p-8 text-white shadow-xl sm:p-10">
          <h2 className="text-xl font-bold sm:text-2xl">Follow us</h2>
          <p className="mt-2 text-sm text-blue-100/90">Tips, deadline reminders, and student stories on your favourite channels.</p>
          <div className="mt-6 flex flex-wrap gap-4 text-2xl">
            <a href={SITE_CONTACT.social.facebook} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/20 bg-white/10 p-3 transition hover:bg-white/20" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href={SITE_CONTACT.social.instagram} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/20 bg-white/10 p-3 transition hover:bg-white/20" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href={SITE_CONTACT.social.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/20 bg-white/10 p-3 transition hover:bg-white/20" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href={SITE_CONTACT.social.youtube} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/20 bg-white/10 p-3 transition hover:bg-white/20" aria-label="YouTube">
              <FaYoutube />
            </a>
            <a href={SITE_CONTACT.social.whatsapp} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/20 bg-white/10 p-3 transition hover:bg-white/20" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
          </div>
        </section>

        {/* 10 Quick links */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Quick links</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {QUICK.map((q) => (
              <Link
                key={q.href}
                href={q.href}
                className="flex items-center justify-between rounded-2xl border border-slate-200/90 bg-white px-5 py-4 text-sm font-bold text-slate-800 shadow-sm ring-1 ring-slate-100/80 transition hover:border-orange-200 hover:bg-orange-50/50 hover:text-[#002147]"
              >
                {q.label}
                <ArrowRight className="h-4 w-4 text-orange-500" aria-hidden />
              </Link>
            ))}
          </div>
        </section>

        {/* 11 Final CTA */}
        <section className="mt-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-8 text-center shadow-[0_12px_40px_rgba(0,33,71,0.1)] ring-1 ring-slate-100/80 sm:p-12"
          >
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Need personalized career guidance?</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600 sm:text-base">
              Connect with our experts to get recommendations tailored to your goals.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-orange-400"
              >
                Book Counseling
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-6 py-3 text-sm font-bold text-[#002147] transition hover:border-[#002147]/30"
              >
                Explore Careers
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
