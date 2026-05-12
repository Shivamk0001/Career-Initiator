/**
 * Server-safe access to mock exam JSON.
 * When a real API exists, swap these functions for fetch/cache calls and keep the same signatures.
 */
import mockExams from "@/data/mockExams.json";

export function getAllExamSlugs() {
  return mockExams.map((exam) => ({ slug: exam.slug }));
}

/** @param {string} slug */
export function getExamBySlug(slug) {
  if (!slug) return null;
  return mockExams.find((exam) => exam.slug === slug) ?? null;
}

export function getExamCount() {
  return mockExams.length;
}
