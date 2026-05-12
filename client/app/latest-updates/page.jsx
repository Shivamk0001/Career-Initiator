import { Suspense } from "react";
import UpdatesDirectory from "@/components/updates/UpdatesDirectory";

export const metadata = {
  title: "Latest Updates | Career Initiator",
  description:
    "Exam notifications, admission deadlines, scholarship news, results, and career updates — curated daily for Indian students.",
  openGraph: {
    title: "Latest Updates | Career Initiator",
    description: "Stay informed with education news, exams, admissions, and scholarships.",
    type: "website"
  }
};

function UpdatesFallback() {
  return (
    <div className="min-h-[50vh] bg-gradient-to-b from-slate-50 to-white pt-24 text-center text-sm text-slate-600">Loading updates…</div>
  );
}

export default function LatestUpdatesPage() {
  return (
    <Suspense fallback={<UpdatesFallback />}>
      <UpdatesDirectory />
    </Suspense>
  );
}
