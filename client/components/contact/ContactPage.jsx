"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  ChevronDown,
  ChevronRight,
  Clock,
  Headphones,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles
} from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp, FaYoutube } from "react-icons/fa6";
import ContactForm from "@/components/contact/ContactForm";
import { CONTACT_PAGE_FAQS, SITE_CONTACT, getGoogleMapsEmbedUrl } from "@/lib/siteContact";

const mapEmbedUrl = getGoogleMapsEmbedUrl();

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(-1);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 pb-20 pt-4 sm:pt-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(0,33,71,0.12),transparent)]" />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-[#002147] via-[#003366] to-[#0a4d8c] shadow-2xl">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.04%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-90" />

          <div className="relative px-6 py-10 sm:px-10 sm:py-14">
            <nav className="flex flex-wrap items-center gap-1 text-xs font-semibold text-blue-100/90 sm:text-sm" aria-label="Breadcrumb">
              <Link href="/" className="transition hover:text-white">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-blue-200/80" aria-hidden />
              <span className="text-white">Contact Us</span>
            </nav>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="mt-6">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-200 ring-1 ring-white/20">
                <Sparkles className="h-3.5 w-3.5" aria-hidden />
                We are here to help
              </p>
              <h1 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">Contact Us</h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-blue-100/95 sm:text-base">
                Questions about careers, colleges, exams, or courses? Reach out to {SITE_CONTACT.companyName} — our team
                responds to genuine student and partner inquiries with clear, practical guidance.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact cards */}
        <section className="mt-12 sm:mt-16" aria-labelledby="contact-info-heading">
          <h2 id="contact-info-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Get in touch
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
            Prefer a call, email, or visit? Use the details below — every card links where it makes sense for quick access
            on mobile.
          </p>

          <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <ContactCard icon={Phone} title="Phone">
              <a
                href={`tel:${SITE_CONTACT.phoneE164}`}
                className="mt-1 block text-lg font-bold text-[#002147] transition hover:text-orange-600 hover:underline"
              >
                {SITE_CONTACT.phoneDisplay}
              </a>
              <p className="mt-2 text-xs text-slate-500">Same number on WhatsApp</p>
            </ContactCard>

            <ContactCard icon={Mail} title="Email">
              <a
                href={`mailto:${SITE_CONTACT.email}`}
                className="mt-1 break-all text-base font-bold text-[#002147] transition hover:text-orange-600 hover:underline sm:text-lg"
              >
                {SITE_CONTACT.email}
              </a>
            </ContactCard>

            <ContactCard icon={MapPin} title="Office address">
              <p className="mt-1 text-base font-semibold leading-snug text-slate-900">{SITE_CONTACT.addressFull}</p>
              <p className="mt-2 text-xs text-slate-500">Serving students across India — based in Bhopal.</p>
            </ContactCard>

            <ContactCard icon={Clock} title="Working hours">
              <p className="mt-1 text-base font-semibold leading-snug text-slate-900">{SITE_CONTACT.workingHours}</p>
              <p className="mt-2 text-xs text-slate-500">IST (India Standard Time)</p>
            </ContactCard>
          </ul>
        </section>

        {/* Form + company */}
        <section className="mt-12 grid gap-8 lg:grid-cols-3 lg:gap-10 sm:mt-16" aria-labelledby="contact-form-heading">
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-lg ring-1 ring-slate-100/80 sm:p-8 md:p-10">
              <h2 id="contact-form-heading" className="text-xl font-bold text-slate-900 sm:text-2xl">
                Send us a message
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Fields marked with a label are required. We read every submission during business hours.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-md ring-1 ring-slate-100/80 sm:p-8">
              <div className="flex items-start gap-3">
                <Building2 className="h-8 w-8 shrink-0 text-orange-500" aria-hidden />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Company</p>
                  <p className="mt-1 text-lg font-bold text-slate-900">{SITE_CONTACT.companyName}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    Schools, colleges, courses, exams, and career guidance — built for clarity and trustworthy information.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200/90 bg-gradient-to-br from-slate-900 to-[#002147] p-6 text-white shadow-lg sm:p-8">
              <Headphones className="h-8 w-8 text-orange-400" aria-hidden />
              <h3 className="mt-4 text-lg font-bold">Quick response</h3>
              <p className="mt-2 text-sm text-blue-100/90">
                For urgent deadlines, WhatsApp or phone is fastest. Include exam or college name in your first message.
              </p>
              <a
                href={SITE_CONTACT.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold ring-1 ring-white/20 transition hover:bg-white/20"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                Chat on WhatsApp
              </a>
            </div>

            <div className="rounded-3xl border border-slate-200/90 bg-slate-50/80 p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Follow us</p>
              <div className="mt-4 flex flex-wrap gap-3 text-xl text-slate-700">
                <a
                  href={SITE_CONTACT.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-slate-200 bg-white p-3 transition hover:border-orange-300 hover:text-[#1877F2] hover:shadow-md"
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </a>
                <a
                  href={SITE_CONTACT.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-slate-200 bg-white p-3 transition hover:border-orange-300 hover:text-pink-600 hover:shadow-md"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href={SITE_CONTACT.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-slate-200 bg-white p-3 transition hover:border-orange-300 hover:text-[#0A66C2] hover:shadow-md"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a
                  href={SITE_CONTACT.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-slate-200 bg-white p-3 transition hover:border-orange-300 hover:text-red-600 hover:shadow-md"
                  aria-label="YouTube"
                >
                  <FaYoutube />
                </a>
                <a
                  href={SITE_CONTACT.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-slate-200 bg-white p-3 transition hover:border-orange-300 hover:text-[#25D366] hover:shadow-md"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp />
                </a>
              </div>
            </div>
          </aside>
        </section>

        {/* Map */}
        <section className="mt-12 sm:mt-16" aria-labelledby="map-heading">
          <h2 id="map-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Find us
          </h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">Map centered on our office region — {SITE_CONTACT.addressFull}.</p>
          <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200/90 bg-slate-100 shadow-lg ring-1 ring-slate-100/80">
            <iframe
              title={`Map: ${SITE_CONTACT.companyName} — ${SITE_CONTACT.addressFull}`}
              src={mapEmbedUrl}
              className="aspect-[16/10] min-h-[280px] w-full border-0 sm:min-h-[360px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-12 sm:mt-16" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Frequently asked questions
          </h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">Support, response times, and how we handle inquiries.</p>
          <div className="mt-6 space-y-3">
            {CONTACT_PAGE_FAQS.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={faq.q}
                  className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-100/80"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    aria-expanded={open}
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

        {/* CTA */}
        <section className="mt-12 sm:mt-16">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-[#002147] via-[#003366] to-[#0a4d8c] px-6 py-10 text-white shadow-xl sm:px-10 sm:py-12">
            <div className="pointer-events-none absolute -right-16 top-0 h-64 w-64 rounded-full bg-orange-500/25 blur-3xl" />
            <div className="relative max-w-3xl">
              <h2 className="text-2xl font-bold sm:text-3xl">Let&apos;s work together</h2>
              <p className="mt-3 text-sm leading-relaxed text-blue-100/95 sm:text-base">
                Whether you need student support, counseling, media or{" "}
                <span className="font-semibold text-white">business and partnership</span> discussions, we are happy to
                hear from you. Tell us a bit about your goals and we will guide the next step.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href={`mailto:${SITE_CONTACT.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#002147] shadow-md transition hover:bg-blue-50"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  Email us
                </a>
                <a
                  href={`tel:${SITE_CONTACT.phoneE164}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  Call now
                </a>
                <Link
                  href="/more"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-transparent px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  About Career Initiator
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

function ContactCard({ icon: Icon, title, children }) {
  return (
    <li className="group h-full rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm ring-1 ring-slate-100/80 transition hover:-translate-y-0.5 hover:border-orange-200/80 hover:shadow-lg sm:p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500 ring-1 ring-orange-500/20 transition group-hover:scale-105 group-hover:bg-orange-500/15">
        <Icon className="h-6 w-6" aria-hidden />
      </div>
      <p className="mt-4 text-xs font-bold uppercase tracking-wide text-slate-500">{title}</p>
      {children}
    </li>
  );
}
