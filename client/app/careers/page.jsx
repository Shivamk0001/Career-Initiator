import CareersDirectory from "@/components/careers/CareersDirectory";

export const metadata = {
  title: "Careers in India | Career Initiator",
  description:
    "Explore 500+ career paths with salary insights, skills, education, and growth outlook. Engineering, medicine, law, business, technology, government, and more — all in one premium directory.",
  openGraph: {
    title: "Careers in India | Career Initiator",
    description: "Discover careers, compare pathways, and plan your future with expert-aligned guidance.",
    type: "website"
  }
};

export default function CareersPage() {
  return <CareersDirectory />;
}
