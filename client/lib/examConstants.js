/** Shared filter + sort definitions for exam discovery (UI + API query keys). */

export const EXAM_STREAMS = [
  "Engineering",
  "Management",
  "Medical",
  "Law",
  "Design",
  "Science",
  "Commerce",
  "Arts",
  "Government",
  "Others"
];

export const EXAM_LEVELS = ["UG", "PG", "Diploma", "Certificate"];

export const EXAM_MODES = ["Online", "Offline", "Hybrid"];

export const EXAM_TYPES = ["National Level", "State Level", "University Level"];

export const APPLICATION_STATUSES = ["Open", "Closed", "Upcoming"];

export const SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "deadline", label: "Application Deadline" },
  { value: "popularity", label: "Popularity" },
  { value: "upcoming", label: "Upcoming Exams" }
];

/** Default filter state — empty arrays mean “no restriction”. */
export const defaultExamFilters = {
  streams: [],
  levels: [],
  modes: [],
  examTypes: [],
  applicationStatuses: []
};
