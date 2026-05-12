import Link from "next/link";
import { ArrowLeft, CalendarRange, FileText, GraduationCap, Layers, Sparkles } from "lucide-react";
import { formatExamDate } from "@/services/examService";

function statusTone(status) {
  const s = (status || "").toLowerCase();
  if (s === "open") return "bg-emerald-50 text-emerald-800 ring-emerald-200";
  if (s === "closed") return "bg-slate-100 text-slate-700 ring-slate-200";
  if (s === "tentative") return "bg-amber-50 text-amber-900 ring-amber-200";
  if (s === "upcoming") return "bg-sky-50 text-sky-800 ring-sky-200";
  return "bg-slate-50 text-slate-700 ring-slate-200";
}

function DateTile({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm">
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
      <p className="mt-1 text-base font-semibold text-slate-900">{formatExamDate(value)}</p>
    </div>
  );
}

function Section({ id, icon: Icon, title, children }) {
  return (
    <section id={id} className="scroll-mt-28 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        {Icon ? <Icon className="h-5 w-5 text-[#002147]" aria-hidden /> : null}
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      </div>
      <div className="max-w-none text-sm leading-relaxed text-slate-600">{children}</div>
    </section>
  );
}

/**
 * Full exam detail layout — rendered from server after slug resolves from mock JSON.
 */
export default function ExamDetailView({ exam }) {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 pb-16 pt-4 sm:pt-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(0,33,71,0.1),transparent)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Link
          href="/exams"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#002147] transition hover:text-orange-600"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to all exams
        </Link>

        {/* Hero */}
        <header className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-[#002147] via-[#003366] to-[#0a4d8c] px-6 py-10 text-white shadow-2xl sm:px-10 sm:py-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-orange-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 left-8 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="relative">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-200 ring-1 ring-white/20">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              {exam.examType} · {exam.mode}
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">{exam.examName}</h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-blue-100/95 sm:text-base">{exam.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold ring-1 ring-white/25">
                {exam.stream}
              </span>
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold ring-1 ring-white/25">
                {exam.level}
              </span>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ring-1 ${statusTone(exam.status)}`}>{exam.status}</span>
              <span className="rounded-full bg-orange-500/90 px-3 py-1 text-xs font-bold text-white ring-1 ring-orange-300/50">
                Application: {exam.applicationStatus}
              </span>
            </div>
          </div>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_300px] lg:items-start">
          {/* Main column */}
          <div className="flex min-w-0 flex-col gap-8">
            <Section id="eligibility" icon={GraduationCap} title="Eligibility">
              <p>{exam.eligibility}</p>
            </Section>

            <Section id="pattern" icon={Layers} title="Exam pattern">
              <p>{exam.examPattern}</p>
            </Section>

            <Section id="syllabus" icon={FileText} title="Syllabus">
              <p>{exam.syllabus}</p>
            </Section>

            <div className="flex flex-wrap gap-3">
              {exam.samplePapers ? (
                <span className="inline-flex rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
                  Sample papers available
                </span>
              ) : null}
              {exam.mockTest ? (
                <span className="inline-flex rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
                  Official mock tests
                </span>
              ) : null}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/exams"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-[#002147] shadow-sm transition hover:border-orange-300 hover:bg-orange-50/60"
              >
                Browse more exams
              </Link>
              {exam.applicationStatus === "Open" ? (
                <span
                  className="inline-flex cursor-default items-center justify-center rounded-xl bg-gradient-to-r from-[#002147] to-[#0a4d8c] px-5 py-3 text-sm font-semibold text-white shadow-md opacity-95"
                  title="Official registration URL will be wired from your backend or CMS."
                >
                  Apply / Register
                </span>
              ) : (
                <span className="inline-flex items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-3 text-sm font-medium text-slate-500">
                  Registration {exam.applicationStatus === "Closed" ? "closed" : "not open yet"}
                </span>
              )}
            </div>
          </div>

          {/* Sticky sidebar — dates + quick nav */}
          <aside className="lg:sticky lg:top-24">
            <div className="space-y-4 rounded-2xl border border-slate-200/90 bg-white/95 p-5 shadow-lg shadow-slate-900/5 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-slate-900">
                <CalendarRange className="h-5 w-5 text-[#002147]" aria-hidden />
                <h2 className="text-sm font-bold">Important dates</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <DateTile label="Registration starts" value={exam.registrationStart} />
                <DateTile label="Registration ends" value={exam.registrationEnd} />
                <DateTile label="Admit card" value={exam.admitCardDate} />
                <DateTile label="Exam date" value={exam.examDate} />
                <DateTile label="Result" value={exam.resultDate} />
              </div>

              <nav className="border-t border-slate-100 pt-4" aria-label="On this page">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Jump to</p>
                <ul className="space-y-1 text-sm font-medium text-[#002147]">
                  <li>
                    <a href="#eligibility" className="block rounded-lg px-2 py-1.5 hover:bg-slate-50">
                      Eligibility
                    </a>
                  </li>
                  <li>
                    <a href="#pattern" className="block rounded-lg px-2 py-1.5 hover:bg-slate-50">
                      Exam pattern
                    </a>
                  </li>
                  <li>
                    <a href="#syllabus" className="block rounded-lg px-2 py-1.5 hover:bg-slate-50">
                      Syllabus
                    </a>
                  </li>
                </ul>
              </nav>

              <p className="text-[10px] leading-relaxed text-slate-400">
                Always verify dates and links on the official conducting body website before applying.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
