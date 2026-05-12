/**
 * Server-side course lookup from mock JSON (same source as `courseService` until API exists).
 */
import mockCourses from "@/data/mockCourses.json";

export function getAllCourseSlugs() {
  return mockCourses.map((c) => ({ slug: c.slug }));
}

export function getCourseBySlug(slug) {
  if (!slug) return null;
  return mockCourses.find((c) => c.slug === slug) ?? null;
}

export function getSimilarCourses(slug, limit = 4) {
  const course = getCourseBySlug(slug);
  if (!course) return [];
  return mockCourses.filter((c) => c.slug !== slug && c.stream === course.stream).slice(0, limit);
}
