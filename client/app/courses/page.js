import CourseListingPage from "@/components/courses/CourseListingPage";

export const metadata = {
  title: "Courses in India | Career Initiator",
  description:
    "Explore engineering, medical, MBA, law, commerce, science, design, and skill programmes. Compare fees, careers, entrances, and colleges in one premium directory.",
  openGraph: {
    title: "Courses in India | Career Initiator",
    description: "Discover UG, PG, diploma, and certification courses across major Indian streams.",
    type: "website"
  }
};

export default function CoursesPage() {
  return <CourseListingPage />;
}
