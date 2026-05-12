"use client";

import { Flame } from "lucide-react";
import CourseCard from "@/components/courses/CourseCard";

/**
 * Horizontal strip of course cards (popular / trending rails).
 */
export default function TrendingCourses({
  title,
  icon: Icon = Flame,
  courses = [],
  bookmarkIds = [],
  compareIds = [],
  onBookmark,
  onShare,
  onCompare,
  className = ""
}) {
  if (!courses.length) return null;
  return (
    <section className={className}>
      <div className="mb-4 flex items-center gap-2">
        {Icon ? <Icon className="h-5 w-5 text-orange-500" aria-hidden /> : null}
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{title}</h2>
      </div>
      <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 pt-1 scrollbar-thin sm:mx-0 sm:px-0">
        {courses.map((course) => (
          <div key={course.id} className="w-[min(88vw,340px)] shrink-0 sm:w-[300px]">
            <CourseCard
              course={course}
              compact
              bookmarked={bookmarkIds.includes(course.id)}
              compared={compareIds.includes(course.id)}
              compareDisabled={compareIds.length >= 3 && !compareIds.includes(course.id)}
              onBookmark={onBookmark}
              onShare={onShare}
              onCompare={onCompare}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
