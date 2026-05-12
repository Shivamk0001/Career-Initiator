import { notFound } from "next/navigation";
import CourseDetailView from "@/components/courses/CourseDetailView";
import { getAllCourseSlugs, getCourseBySlug, getSimilarCourses } from "@/lib/mockCoursesRepository";

export function generateStaticParams() {
  return getAllCourseSlugs();
}

export async function generateMetadata({ params }) {
  const course = getCourseBySlug(params.slug);
  if (!course) return { title: "Course not found | Career Initiator" };
  return {
    title: `${course.courseName} | Career Initiator`,
    description: course.description,
    openGraph: { title: course.courseName, description: course.description }
  };
}

export default function CourseDetailPage({ params }) {
  const course = getCourseBySlug(params.slug);
  if (!course) notFound();
  const similar = getSimilarCourses(params.slug, 5);
  return <CourseDetailView course={course} similarCourses={similar} />;
}
