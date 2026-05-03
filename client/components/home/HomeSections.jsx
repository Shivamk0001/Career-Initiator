import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Building2,
  ClipboardCheck,
  GraduationCap,
  LineChart,
  Map,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

export function IntroBand() {
  return (
    <section className="px-4 py-16 md:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-2xl font-bold leading-snug text-white md:text-3xl">
          To achieve our goals we must know our strength
        </h2>
        <p className="mt-6 text-sm leading-relaxed text-slate-400 md:text-lg">
          At Career Initiator, we help students and professionals discover direction through clear
          information, structured planning, and human support when you need it. Whether you are
          choosing a stream after the 10th, shortlisting colleges, tracking exams, or planning a
          career switch, we guide you toward decisions you can explain with confidence—not just
          follow because others did.
        </p>
      </div>
    </section>
  );
}

export function SmartCareerHeading() {
  return (
    <section className="border-y border-white/5 bg-white/[0.02] px-4 py-14 md:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">Why we exist</p>
        <h2 className="mt-3 text-2xl font-bold text-white md:text-4xl">
          Career Initiator — your guide to smart career decisions
        </h2>
        <p className="mt-5 text-sm leading-relaxed text-slate-400 md:text-base">
          Personalised guidance for learners and working professionals: explore careers, compare
          courses, understand exams, and connect the dots between what you enjoy and what the world
          needs—without drowning in random advice threads.
        </p>
      </div>
    </section>
  );
}

export function AudienceSplit() {
  const cards = [
    {
      title: "For students",
      desc: "Confused about what comes next? Map streams, subjects, entrance exams, and college paths with a calm, step-by-step lens.",
      points: ["Best-fit career exploration", "Stream & subject clarity", "Exam timelines & milestones"],
      href: "/careers",
      cta: "Start your journey",
      icon: GraduationCap,
    },
    {
      title: "For professionals",
      desc: "Stuck or scaling? Use our career and course intelligence to evaluate switches, upskilling, and long-term employability.",
      points: ["Growth & switch planning", "Skill-building routes", "Future roles & demand signals"],
      href: "/courses",
      cta: "Explore pathways",
      icon: LineChart,
    },
  ];

  return (
    <section className="px-4 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
        {cards.map((c) => (
          <div
            key={c.title}
            className="flex flex-col rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-950 p-8 shadow-xl md:p-10"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-400">
              <c.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-xl font-bold text-white md:text-2xl">{c.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">{c.desc}</p>
            <ul className="mt-6 space-y-2 text-sm text-slate-300">
              {c.points.map((p) => (
                <li key={p} className="flex gap-2">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-cyan-500" />
                  {p}
                </li>
              ))}
            </ul>
            <Link
              href={c.href}
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-cyan-400 hover:text-cyan-300"
            >
              {c.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ServicesShowcase() {
  const services = [
    {
      title: "Career exploration",
      tagline: "Clear the confusion. Build a career with confidence.",
      body: "Browse careers with context: what the role is, how people enter it, and what to plan for early. Ideal after 8th, 10th, 12th, or graduation when choices multiply overnight.",
      bullets: [
        "After 8th–10th: stream fit",
        "After 12th: course & entrance clarity",
        "Working: pivot and progression",
      ],
      href: "/careers",
      icon: Target,
    },
    {
      title: "Courses & colleges",
      tagline: "Match learning paths to the life you want.",
      body: "Compare courses and institutions with an eye on outcomes—not just brochures. Use our listings to narrow options before you invest years of time and fees.",
      bullets: ["Course catalogues", "College discovery", "Practical shortlisting"],
      href: "/colleges",
      icon: Building2,
    },
    {
      title: "Exams & deadlines",
      tagline: "Never miss the window that defines your year.",
      body: "Central and state entrances, forms, and patterns—surfaced in one place so you can plan revision, mock tests, and backup options calmly.",
      bullets: ["Key dates & patterns", "Multi-exam planning", "Backup routes"],
      href: "/exams",
      icon: ClipboardCheck,
    },
    {
      title: "Latest updates",
      tagline: "Stay current without living inside ten different portals.",
      body: "Curated updates on admissions, careers, and opportunities so you react to real changes—not rumours in comment sections.",
      bullets: ["Policy & admission alerts", "Career spotlights", "Worth-your-time reads"],
      href: "/latest-updates",
      icon: BookOpen,
    },
    {
      title: "Human guidance",
      tagline: "When you need a conversation, not another tab.",
      body: "Reach out for structured help: your background, constraints, and goals turned into a practical plan—similar in spirit to premium counselling platforms that blend data with dialogue.",
      bullets: ["Context-first conversations", "Actionable next steps", "Family-friendly explanations"],
      href: "/contact",
      icon: Users,
    },
    {
      title: "Roadmaps",
      tagline: "From “I like this” to “here is the sequence.”",
      body: "Connect exams, courses, and career milestones in order so you know what comes first, what can run in parallel, and what is a distraction.",
      bullets: ["Sequencing milestones", "Plan B thinking", "Skills vs credentials"],
      href: "/courses",
      icon: Map,
    },
  ];

  return (
    <section className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-bold text-white md:text-4xl">
          How Career Initiator helps you succeed
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-slate-400 md:text-base">
          A full stack of discovery tools—parallel to how leading assessment brands combine tests,
          counselling, and storytelling. Here the emphasis is transparent navigation, trustworthy
          information, and support when you want a real person in the loop.
        </p>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.title}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-cyan-500/30 hover:bg-white/[0.04]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-cyan-400/90">
                {s.tagline}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{s.body}</p>
              <ul className="mt-4 space-y-1.5 text-xs text-slate-500">
                {s.bullets.map((b) => (
                  <li key={b}>• {b}</li>
                ))}
              </ul>
              <Link
                href={s.href}
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-cyan-400 hover:text-cyan-300"
              >
                Know more <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Discover & assess",
      body: "Explore careers, courses, and exams that match your stage. Note what energises you, what you are willing to work for, and any hard constraints (location, budget, time).",
    },
    {
      step: "02",
      title: "Guidance & prioritisation",
      body: "Turn possibilities into a shortlist: two to three serious paths with clear reasons. We help you weigh trade-offs so you are not juggling fifteen tabs and fifteen opinions.",
    },
    {
      step: "03",
      title: "Strategy & next moves",
      body: "Lock in sequences: forms, tests, portfolios, or degree choices—with backup plans. The goal is momentum you can sustain, not a perfect fantasy plan that breaks in week two.",
    },
  ];

  return (
    <section className="border-t border-white/5 px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-bold text-white md:text-4xl">Curious how it works?</h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-sm text-slate-400 md:text-base">
          Thousands of learners use structured guidance to become career-ready. Here is the rhythm we
          recommend—whether you use the site solo or pair it with a counsellor.
        </p>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.step} className="relative rounded-3xl border border-white/10 bg-slate-900/40 p-8">
              <span className="text-4xl font-black text-white/10">{s.step}</span>
              <h3 className="mt-4 text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TrustStats() {
  const stats = [
    ["500+", "Colleges & institutes in focus"],
    ["50+", "Exams & patterns tracked"],
    ["10k+", "Learners touched through content & guidance"],
    ["24/7", "Self-serve discovery anytime"],
  ];

  return (
    <section className="px-4 py-16 md:py-20">
      <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-950/30 via-slate-900/50 to-brand-600/10 p-8 md:p-12">
        <h2 className="text-center text-xl font-bold text-white md:text-2xl">
          Numbers that reflect trust and reach
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-400">
          We are building the calm layer between chaos and clarity—similar to how national counselling
          brands showcase schools, reviews, and accuracy. Your journey gets the same seriousness.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map(([n, l]) => (
            <div key={l} className="text-center">
              <p className="text-3xl font-bold text-cyan-400 md:text-4xl">{n}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-500">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsHome() {
  const items = [
    {
      name: "Parent, Class 10",
      text: "We finally had a single place to compare streams and entrance routes. The counselling tone was practical—not generic motivation posters.",
    },
    {
      name: "Engineering aspirant",
      text: "Exam section saved my semester. I stopped missing form dates and could see backup exams that matched my subjects.",
    },
    {
      name: "Working professional",
      text: "I used the course explorer to plan an MBA pivot. Having career context next to course names made conversations with my manager easier.",
    },
  ];

  return (
    <section className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-bold text-white md:text-3xl">What learners say</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-400">
          Stories from people who wanted clarity, not noise—similar to testimonial walls on full-service
          guidance sites.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <blockquote
              key={t.name}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-sm leading-relaxed text-slate-300"
            >
              <p>&ldquo;{t.text}&rdquo;</p>
              <footer className="mt-4 text-xs font-semibold uppercase tracking-wide text-cyan-400">
                {t.name}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCtaBand() {
  return (
    <section className="px-4 pb-24 pt-4 md:pb-32">
      <div className="mx-auto max-w-4xl rounded-3xl border border-cyan-500/20 bg-cyan-950/20 px-8 py-12 text-center md:px-16">
        <h2 className="text-2xl font-bold text-white md:text-3xl">Ready for a clearer next step?</h2>
        <p className="mt-4 text-sm text-slate-400 md:text-base">
          Jump into colleges, careers, courses, or exams—or talk to us if you want a guided plan.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/colleges"
            className="inline-flex w-full items-center justify-center rounded-2xl bg-cyan-600 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-cyan-500 sm:w-auto"
          >
            Explore colleges
          </Link>
          <Link
            href="#get-started"
            className="inline-flex w-full items-center justify-center rounded-2xl border border-white/20 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-white/5 sm:w-auto"
          >
            Book a conversation
          </Link>
        </div>
      </div>
    </section>
  );
}
