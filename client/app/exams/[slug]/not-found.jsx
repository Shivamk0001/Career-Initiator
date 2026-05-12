import Link from "next/link";

/** Shown when `notFound()` is triggered for an unknown exam slug. */
export default function ExamSlugNotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">Exam</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-3 text-slate-600">
        We couldn’t find an exam for this link. The slug may be wrong or this exam is no longer listed.
      </p>
      <Link
        href="/exams"
        className="mt-8 inline-flex rounded-xl bg-[#002147] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#003875]"
      >
        Back to exam directory
      </Link>
    </div>
  );
}
