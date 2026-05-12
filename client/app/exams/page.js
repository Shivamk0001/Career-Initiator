import ExamListingPage from "@/components/exams/ExamListingPage";

export const metadata = {
  title: "Entrance Exams 2026 | Career Initiator",
  description:
    "Browse national, state, and university entrance exams — JEE, NEET, CAT, GATE, CLAT, CUET, and more. Filter by stream, level, mode, and application status.",
  openGraph: {
    title: "Entrance Exams | Career Initiator",
    description: "Discover and track entrance exams with smart filters, dates, and prep shortcuts.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Entrance Exams | Career Initiator",
    description: "Discover and track entrance exams with smart filters and key dates."
  }
};

export default function ExamsPage() {
  return <ExamListingPage />;
}
