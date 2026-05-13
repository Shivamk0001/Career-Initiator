import AboutPage from "@/components/about/AboutPage";

export const metadata = {
  title: "About Us | Career Initiator",
  description:
    "Learn about Career Initiator — mission, vision, values, and how we help Indian students with careers, colleges, courses, exams, and trusted guidance.",
  openGraph: {
    title: "About Us | Career Initiator",
    description:
      "Career Initiator: education technology for smarter career decisions — careers, colleges, courses, exams, and human support.",
    type: "website"
  }
};

export default function AboutRoutePage() {
  return <AboutPage />;
}
