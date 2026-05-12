"use client";

import CourseFilters from "@/components/courses/CourseFilters";

/** Desktop sticky wrapper — composes shared filter panel. */
export default function CourseSidebar(props) {
  return <CourseFilters {...props} />;
}
