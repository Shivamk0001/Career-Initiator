import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Award,
  BookOpen,
  Briefcase,
  Building2,
  GraduationCap,
  HelpCircle,
  IndianRupee,
  Layers,
  School,
  Sparkles,
  Timer,
  TrendingUp,
  Users
} from "lucide-react";

function Section({ title, icon: Icon, children, id }) {
  return (
    <section id={id} className="scroll-mt-28 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        {Icon ? <Icon className="h-5 w-5 text-[#002147]" aria-hidden /> : null}
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      </div>
      {children}
    </section>
  );
}

/**
 * Full course detail — server-rendered from mock JSON.
 */
export default function CourseDetailView({ course, similarCourses = [] }) {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 pb-16 pt-4 sm:pt-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[380px] bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(0,33,71,0.08),transparent)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Link
          href="/courses"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#002147] transition hover:text-orange-600"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to courses
        </Link>

        {/* Hero banner */}
        <header className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl">
          <div className="relative aspect-[21/9] min-h-[200px] w-full sm:aspect-[3/1]">
            <Image src={course.image} alt={course.courseName} fill className="object-cover" priority sizes="(max-width:768px) 100vw,1152px" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#002147]/95 via-[#002147]/75 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white sm:p-10">
              <p className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-200 ring-1 ring-white/25">
                <Sparkles className="h-3.5 w-3.5" aria-hidden />
                {course.stream} · {course.level}
              </p>
              <h1 className="mt-3 max-w-3xl text-2xl font-bold leading-tight sm:text-4xl md:text-5xl">{course.courseName}</h1>
              <p className="mt-3 max-w-2xl text-sm text-blue-100/95 sm:text-base">{course.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold ring-1 ring-white/30">
                  {course.specialization}
                </span>
                <span className="rounded-full bg-orange-500/90 px-3 py-1 text-xs font-bold text-white">{course.status}</span>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">{course.mode}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_300px] lg:items-start">
          <div className="flex flex-col gap-8">
            <Section id="overview" title="Course overview" icon={BookOpen}>
              <p className="text-sm leading-relaxed text-slate-600">{course.description}</p>
              <ul className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
                <li className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 ring-1 ring-slate-100">
                  <Timer className="h-4 w-4 text-orange-500" aria-hidden />
                  <span className="font-semibold">{course.duration}</span>
                </li>
                <li className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 ring-1 ring-slate-100">
                  <Layers className="h-4 w-4 text-[#002147]" aria-hidden />
                  <span className="font-semibold">{course.mode}</span>
                </li>
              </ul>
            </Section>

            <Section id="eligibility" title="Eligibility" icon={GraduationCap}>
              <p className="text-sm leading-relaxed text-slate-600">{course.eligibility}</p>
            </Section>

            <Section id="fees" title="Fees structure" icon={IndianRupee}>
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <table className="w-full text-left text-sm">
                  <tbody className="divide-y divide-slate-100">
                    <tr className="bg-slate-50/80">
                      <th className="px-4 py-3 font-semibold text-slate-700">Annual tuition (indicative)</th>
                      <td className="px-4 py-3 font-bold text-[#002147]">{course.feesDisplay}</td>
                    </tr>
                    <tr>
                      <th className="px-4 py-3 font-semibold text-slate-700">Duration</th>
                      <td className="px-4 py-3 text-slate-600">{course.duration}</td>
                    </tr>
                    <tr className="bg-slate-50/50">
                      <th className="px-4 py-3 font-semibold text-slate-700">Mode</th>
                      <td className="px-4 py-3 text-slate-600">{course.mode}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-xs text-slate-500">Fees vary by institute, category, and year — always verify on the official website.</p>
            </Section>

            <Section id="salary" title="Salary insights" icon={TrendingUp}>
              <p className="text-lg font-bold text-emerald-800">{course.averageSalary}</p>
              <p className="mt-2 text-sm text-slate-600">
                Figures are indicative placement ranges for fresh graduates in India; actual offers depend on college,
                location, and role. Medical programmes may show residency-linked stages (*).
              </p>
            </Section>

            <Section id="recruiters" title="Top recruiters" icon={Building2}>
              <div className="flex flex-wrap gap-2">
                {(course.topRecruiters || []).map((r) => (
                  <span key={r} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-800">
                    {r}
                  </span>
                ))}
              </div>
            </Section>

            <Section id="exams" title="Entrance exams" icon={School}>
              <div className="flex flex-wrap gap-2">
                {(course.entranceExams || []).map((e) => (
                  <span key={e} className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-[#002147] ring-1 ring-blue-100">
                    {e}
                  </span>
                ))}
              </div>
            </Section>

            <Section id="careers" title="Career opportunities" icon={Briefcase}>
              <ul className="list-inside list-disc space-y-1 text-sm text-slate-600">
                {(course.careerOptions || []).map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </Section>

            <Section id="skills" title="Skills gained" icon={Award}>
              <ul className="flex flex-wrap gap-2">
                {(course.skillsGained || []).map((s) => (
                  <li key={s} className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-900 ring-1 ring-orange-100">
                    {s}
                  </li>
                ))}
              </ul>
            </Section>

            <Section id="faqs" title="FAQs" icon={HelpCircle}>
              <ul className="space-y-4">
                {(course.faqs || []).map((f, i) => (
                  <li key={i} className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                    <p className="font-semibold text-slate-900">{f.q}</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</p>
                  </li>
                ))}
              </ul>
            </Section>
          </div>

          <aside className="lg:sticky lg:top-24">
            <div className="space-y-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-lg">
              <div className="flex items-center gap-2 text-slate-900">
                <Users className="h-5 w-5 text-[#002147]" aria-hidden />
                <h2 className="text-sm font-bold">Quick facts</h2>
              </div>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Rating</dt>
                  <dd className="font-semibold text-slate-800">{course.rating?.toFixed(1)} / 5</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Student interest</dt>
                  <dd className="font-semibold text-slate-800">{course.totalStudents?.toLocaleString("en-IN")}+ tracked</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Popular colleges</dt>
                  <dd className="text-slate-700">{(course.popularColleges || []).join(", ")}</dd>
                </div>
              </dl>
              <div className="border-t border-slate-100 pt-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">On this page</p>
                <nav className="flex flex-col gap-1 text-sm font-medium text-[#002147]">
                  <a href="#overview" className="rounded-lg px-2 py-1 hover:bg-slate-50">
                    Overview
                  </a>
                  <a href="#fees" className="rounded-lg px-2 py-1 hover:bg-slate-50">
                    Fees
                  </a>
                  <a href="#careers" className="rounded-lg px-2 py-1 hover:bg-slate-50">
                    Careers
                  </a>
                  <a href="#faqs" className="rounded-lg px-2 py-1 hover:bg-slate-50">
                    FAQs
                  </a>
                </nav>
              </div>
            </div>

            {similarCourses.length > 0 ? (
              <div className="mt-6 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-lg">
                <h2 className="text-sm font-bold text-slate-900">Similar courses</h2>
                <ul className="mt-3 space-y-2">
                  {similarCourses.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/courses/${c.slug}`} className="block rounded-xl border border-slate-100 px-3 py-2 text-sm font-medium text-[#002147] transition hover:border-orange-200 hover:bg-orange-50/40">
                        {c.courseName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </div>
  );
}
