"use client";

import { BookOpen, ClipboardList, FileText, MonitorPlay, PenLine } from "lucide-react";

const iconMap = {
  eligibility: BookOpen,
  examPattern: ClipboardList,
  syllabus: FileText,
  mockTest: MonitorPlay,
  samplePapers: FileText,
  apply: PenLine
};

/**
 * Quick actions — opens detail tab anchors or shows toast via parent handlers.
 */
export default function ExamActionButtons({ exam, onAction }) {
  const items = [
    { key: "eligibility", label: "Eligibility", icon: iconMap.eligibility, show: Boolean(exam?.eligibility) },
    { key: "examPattern", label: "Exam pattern", icon: iconMap.examPattern, show: Boolean(exam?.examPattern) },
    { key: "syllabus", label: "Syllabus", icon: iconMap.syllabus, show: Boolean(exam?.syllabus) },
    { key: "mockTest", label: "Mock test", icon: iconMap.mockTest, show: Boolean(exam?.mockTest) },
    {
      key: "samplePapers",
      label: "Sample papers",
      icon: iconMap.samplePapers,
      show: Boolean(exam?.samplePapers)
    },
    { key: "apply", label: "Apply now", icon: iconMap.apply, show: exam?.applicationStatus === "Open" }
  ].filter((x) => x.show);

  if (!items.length) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          type="button"
          onClick={() => onAction?.(key, exam)}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-200/90 bg-white px-2 py-1 text-[11px] font-semibold text-[#002147] shadow-sm transition hover:border-orange-300 hover:bg-orange-50/50 hover:text-orange-700"
        >
          <Icon className="h-3 w-3 shrink-0" aria-hidden />
          {label}
        </button>
      ))}
    </div>
  );
}
