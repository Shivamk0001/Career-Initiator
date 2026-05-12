/**
 * Latest education updates — used by listing and detail routes until CMS/API is wired.
 */

export const UPDATE_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "Exams", label: "Exams" },
  { id: "Admissions", label: "Admissions" },
  { id: "Scholarships", label: "Scholarships" },
  { id: "Results", label: "Results" },
  { id: "Career News", label: "Career News" },
  { id: "Government Jobs", label: "Government Jobs" }
];

export const UPDATE_SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "popular", label: "Most Popular" },
  { value: "trending", label: "Trending" }
];

export const UPDATES = [
  {
    id: "u1",
    slug: "jee-main-2026-session-dates-announced",
    title: "JEE Main 2026: NTA announces session-wise exam schedule",
    category: "Exams",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&q=80",
    excerpt: "National Testing Agency releases official dates for January and April sessions; registration window opens next week.",
    content:
      "The National Testing Agency (NTA) has published the official calendar for JEE Main 2026, covering both January and April sessions. Candidates should verify eligibility, photograph specifications, and fee payment timelines on the official NTA portal.\n\n**What students should do next**\n\n1. Download the official information bulletin.\n2. Keep PCM syllabus revision aligned with NTA topic weightage.\n3. Plan mock tests around the published session dates.\n\nCareer Initiator will continue to summarise official circulars — always cross-check with nta.ac.in before applying.",
    date: "2026-05-10",
    readTime: "4 min read",
    views: 12800,
    featured: true,
    tags: ["JEE Main", "NTA", "Engineering"]
  },
  {
    id: "u2",
    slug: "neet-ug-2026-application-correction-window",
    title: "NEET UG 2026: Application correction window opens for 48 hours",
    category: "Exams",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80",
    excerpt: "Candidates can edit category, medium, and exam city choices — no new photograph upload this cycle.",
    content:
      "NMC/NTA has enabled a short correction window for NEET UG 2026 applicants. Use this opportunity to fix errors in personal details that could affect admit cards or counselling eligibility.\n\n**Important:** City change is subject to seat availability. Medical aspirants should also verify state domicile rules for 85% state quota seats.",
    date: "2026-05-09",
    readTime: "3 min read",
    views: 18200,
    featured: false,
    tags: ["NEET", "Medical"]
  },
  {
    id: "u3",
    slug: "cuet-pg-2026-city-intimation-slip",
    title: "CUET PG 2026: City intimation slip released for June exams",
    category: "Admissions",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900&q=80",
    excerpt: "NTA activates advance city display for PG entrance — download from candidate login.",
    content:
      "CUET PG city slips help candidates plan travel and accommodation early. If your city is far from preference, check the official FAQ on change policy (usually limited).\n\nCentral universities will release programme-specific cut-offs after results; keep programme codes handy for counselling forms.",
    date: "2026-05-08",
    readTime: "3 min read",
    views: 6400,
    featured: false,
    tags: ["CUET", "PG"]
  },
  {
    id: "u4",
    slug: "national-scholarship-portal-may-disbursement",
    title: "National Scholarship Portal: May disbursement batch for merit schemes",
    category: "Scholarships",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&q=80",
    excerpt: "Merit-cum-means and central sector schemes — verify Aadhaar seeding and bank account status.",
    content:
      "Students awaiting NSP payments should confirm that their institute has verified the application and that PFMS bank validation is successful. Rejected applications often cite IFSC mismatch or name mismatch with bank records.\n\nContact your college scholarship cell before the grievance deadline.",
    date: "2026-05-07",
    readTime: "5 min read",
    views: 9200,
    featured: false,
    tags: ["Scholarships", "NSP"]
  },
  {
    id: "u5",
    slug: "gate-2026-scorecard-validity-iit-admissions",
    title: "GATE 2026: Scorecard validity extended for IIT M.Tech admissions",
    category: "Results",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=900&q=80",
    excerpt: "COAP and institute portals align on common validity window — check individual IIT COAP rounds.",
    content:
      "GATE scorecards remain valid for three years from the date of result declaration. IITs use COAP for many M.Tech programmes; keep offer acceptance deadlines on your calendar to avoid seat forfeiture.\n\nPSUs may publish separate recruitment notices referencing GATE scores — read eligibility clauses carefully.",
    date: "2026-05-06",
    readTime: "4 min read",
    views: 7100,
    featured: false,
    tags: ["GATE", "IIT"]
  },
  {
    id: "u6",
    slug: "cat-2026-registration-timeline-preview",
    title: "CAT 2026: Expected registration timeline and document checklist",
    category: "Career News",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80",
    excerpt: "IIM CAT convenor cycle begins August — prepare valid ID, category certificates, and work experience proofs.",
    content:
      "While official CAT 2026 dates await the convening IIM announcement, historically registration opens in the first week of August. Start scanning documents in 200–300 dpi colour PDF format.\n\nWorking professionals should align recommender availability if any institute forms require professional references beyond CAT.",
    date: "2026-05-05",
    readTime: "6 min read",
    views: 5400,
    featured: false,
    tags: ["CAT", "MBA"]
  },
  {
    id: "u7",
    slug: "upsc-cse-2026-prelims-admit-card",
    title: "UPSC CSE 2026 Prelims: Admit card download activated",
    category: "Government Jobs",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=900&q=80",
    excerpt: "E-admit cards available two weeks before exam — carry colour printout and original ID proof.",
    content:
      "UPSC has enabled admit card download for Civil Services Preliminary Examination 2026. Verify photograph clarity and barcode readability. Centre rules prohibit electronic gadgets beyond the allowed list.\n\nPlan logistics for heat and travel time in metro cities with heavy traffic on exam morning.",
    date: "2026-05-04",
    readTime: "3 min read",
    views: 15100,
    featured: true,
    tags: ["UPSC", "Civil Services"]
  },
  {
    id: "u8",
    slug: "clat-2026-consortium-guidelines-update",
    title: "CLAT 2026: Consortium publishes updated counselling guidelines",
    category: "Admissions",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&q=80",
    excerpt: "Freeze, float, and slide options clarified for NLU seat allocation rounds.",
    content:
      "The CLAT consortium has refined rules for subsequent counselling rounds. Candidates must pay caution deposits within stipulated windows to participate in further rounds.\n\nRead the official PDF on consortiumofnlus.ac.in — Career Initiator summaries are not a substitute for legal text in the brochure.",
    date: "2026-05-03",
    readTime: "5 min read",
    views: 4800,
    featured: false,
    tags: ["CLAT", "Law"]
  },
  {
    id: "u9",
    slug: "state-engineering-counselling-2026-round1",
    title: "MHT CET 2026: Engineering CAP Round 1 seat matrix published",
    category: "Admissions",
    image: "https://images.unsplash.com/photo-1562774053-7019e48eae07?w=900&q=80",
    excerpt: "CAP portal opens for choice filling — freeze mock round preferences before final lock.",
    content:
      "State CET cell has released institute-wise seat availability for CAP Round 1. Use historical cut-off trends only as a rough guide; 2026 competition may shift with new branches and AI-related programmes.\n\nKeep category certificates and domicile documents ready for verification slots.",
    date: "2026-05-02",
    readTime: "4 min read",
    views: 8900,
    featured: false,
    tags: ["MHT CET", "Engineering"]
  },
  {
    id: "u10",
    slug: "icar-aieea-ug-rank-list",
    title: "ICAR AIEEA UG 2026: Provisional rank list out",
    category: "Results",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=900&q=80",
    excerpt: "Agriculture aspirants can download scorecards — counselling schedule on ICAR portal.",
    content:
      "ICAR has released provisional ranks for undergraduate agriculture programmes. Objection window is narrow — submit discrepancies with documentary proof only through the official channel.\n\nSeat matrix includes deemed universities and state agricultural universities; read seat type (free/paid) carefully before choice filling.",
    date: "2026-05-01",
    readTime: "3 min read",
    views: 3200,
    featured: false,
    tags: ["ICAR", "Agriculture"]
  },
  {
    id: "u11",
    slug: "digital-india-scholarship-stem-women",
    title: "MeitY announces STEM scholarship for women UG students",
    category: "Scholarships",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=900&q=80",
    excerpt: "Income ceiling and CGPA criteria published — online applications close end of month.",
    content:
      "The new STEM scholarship targets women pursuing B.E./B.Tech in select branches. Applicants need institution verification and income certificates from competent authority as per state rules.\n\nShortlisted candidates may undergo telephonic interview — keep project portfolio links ready.",
    date: "2026-04-30",
    readTime: "4 min read",
    views: 6700,
    featured: false,
    tags: ["STEM", "Women"]
  },
  {
    id: "u12",
    slug: "ssc-cgl-2026-tier1-city-notice",
    title: "SSC CGL 2026 Tier-I: Normalisation methodology note released",
    category: "Government Jobs",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&q=80",
    excerpt: "Staff Selection Commission clarifies percentile-based normalisation across shifts.",
    content:
      "SSC has reiterated the statistical process used when multiple shifts are conducted. Candidates should focus on accuracy over speed — wrong answers carry negative marks in CGL Tier-I.\n\nBookmark ssc.gov.in for authentic notices; avoid third-party PDFs that may be outdated.",
    date: "2026-04-29",
    readTime: "3 min read",
    views: 11200,
    featured: false,
    tags: ["SSC", "CGL"]
  },
  {
    id: "u13",
    slug: "nift-2026-situation-test-dates",
    title: "NIFT 2026: Situation test and interview schedule for UG design",
    category: "Exams",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&q=80",
    excerpt: "Shortlisted candidates must carry portfolio and material kit as per official list.",
    content:
      "NIFT has published city-wise situation test dates. Late entry is not permitted; reach centres 90 minutes early for security checks.\n\nCreative aptitude remains key — practise time-boxed sketching and concise written rationale for design problems.",
    date: "2026-04-28",
    readTime: "3 min read",
    views: 4100,
    featured: false,
    tags: ["NIFT", "Design"]
  },
  {
    id: "u14",
    slug: "foreign-university-admissions-2026-deadlines",
    title: "Study abroad 2026: Top destination early application deadlines",
    category: "Career News",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900&q=80",
    excerpt: "US and UK rolling admissions — IELTS/TOEFL score reporting times affect completeness.",
    content:
      "Early round applications improve scholarship consideration for many universities. Request transcripts and recommendation letters at least four weeks before portal deadlines.\n\nBudget proof of funds and visa appointment wait times should be part of your parallel timeline, not an afterthought.",
    date: "2026-04-27",
    readTime: "7 min read",
    views: 5900,
    featured: false,
    tags: ["Study abroad", "IELTS"]
  },
  {
    id: "u15",
    slug: "rbi-grade-b-2026-phase2-pattern",
    title: "RBI Grade B 2026: Phase-II descriptive pattern unchanged",
    category: "Government Jobs",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=80",
    excerpt: "ESI, FM, and English paper weights confirmed — practise answer structure under timed conditions.",
    content:
      "RBI continues to emphasise analytical writing and economic intuition. Use previous year prompts to build a template for introductions, diagrams where applicable, and concise conclusions.\n\nGeneral awareness for Phase-I should include last six months of banking and economy headlines.",
    date: "2026-04-26",
    readTime: "5 min read",
    views: 7800,
    featured: false,
    tags: ["RBI", "Banking"]
  },
  {
    id: "u16",
    slug: "du-csas-2026-second-allotment",
    title: "DU CSAS 2026: Second merit list allotment published",
    category: "Admissions",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=900&q=80",
    excerpt: "Accept or upgrade window tight — pay seat acceptance fee within deadline.",
    content:
      "University of Delhi CSAS portal shows second round allotments. Failure to accept within the window leads to automatic forfeiture and participation only in subsequent rounds if eligible.\n\nRefund rules for withdrawal differ by round — read the UG bulletin PDF carefully.",
    date: "2026-04-25",
    readTime: "3 min read",
    views: 10100,
    featured: false,
    tags: ["DU", "CUET"]
  },
  {
    id: "u17",
    slug: "bitsat-2026-slot-booking-live",
    title: "BITSAT 2026: Slot booking window now live",
    category: "Exams",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=900&q=80",
    excerpt: "Choose date and session early — high demand slots fill within hours in metro cities.",
    content:
      "BITS Pilani opens computer-based test scheduling for all iterations. Keep multiple backup slot preferences ready before payment confirmation.\n\nEnsure stable internet while booking; screenshot confirmation page and email receipt.",
    date: "2026-04-24",
    readTime: "2 min read",
    views: 9600,
    featured: false,
    tags: ["BITSAT", "Engineering"]
  },
  {
    id: "u18",
    slug: "aissee-2026-sainik-school-allotment",
    title: "AISSEE 2026: All India Sainik School entrance merit list update",
    category: "Results",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80",
    excerpt: "Medical fitness and document verification dates announced for shortlisted cadets.",
    content:
      "Sainik Schools follow a strict medical standard. Parents should carry vaccination records and spectacles prescription if applicable.\n\nFee structure includes caution deposits — verify state-specific scholarships for defence wards where applicable.",
    date: "2026-04-23",
    readTime: "3 min read",
    views: 2800,
    featured: false,
    tags: ["Sainik School", "School"]
  },
  {
    id: "u19",
    slug: "post-matric-scholarship-state-portals",
    title: "Post-matric scholarships: State portals open for renewal applications",
    category: "Scholarships",
    image: "https://images.unsplash.com/photo-1523580493503-edaad618c131?w=900&q=80",
    excerpt: "SC/ST/OBC schemes — institute verification mandatory before state approval.",
    content:
      "Each state runs its own scholarship portal with different income ceilings and caste validity certificate formats. Upload clear scans; blurred documents cause automated rejection.\n\nTrack application ID and save SMS alerts from the portal.",
    date: "2026-04-22",
    readTime: "4 min read",
    views: 4500,
    featured: false,
    tags: ["Scholarship", "State"]
  },
  {
    id: "u20",
    slug: "ai-careers-skill-report-2026",
    title: "NASSCOM report: AI job roles see fastest growth among freshers",
    category: "Career News",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900&q=80",
    excerpt: "Prompt engineering, MLOps, and data labelling roles expand — portfolios matter more than generic degrees.",
    content:
      "Industry hiring for AI-adjacent roles increasingly weights GitHub projects and Kaggle-style benchmarks. Complement degree coursework with open-source contributions and reproducible notebooks.\n\nEthics and data privacy basics are now common interview screens — prepare short case answers.",
    date: "2026-04-21",
    readTime: "6 min read",
    views: 13400,
    featured: false,
    tags: ["AI", "Careers"]
  },
  {
    id: "u21",
    slug: "ibps-po-2026-prelims-result",
    title: "IBPS PO CWE XIII 2026: Preliminary exam result declared",
    category: "Results",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80",
    excerpt: "Mains call letter download from next week — sectional cut-offs published category-wise.",
    content:
      "Successful candidates should begin mains preparation immediately — descriptive English and banking awareness require daily news discipline.\n\nInterview stage values consistency in employment history; prepare clear narratives for gaps if any.",
    date: "2026-04-20",
    readTime: "3 min read",
    views: 16200,
    featured: false,
    tags: ["IBPS", "Banking"]
  },
  {
    id: "u22",
    slug: "nep-2020-implementation-higher-ed-tracker",
    title: "NEP 2020: UGC tracker on multidisciplinary UG programmes updated",
    category: "Career News",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&q=80",
    excerpt: "Academic bank of credits and exit options — how it affects your degree planning.",
    content:
      "Universities continue rolling out ABC integration and multiple entry-exit certificates. Students should read their specific university ordinance on credit transfer and minor degree rules.\n\nEmployability cells are aligning internship mandates — check your department notice board weekly.",
    date: "2026-04-19",
    readTime: "5 min read",
    views: 3600,
    featured: false,
    tags: ["NEP", "UGC"]
  }
];

export function getUpdateBySlug(slug) {
  if (!slug) return null;
  return UPDATES.find((u) => u.slug === slug) ?? null;
}

export function getAllUpdateSlugs() {
  return UPDATES.map((u) => ({ slug: u.slug }));
}

export function getRelatedUpdates(slug, limit = 3) {
  const current = getUpdateBySlug(slug);
  if (!current) return [];
  const sameCat = UPDATES.filter((u) => u.slug !== slug && u.category === current.category);
  const tagOverlap = (a, b) =>
    (a.tags || []).filter((t) => (b.tags || []).includes(t)).length;
  const rest = UPDATES.filter((u) => u.slug !== slug && u.category !== current.category).sort(
    (a, b) => tagOverlap(b, current) - tagOverlap(a, current)
  );
  const merged = [...sameCat, ...rest];
  const seen = new Set();
  const out = [];
  for (const u of merged) {
    if (seen.has(u.slug)) continue;
    seen.add(u.slug);
    out.push(u);
    if (out.length >= limit) break;
  }
  return out;
}
