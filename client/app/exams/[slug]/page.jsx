import { notFound } from "next/navigation";
import ExamDetailView from "@/components/exams/ExamDetailView";
import { getAllExamSlugs, getExamBySlug } from "@/lib/mockExamsRepository";

/** Pre-render known exam slugs from mock data (optional optimization). */
export function generateStaticParams() {
  return getAllExamSlugs();
}

export async function generateMetadata({ params }) {
  const exam = getExamBySlug(params.slug);
  if (!exam) {
    return { title: "Exam not found | Career Initiator" };
  }
  return {
    title: `${exam.examName} | Career Initiator`,
    description: exam.description,
    openGraph: {
      title: exam.examName,
      description: exam.description
    }
  };
}

export default function ExamDetailPage({ params }) {
  const exam = getExamBySlug(params.slug);
  if (!exam) {
    notFound();
  }
  return <ExamDetailView exam={exam} />;
}
