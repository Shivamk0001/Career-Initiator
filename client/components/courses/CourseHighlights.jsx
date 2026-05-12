"use client";

import { Sparkles, TrendingUp } from "lucide-react";
import TrendingCourses from "@/components/courses/TrendingCourses";

/** Curated rails: popular and trending programmes from the full mock catalog. */
export default function CourseHighlights(props) {
  const { popularCourses = [], trendingCourses = [], ...rest } = props;
  return (
    <div className="mt-12 space-y-12">
      <TrendingCourses
        title="Popular courses"
        icon={Sparkles}
        courses={popularCourses}
        {...rest}
      />
      <TrendingCourses
        title="Trending courses"
        icon={TrendingUp}
        courses={trendingCourses}
        {...rest}
      />
    </div>
  );
}
