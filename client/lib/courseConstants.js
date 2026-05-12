/** Filters, sorts, and taxonomy for course discovery (aligned with `data/mockCourses.json`). */

export const COURSE_STREAMS = [
  "Engineering",
  "Medical",
  "Management",
  "Law",
  "Commerce",
  "Science",
  "Arts & Humanities",
  "Computer & IT",
  "Design",
  "Hotel Management",
  "Aviation",
  "Agriculture",
  "Government & Skill Courses",
  "Online Certification Courses"
];

export const COURSE_LEVELS = ["UG", "PG", "Diploma", "Certificate"];

export const COURSE_DURATION_FILTERS = [
  "2 Months",
  "3 Months",
  "4 Months",
  "6 Months",
  "9 Months",
  "1 Year",
  "1.5 Years",
  "2 Years",
  "3 Years",
  "4 Years",
  "4.5 Years",
  "5 Years",
  "5.5 Years",
  "12 Months",
  "18 Months"
];

export const COURSE_MODES = ["Full Time", "Part Time", "Online", "Distance"];

/** Common entrance / assessment names for filter chips (subset; courses may list others). */
export const ENTRANCE_EXAM_OPTIONS = [
  "JEE Main",
  "JEE Advanced",
  "GATE",
  "NEET UG",
  "NEET PG",
  "CAT",
  "XAT",
  "CLAT",
  "CUET UG",
  "CUET PG",
  "NIFT",
  "UCEED",
  "CEED",
  "IPMAT",
  "NIMCET",
  "ICAR AIEEA",
  "MHT CET",
  "BITSAT",
  "NCHM JEE",
  "GPAT",
  "MAT",
  "CMAT",
  "SNAP",
  "NMAT",
  "LSAT India",
  "IIT JAM",
  "State CET",
  "NCVT",
  "NSDC Assessment"
];

export const SPECIALIZATION_FILTERS = [
  "Civil",
  "Mechanical",
  "CSE",
  "AI/ML",
  "Data Science",
  "Cyber Security",
  "Electrical",
  "ECE",
  "Medicine",
  "Pharmacy",
  "Finance",
  "Marketing",
  "Law",
  "Commerce",
  "Physics",
  "Chemistry",
  "Journalism",
  "Cloud",
  "Fashion Design",
  "UI/UX",
  "Agriculture",
  "Hotel Management",
  "Aviation",
  "Digital Marketing",
  "Analytics",
  "General Management",
  "Biotechnology",
  "Psychology",
  "Education",
  "Welding"
];

export const COURSE_SORT_OPTIONS = [
  { value: "popularity", label: "Popularity" },
  { value: "feesLow", label: "Fees: Low to High" },
  { value: "feesHigh", label: "Fees: High to Low" },
  { value: "salaryHigh", label: "Highest salary" },
  { value: "latest", label: "Latest courses" },
  { value: "mostViewed", label: "Most viewed" }
];

export const defaultCourseFilters = {
  streams: [],
  levels: [],
  durations: [],
  feeMin: 0,
  feeMax: 40,
  modes: [],
  ratingMin: 0,
  entranceExams: [],
  specializations: []
};

export const COURSE_MARKETING_TOTAL = "10,000+";
