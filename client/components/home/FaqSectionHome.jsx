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
    <section className="relative px-4 py-20 md:py-28 bg-gradient-to-b from-slate-50 via-white to-slate-100">
      
      {/* soft glow background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.15),transparent_60%)]" />

      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-2xl font-bold text-slate-900 md:text-3xl">
          Frequently asked questions
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-center text-sm text-slate-600 md:text-base">
          Straight answers about how we help you move from confusion to a clear plan.
        </p>

        <ul className="mt-12 space-y-4">
          {ITEMS.map((item, i) => {
            const isOpen = open === i;

            return (
              <li
                key={item.q}
                className="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-slate-900 md:text-base"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    {item.q}
                  </span>

                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-sky-500 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-slate-100 px-5 pb-5 pt-3 text-sm leading-relaxed text-slate-600">
                    {item.a}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}