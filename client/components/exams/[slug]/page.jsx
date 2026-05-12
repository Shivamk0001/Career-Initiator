import mockExams from "@/data/mockExams.json";
import { notFound } from "next/navigation";

export default function ExamDetailsPage({ params }) {
  const exam = mockExams.find(
    (item) => item.slug === params.slug
  );

  if (!exam) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-slate-900">
          {exam.examName}
        </h1>

        <p className="mt-4 text-slate-600">
          {exam.description}
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border p-4">
            <p className="text-sm text-slate-500">Registration</p>
            <p className="font-semibold">
              {exam.registrationEnd}
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <p className="text-sm text-slate-500">Exam Date</p>
            <p className="font-semibold">
              {exam.examDate}
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <p className="text-sm text-slate-500">Result</p>
            <p className="font-semibold">
              {exam.resultDate}
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <p className="text-sm text-slate-500">Status</p>
            <p className="font-semibold">
              {exam.status}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}