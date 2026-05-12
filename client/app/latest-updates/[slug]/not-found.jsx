import Link from "next/link";

export default function UpdateNotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-20 text-center">
      <h1 className="text-2xl font-bold text-slate-900">Update not found</h1>
      <p className="mt-3 text-sm text-slate-600">This article may have been moved or the link is incorrect.</p>
      <Link href="/latest-updates" className="mt-8 inline-flex rounded-xl bg-[#002147] px-5 py-2.5 text-sm font-bold text-white hover:opacity-95">
        Back to Latest Updates
      </Link>
    </div>
  );
}
