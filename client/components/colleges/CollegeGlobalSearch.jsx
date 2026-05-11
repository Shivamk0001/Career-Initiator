"use client";

/**
 * Colleges discovery page (re-export).
 * Curated spotlight data: `components/colleges/topCollegesData.js` → TOP_COLLEGES (not SerpApi).
 * Live search: `/api/colleges/search` with client-side sanitization in `lib/collegeSearchUtils.js`.
 */
import CollegeSearchPage from "@/components/colleges/CollegeSearchPage";

export default CollegeSearchPage;
