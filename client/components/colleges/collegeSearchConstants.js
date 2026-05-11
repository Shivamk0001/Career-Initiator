export const POPULAR_SEARCHES = [
  "IIT Bombay",
  "Delhi University",
  "NIT Trichy",
  "Ashoka University",
  "NUS Singapore"
];

export const QUICK_CATEGORIES = [
  { label: "Engineering", q: "top engineering colleges India" },
  { label: "Medical", q: "top medical colleges India MBBS" },
  { label: "Management", q: "top MBA colleges India" },
  { label: "Law", q: "top law colleges India NLU" },
  { label: "Design", q: "top design colleges India NID" },
  { label: "Study Abroad", q: "top universities USA for Indian students" }
];

/** Fallback carousel when API is empty or unavailable */
export const MOCK_TOP_COLLEGES = [
  {
    name: "IIT Bombay",
    location: "Mumbai, Maharashtra",
    ranking: 1,
    rating: 4.9,
    feesDisplay: "₹8L – ₹10L / yr*",
    courses: ["B.Tech", "M.Tech", "Dual Degree"],
    image: null,
    website_link: "https://www.iitb.ac.in",
    description: "India’s premier engineering institute with world-class research and placements."
  },
  {
    name: "IISc Bangalore",
    location: "Bengaluru, Karnataka",
    ranking: 2,
    rating: 4.9,
    feesDisplay: "₹1L – ₹3L / yr*",
    courses: ["B.S.", "M.Tech", "Ph.D."],
    image: null,
    website_link: "https://www.iisc.ac.in",
    description: "Leading research university for science and engineering."
  },
  {
    name: "Jawaharlal Nehru University",
    location: "New Delhi",
    ranking: 8,
    rating: 4.5,
    feesDisplay: "₹0.3L – ₹0.8L / yr*",
    courses: ["BA", "MA", "M.Phil"],
    image: null,
    website_link: "https://www.jnu.ac.in",
    description: "Renowned for social sciences, languages, and international studies."
  },
  {
    name: "Delhi University",
    location: "New Delhi",
    ranking: 12,
    rating: 4.4,
    feesDisplay: "₹0.2L – ₹1.5L / yr*",
    courses: ["B.Com", "B.A.", "B.Sc"],
    image: null,
    website_link: "https://www.du.ac.in",
    description: "Central university with top colleges and diverse programmes."
  },
  {
    name: "BITS Pilani",
    location: "Pilani, Rajasthan",
    ranking: 15,
    rating: 4.6,
    feesDisplay: "₹5L – ₹7L / yr*",
    courses: ["B.E.", "M.E.", "M.Sc"],
    image: null,
    website_link: "https://www.bits-pilani.ac.in",
    description: "Private institute known for engineering and innovation culture."
  },
  {
    name: "NIT Trichy",
    location: "Tiruchirappalli, Tamil Nadu",
    ranking: 18,
    rating: 4.5,
    feesDisplay: "₹1.5L – ₹2.5L / yr*",
    courses: ["B.Tech", "M.Tech", "MBA"],
    image: null,
    website_link: "https://www.nitt.edu",
    description: "Top NIT with strong industry connect and campus life."
  },
  {
    name: "Ashoka University",
    location: "Sonipat, Haryana",
    ranking: 22,
    rating: 4.4,
    feesDisplay: "₹9L – ₹12L / yr*",
    courses: ["B.A.", "B.Sc", "Young India Fellowship"],
    image: null,
    website_link: "https://www.ashoka.edu.in",
    description: "Liberal arts and sciences university with global curriculum."
  },
  {
    name: "IIM Ahmedabad",
    location: "Ahmedabad, Gujarat",
    ranking: 1,
    rating: 4.9,
    feesDisplay: "₹25L – ₹28L (program)*",
    courses: ["MBA", "PGPX", "FPM"],
    image: null,
    website_link: "https://www.iima.ac.in",
    description: "Flagship Indian business school with exceptional placements."
  },
  {
    name: "IIT Delhi",
    location: "New Delhi",
    ranking: 3,
    rating: 4.8,
    feesDisplay: "₹8L – ₹10L / yr*",
    courses: ["B.Tech", "M.Tech", "Ph.D."],
    image: null,
    website_link: "https://home.iitd.ac.in",
    description: "Premier IIT with strong industry and startup ecosystem."
  },
  {
    name: "IIT Madras",
    location: "Chennai, Tamil Nadu",
    ranking: 4,
    rating: 4.8,
    feesDisplay: "₹8L – ₹10L / yr*",
    courses: ["B.Tech", "Dual Degree", "M.Tech"],
    image: null,
    website_link: "https://www.iitm.ac.in",
    description: "Research-intensive campus and top placements."
  },
  {
    name: "AIIMS New Delhi",
    location: "New Delhi",
    ranking: 1,
    rating: 4.9,
    feesDisplay: "₹0.1L – ₹0.3L / yr*",
    courses: ["MBBS", "MD", "DM"],
    image: null,
    website_link: "https://www.aiims.edu",
    description: "India’s apex medical institute and referral hospital."
  },
  {
    name: "NALSAR Hyderabad",
    location: "Hyderabad, Telangana",
    ranking: 3,
    rating: 4.5,
    feesDisplay: "₹2L – ₹3.5L / yr*",
    courses: ["BA LLB", "LLM", "Ph.D."],
    image: null,
    website_link: "https://www.nalsar.ac.in",
    description: "National law university with strong mooting culture."
  },
  {
    name: "NID Ahmedabad",
    location: "Ahmedabad, Gujarat",
    ranking: 1,
    rating: 4.6,
    feesDisplay: "₹3L – ₹5L / yr*",
    courses: ["B.Des", "M.Des"],
    image: null,
    website_link: "https://www.nid.edu",
    description: "Institute of national importance for design education."
  },
  {
    name: "University of Hyderabad",
    location: "Hyderabad, Telangana",
    ranking: 28,
    rating: 4.3,
    feesDisplay: "₹0.2L – ₹1L / yr*",
    courses: ["M.Sc", "MA", "MBA"],
    image: null,
    website_link: "https://www.uohyd.ac.in",
    description: "Central university known for research and interdisciplinary programmes."
  },
  {
    name: "Christ University",
    location: "Bengaluru, Karnataka",
    ranking: 45,
    rating: 4.2,
    feesDisplay: "₹1L – ₹3L / yr*",
    courses: ["BBA", "BCA", "Law"],
    image: null,
    website_link: "https://www.christuniversity.in",
    description: "Private deemed university with diverse undergraduate options."
  },
  {
    name: "NUS Singapore",
    location: "Singapore",
    ranking: 5,
    rating: 4.8,
    feesDisplay: "S$25k – S$40k / yr*",
    courses: ["B.Eng", "BBA", "B.Sc"],
    image: null,
    website_link: "https://www.nus.edu.sg",
    description: "Leading Asian university for global careers."
  }
];
