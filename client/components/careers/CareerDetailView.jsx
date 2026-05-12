import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  GraduationCap,
  IndianRupee,
  LineChart,
  Map as MapIcon,
  Sparkles,
  Timer,
  TrendingUp
} from "lucide-react";

/**
 * Career detail layout — matches premium listing pages (#002147, orange, soft cards).
 */
export default function CareerDetailView({ career }) {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 pb-16 pt-4 sm:pt-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[380px] bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(0,33,71,0.08),transparent)]" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <Link
          href="/careers"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#002147] transition hover:text-orange-600"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to careers
        </Link>

        <header className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl">
          <div className="relative aspect-[21/9] min-h-[200px] w-full sm:aspect-[2.4/1]">
            <Image
              src={career.image}
              alt={career.title}
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 896px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/90 via-[#002147]/35 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-200 ring-1 ring-white/25">
                <Sparkles className="h-3.5 w-3.5" aria-hidden />
                {career.category}
              </p>
              <h1 className="mt-3 text-2xl font-bold leading-tight sm:text-4xl md:text-5xl">{career.title}</h1>
            </div>
          </div>
        </header>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm ring-1 ring-slate-100/80">
            <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">
              <IndianRupee className="h-3.5 w-3.5 text-orange-500" aria-hidden />
              Avg. salary
            </p>
            <p className="mt-1 text-lg font-bold text-emerald-800">{career.averageSalary}</p>
          </div>
          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm ring-1 ring-slate-100/80">
            <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">
              <TrendingUp className="h-3.5 w-3.5 text-[#002147]" aria-hidden />
              Growth outlook
            </p>
            <p className="mt-1 text-lg font-bold text-slate-900">{career.growth}</p>
          </div>
          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm ring-1 ring-slate-100/80">
            <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">
              <Timer className="h-3.5 w-3.5" aria-hidden />
              Typical timeline
            </p>
            <p className="mt-1 text-lg font-bold text-slate-900">{career.duration}</p>
          </div>
        </div>

        <section className="mt-8 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-100/80">
          <div className="flex items-center gap-2 text-[#002147]">
            <BookOpen className="h-5 w-5" aria-hidden />
            <h2 className="text-lg font-bold text-slate-900">Overview</h2>
          </div>
          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-600">{career.overview}</p>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-100/80">
          <div className="flex items-center gap-2 text-[#002147]">
            <GraduationCap className="h-5 w-5" aria-hidden />
            <h2 className="text-lg font-bold text-slate-900">Education & eligibility</h2>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{career.education}</p>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-100/80">
          <div className="flex items-center gap-2 text-[#002147]">
            <LineChart className="h-5 w-5" aria-hidden />
            <h2 className="text-lg font-bold text-slate-900">Core skills</h2>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {(career.skills || []).map((s) => (
              <span
                key={s}
                className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#002147] ring-1 ring-blue-100"
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-100/80">
          <div className="flex items-center gap-2 text-[#002147]">
            <MapIcon className="h-5 w-5" aria-hidden />
            <h2 className="text-lg font-bold text-slate-900">Career roadmap</h2>
          </div>
          <ol className="mt-4 space-y-4">
            {(career.roadmap || []).map((step, i) => (
              <li key={step.phase} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#002147] text-xs font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <p className="font-bold text-slate-900">{step.phase}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex flex-1 min-w-[200px] items-center justify-center rounded-xl bg-gradient-to-r from-[#002147] to-[#0a4d8c] px-5 py-3 text-sm font-bold text-white shadow-md transition hover:opacity-95"
          >
            Get counselling
          </Link>
          <Link
            href="/courses"
            className="inline-flex flex-1 min-w-[200px] items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-[#002147] shadow-sm transition hover:border-orange-300 hover:bg-orange-50/50"
          >
            Explore related courses
          </Link>
        </div>

        <p className="mt-6 text-center text-[11px] text-slate-400">
          Information is indicative for student guidance. Verify requirements on official portals and institute notices.
        </p>
      </div>
    </div>
  );
}
