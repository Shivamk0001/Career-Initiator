"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const ITEMS = [
  {
    q: "Who is Career Initiator for?",
    a: "Students choosing streams after 8th–10th, learners planning competitive exams, families shortlisting colleges and courses, and professionals exploring the next move. We bring structured information and guidance so decisions feel evidence-led, not guesswork.",
  },
  {
    q: "What do you offer beyond college listings?",
    a: "Curated paths across careers, courses, exams, and latest updates—so you see how choices connect. You can explore timelines, compare options, and reach out when you want human support for planning and prioritisation.",
  },
  {
    q: "How is career guidance different from general advice?",
    a: "Guidance starts from your context: academics, interests, constraints, and goals. It combines reliable data with conversation—similar in spirit to leading counselling platforms that blend assessment, conversation, and actionable next steps.",
  },
  {
    q: "Do you replace school counsellors or parents?",
    a: "No—we complement them. Think of Career Initiator as a research and clarity layer: organised information, prompts, and optional expert conversations that help families and educators align faster.",
  },
  {
    q: "How do I get started?",
    a: "Browse careers, courses, colleges, or exams from the top navigation. When you are ready, use the form on this page or visit Contact to talk to the team about your situation.",
  },
];

export default function FaqSectionHome() {
  const [open, setOpen] = useState(0);

  return (
    <section className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-2xl font-bold text-white md:text-3xl">Frequently asked questions</h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-sm text-slate-400 md:text-base">
          Straight answers about how we help you move from confusion to a clear plan.
        </p>
        <ul className="mt-12 space-y-3">
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="rounded-2xl border border-white/10 bg-white/[0.02]">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-white md:text-base"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  {item.q}
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-cyan-400 transition ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen ? (
                  <div className="border-t border-white/5 px-5 pb-4 pt-0 text-sm leading-relaxed text-slate-400">
                    {item.a}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
