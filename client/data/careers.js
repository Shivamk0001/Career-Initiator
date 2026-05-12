/**
 * Static career directory — used by the Careers listing page.
 */

export const CAREER_TABS = [
  { id: "all", label: "All" },
  { id: "Engineering", label: "Engineering" },
  { id: "Medical", label: "Medical" },
  { id: "Business", label: "Business" },
  { id: "Management", label: "Management" },
  { id: "Law", label: "Law" },
  { id: "Arts", label: "Arts" },
  { id: "Design", label: "Design" },
  { id: "Technology", label: "Technology" },
  { id: "Data Science", label: "Data Science" },
  { id: "Aviation", label: "Aviation" },
  { id: "Government", label: "Government" }
];

export const CAREER_SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "salary", label: "Highest Salary" },
  { value: "growth", label: "Fastest Growing" }
];

/** Icon grid — maps to same `category` values as careers for quick filter */
export const CAREER_ICON_CATEGORIES = [
  { id: "Engineering", label: "Engineering", hint: "Build & design" },
  { id: "Medical", label: "Medical", hint: "Heal & research" },
  { id: "Management", label: "Management", hint: "Lead & scale" },
  { id: "Law", label: "Law", hint: "Justice & policy" },
  { id: "Design", label: "Design", hint: "Craft & systems" },
  { id: "Data Science", label: "Data Science", hint: "Models & insight" },
  { id: "Aviation", label: "Aviation", hint: "Sky careers" },
  { id: "Government", label: "Government", hint: "Serve India" }
];

export const CAREERS = [
  {
    id: "1",
    slug: "software-engineer",
    title: "Software Engineer",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    shortDescription:
      "Design, build, and maintain applications and systems across web, mobile, and cloud — India’s largest tech hiring lane.",
    averageSalary: "₹8–25 LPA",
    duration: "4 yrs UG + optional PG",
    education: "B.Tech / B.E. / BCA / MCA",
    growth: "22%",
    skills: ["DSA", "System design", "Git", "APIs"],
    featured: true
  },
  {
    id: "2",
    slug: "data-scientist",
    title: "Data Scientist",
    category: "Data Science",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    shortDescription:
      "Turn data into decisions using statistics, ML, and storytelling — high demand in fintech, e‑commerce, and healthcare analytics.",
    averageSalary: "₹10–35 LPA",
    duration: "4–6 yrs (UG + PG common)",
    education: "B.Tech / B.Sc / M.Sc / M.Tech Analytics",
    growth: "28%",
    skills: ["Python", "SQL", "ML", "Visualization"],
    featured: true
  },
  {
    id: "3",
    slug: "doctor",
    title: "Doctor (Physician)",
    category: "Medical",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    shortDescription:
      "Diagnose and treat patients after MBBS and postgraduate specialisation — respected, high-impact career with long training runway.",
    averageSalary: "₹12–40 LPA*",
    duration: "5.5 yrs MBBS + PG",
    education: "MBBS + MD/MS/DNB",
    growth: "14%",
    skills: ["Clinical reasoning", "Patient care", "Ethics"],
    featured: true
  },
  {
    id: "4",
    slug: "lawyer",
    title: "Lawyer",
    category: "Law",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
    shortDescription:
      "Practice in courts, corporates, or policy — from litigation to mergers & compliance across India’s growing legal economy.",
    averageSalary: "₹6–30 LPA",
    duration: "5 yr LLB or 3 yr LLB",
    education: "LLB / BA LLB + AIBE",
    growth: "16%",
    skills: ["Research", "Drafting", "Argumentation"],
    featured: true
  },
  {
    id: "5",
    slug: "chartered-accountant",
    title: "Chartered Accountant",
    category: "Business",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    shortDescription:
      "Audit, tax, and advisory roles for companies and Big‑4 — gold‑standard credential in Indian commerce and finance.",
    averageSalary: "₹9–28 LPA",
    duration: "4.5–5 yrs (articleship)",
    education: "CA via ICAI",
    growth: "12%",
    skills: ["Accounting", "Tax", "Audit", "Excel"],
    featured: true
  },
  {
    id: "6",
    slug: "pilot",
    title: "Commercial Pilot",
    category: "Aviation",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    shortDescription:
      "Operate aircraft for airlines or charter — rigorous medical, simulator, and licensing pathway with global mobility.",
    averageSalary: "₹18–45 LPA",
    duration: "18–24 mo CPL pathway",
    education: "10+2 + DGCA licences",
    growth: "18%",
    skills: ["Navigation", "Decision‑making", "Regulations"],
    featured: false
  },
  {
    id: "7",
    slug: "ias-officer",
    title: "IAS Officer",
    category: "Government",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80",
    shortDescription:
      "Lead district and state administration — policy execution, public service delivery, and governance at scale.",
    averageSalary: "₹12–24 LPA + benefits",
    duration: "1 yr academy + service",
    education: "Graduate + UPSC CSE",
    growth: "8%",
    skills: ["Policy", "Leadership", "Crisis mgmt"],
    featured: true
  },
  {
    id: "8",
    slug: "ui-ux-designer",
    title: "UI/UX Designer",
    category: "Design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    shortDescription:
      "Craft intuitive digital products — research, prototyping, and visual design for apps millions use every day.",
    averageSalary: "₹6–22 LPA",
    duration: "3–4 yr design UG common",
    education: "B.Des / BCA / portfolio path",
    growth: "24%",
    skills: ["Figma", "UX research", "Visual design"],
    featured: true
  },
  {
    id: "9",
    slug: "cyber-security-analyst",
    title: "Cyber Security Analyst",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
    shortDescription:
      "Protect organisations from threats — SOC operations, pentesting, and GRC roles exploding with digital India.",
    averageSalary: "₹7–24 LPA",
    duration: "3–5 yrs",
    education: "B.Tech / B.Sc CS + certs",
    growth: "30%",
    skills: ["Networking", "SIEM", "Risk", "Scripting"],
    featured: false
  },
  {
    id: "10",
    slug: "product-manager",
    title: "Product Manager",
    category: "Management",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    shortDescription:
      "Own roadmap and outcomes — bridge users, design, and engineering in startups and large tech companies.",
    averageSalary: "₹15–45 LPA",
    duration: "4 yrs + experience",
    education: "MBA / Eng + domain exp.",
    growth: "26%",
    skills: ["Prioritisation", "Analytics", "Stakeholder mgmt"],
    featured: true
  },
  {
    id: "11",
    slug: "psychologist",
    title: "Psychologist",
    category: "Arts",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
    shortDescription:
      "Support mental health and behaviour change — clinics, schools, corporates, and telehealth platforms.",
    averageSalary: "₹4–15 LPA",
    duration: "3 yr BA + 2 yr MA",
    education: "MA Psychology + practicum",
    growth: "20%",
    skills: ["Counselling", "Assessment", "Empathy"],
    featured: false
  },
  {
    id: "12",
    slug: "architect",
    title: "Architect",
    category: "Engineering",
    image: "https://images.unsplash.com/photo-1487958449943-2429ede8fc5f?w=800&q=80",
    shortDescription:
      "Shape built environments — sustainable design, urban projects, and premium residential markets.",
    averageSalary: "₹5–20 LPA",
    duration: "5 yr B.Arch",
    education: "B.Arch + COA",
    growth: "11%",
    skills: ["AutoCAD", "Design", "Building codes"],
    featured: false
  },
  {
    id: "13",
    slug: "digital-marketing-specialist",
    title: "Digital Marketing Specialist",
    category: "Business",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    shortDescription:
      "Drive growth via SEO, paid media, and content — every brand’s engine for acquisition and retention.",
    averageSalary: "₹4–18 LPA",
    duration: "3 yr UG common",
    education: "BBA / B.Com / MBA Marketing",
    growth: "25%",
    skills: ["SEO/SEM", "Analytics", "Copywriting"],
    featured: false
  },
  {
    id: "14",
    slug: "pharmacist",
    title: "Pharmacist",
    category: "Medical",
    image: "https://images.unsplash.com/photo-1587854691852-cf7d4ca09b8b?w=800&q=80",
    shortDescription:
      "Dispense medicines, counsel patients, and work in pharma QA — essential healthcare backbone.",
    averageSalary: "₹3–12 LPA",
    duration: "4 yr B.Pharm",
    education: "B.Pharm + licence",
    growth: "15%",
    skills: ["Pharmacology", "Patient education", "Compliance"],
    featured: false
  },
  {
    id: "15",
    slug: "investment-banker",
    title: "Investment Banker",
    category: "Management",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    shortDescription:
      "Advise on M&A, capital markets, and fundraising — intense, elite track with top MBA and finance talent.",
    averageSalary: "₹18–60 LPA",
    duration: "2 yr MBA + analyst yrs",
    education: "MBA Finance / CA / CFA",
    growth: "17%",
    skills: ["Modelling", "Valuation", "Pitch decks"],
    featured: true
  },
  {
    id: "16",
    slug: "machine-learning-engineer",
    title: "Machine Learning Engineer",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    shortDescription:
      "Ship ML systems to production — feature pipelines, model serving, and monitoring at scale.",
    averageSalary: "₹12–40 LPA",
    duration: "4–6 yrs",
    education: "B.Tech / M.Tech AI & DS",
    growth: "32%",
    skills: ["Python", "ML ops", "Deep learning"],
    featured: true
  },
  {
    id: "17",
    slug: "ips-allied-services",
    title: "IPS / Allied Services",
    category: "Government",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80",
    shortDescription:
      "Serve in police, revenue, foreign service, and more through UPSC — leadership roles with national impact.",
    averageSalary: "₹12–22 LPA + benefits",
    duration: "Training + posting",
    education: "Graduate + UPSC CSE",
    growth: "9%",
    skills: ["Governance", "Law", "Leadership"],
    featured: false
  },
  {
    id: "18",
    slug: "nurse",
    title: "Registered Nurse",
    category: "Medical",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80",
    shortDescription:
      "Deliver bedside care, coordinate treatment, and specialise in critical care or community health.",
    averageSalary: "₹3–10 LPA",
    duration: "4 yr B.Sc Nursing",
    education: "B.Sc Nursing + registration",
    growth: "19%",
    skills: ["Clinical skills", "Communication", "ICU basics"],
    featured: false
  }
];

/** Alias for imports expecting `careers` */
export const careers = CAREERS;

const DEFAULT_ROADMAP = [
  {
    phase: "Foundation",
    detail: "Focus on board exams and fundamentals; read about the field and seek short shadowing or volunteering where possible."
  },
  {
    phase: "Undergraduate / entry qualification",
    detail: "Choose the right degree or diploma; keep academics strong and add early projects, internships, or portfolio work."
  },
  {
    phase: "Specialisation & exams",
    detail: "Prepare for national or institute entrances; pursue PG, licences, or certifications your track requires."
  },
  {
    phase: "Early career",
    detail: "Join credible teams, document outcomes, and find mentors — the first years set your long-term trajectory."
  },
  {
    phase: "Growth",
    detail: "Deepen expertise or move toward leadership; stay current with regulations, tools, and market demand."
  }
];

export function getCareerBySlug(slug) {
  if (!slug) return null;
  const c = CAREERS.find((x) => x.slug === slug);
  if (!c) return null;
  return {
    ...c,
    overview:
      c.overview ??
      `${c.shortDescription} In India, credible pathways usually combine structured education, competitive or portfolio gates, and continuous on-the-job learning.`,
    roadmap: c.roadmap ?? DEFAULT_ROADMAP
  };
}

export function getAllCareerSlugs() {
  return CAREERS.map((career) => ({ slug: career.slug }));
}
