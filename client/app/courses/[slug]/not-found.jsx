import Link from "next/link";

export default function CourseSlugNotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">Courses</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-3 text-slate-600">This course is not in our directory or the link may be incorrect.</p>
      <Link
        href="/courses"
        className="mt-8 inline-flex rounded-xl bg-[#002147] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#003875]"
      >
        Browse all courses
      </Link>
    </div>
  );
}
