/**
 * Curated spotlight colleges — static premium carousel only (no SerpApi).
 * Images: high-res Unsplash (campus / architecture / learning).
 */

/** @param {string} id e.g. photo-1562774053-7019e9130407 */
const u = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

export const TOP_COLLEGES_FALLBACK_IMAGE = u("photo-1523050854058-8df90110c9f1");

export const TOP_COLLEGES = [
  {
    name: "Indian Institute of Technology Bombay",
    shortName: "IIT Bombay",
    location: "Mumbai, Maharashtra",
    ranking: 1,
    rating: 4.9,
    feesDisplay: "₹8L – ₹10L / yr*",
    courses: ["B.Tech", "M.Tech", "Dual Degree", "Ph.D."],
    image: u("photo-1562774053-7019e9130407"),
    website_link: "https://www.iitb.ac.in",
    description: "India’s flagship engineering institute — research, startups, and global placements.",
    tags: ["Institute of Eminence", "Research", "Placements"]
  },
  {
    name: "Indian Institute of Technology Delhi",
    shortName: "IIT Delhi",
    location: "New Delhi",
    ranking: 2,
    rating: 4.9,
    feesDisplay: "₹8L – ₹10L / yr*",
    courses: ["B.Tech", "M.Tech", "Design", "Ph.D."],
    image: u("photo-1541339907198-e08756dedf3f"),
    website_link: "https://home.iitd.ac.in",
    description: "Premier IIT in the capital — strong industry ties and entrepreneurship ecosystem.",
    tags: ["IoE", "NAAC A++", "Innovation"]
  },
  {
    name: "Indian Institute of Technology Madras",
    shortName: "IIT Madras",
    location: "Chennai, Tamil Nadu",
    ranking: 3,
    rating: 4.9,
    feesDisplay: "₹8L – ₹10L / yr*",
    courses: ["B.Tech", "Dual Degree", "M.Tech", "MS"],
    image: u("photo-1498243691581-b2c99f973406"),
    website_link: "https://www.iitm.ac.in",
    description: "Research powerhouse on a residential campus — known for core engineering depth.",
    tags: ["Research", "Campus", "Rankings"]
  },
  {
    name: "National Institute of Technology Tiruchirappalli",
    shortName: "NIT Trichy",
    location: "Tiruchirappalli, Tamil Nadu",
    ranking: 8,
    rating: 4.7,
    feesDisplay: "₹1.5L – ₹2.5L / yr*",
    courses: ["B.Tech", "M.Tech", "MBA", "MCA"],
    image: u("photo-1523240795612-9a054b0db644"),
    website_link: "https://www.nitt.edu",
    description: "Leading NIT with strong academics, student culture, and recruiter trust.",
    tags: ["NIT", "Placements", "Hostel"]
  },
  {
    name: "Birla Institute of Technology and Science Pilani",
    shortName: "BITS Pilani",
    location: "Pilani, Rajasthan",
    ranking: 6,
    rating: 4.8,
    feesDisplay: "₹5L – ₹7L / yr*",
    courses: ["B.E.", "M.Sc", "MBA", "Ph.D."],
    image: u("photo-1523580846011-d3a5bc25702f"),
    website_link: "https://www.bits-pilani.ac.in",
    description: "Private institute of national repute — flexible curriculum and global alumni.",
    tags: ["Deemed", "Industry", "Scholarship"]
  },
  {
    name: "International Institute of Information Technology Hyderabad",
    shortName: "IIIT Hyderabad",
    location: "Hyderabad, Telangana",
    ranking: 5,
    rating: 4.8,
    feesDisplay: "₹3L – ₹5L / yr*",
    courses: ["B.Tech", "Dual Degree", "M.Tech", "MS"],
    image: u("photo-1517245386807-bb43f82e33f4"),
    website_link: "https://www.iiit.ac.in",
    description: "Top IIIT for CS & AI — research-led programmes and strong tech hiring.",
    tags: ["IIIT", "CS / AI", "Research"]
  },
  {
    name: "Ashoka University",
    shortName: "Ashoka University",
    location: "Sonipat, Haryana",
    ranking: 12,
    rating: 4.6,
    feesDisplay: "₹9L – ₹12L / yr*",
    courses: ["B.A.", "B.Sc", "YIF", "M.A."],
    image: u("photo-1524178232363-7acb182fb878"),
    website_link: "https://www.ashoka.edu.in",
    description: "Liberal arts & sciences university — interdisciplinary learning and global exposure.",
    tags: ["Liberal Arts", "UGC", "Scholarship"]
  },
  {
    name: "Indian Institute of Science Bangalore",
    shortName: "IISc Bangalore",
    location: "Bengaluru, Karnataka",
    ranking: 1,
    rating: 4.9,
    feesDisplay: "₹1L – ₹3L / yr*",
    courses: ["B.S.", "M.Tech", "Ph.D.", "Int. Ph.D."],
    image: u("photo-1517483000871-1dbf64a6e1d6"),
    website_link: "https://www.iisc.ac.in",
    description: "India’s apex research university — postgraduate focus and world-class labs.",
    tags: ["Deemed", "Research", "NAAC A++"]
  },
  {
    name: "All India Institute of Medical Sciences New Delhi",
    shortName: "AIIMS New Delhi",
    location: "New Delhi",
    ranking: 1,
    rating: 4.9,
    feesDisplay: "₹0.1L – ₹0.4L / yr*",
    courses: ["MBBS", "MD", "DM", "M.Ch"],
    image: u("photo-1576091160399-112ba8d25d1d"),
    website_link: "https://www.aiims.edu",
    description: "National apex medical institute — clinical training and research leadership.",
    tags: ["Medical", "Govt", "Hospital"]
  },
  {
    name: "National University of Singapore",
    shortName: "NUS Singapore",
    location: "Singapore",
    ranking: 8,
    rating: 4.8,
    feesDisplay: "S$28k – S$42k / yr*",
    courses: ["B.Eng", "BBA", "B.Sc", "Law"],
    image: u("photo-1431540015163-006ecefef613"),
    website_link: "https://www.nus.edu.sg",
    description: "Asia’s leading comprehensive university — global rankings and diverse cohorts.",
    tags: ["Global", "Research", "Scholarship"]
  },
  {
    name: "Indian Institute of Technology Kanpur",
    shortName: "IIT Kanpur",
    location: "Kanpur, Uttar Pradesh",
    ranking: 4,
    rating: 4.8,
    feesDisplay: "₹8L – ₹10L / yr*",
    courses: ["B.Tech", "M.Tech", "BS-MS", "Ph.D."],
    image: u("photo-1522202176988-66273c2fd55f"),
    website_link: "https://www.iitk.ac.in",
    description: "Known for rigorous fundamentals in engineering and sciences.",
    tags: ["IIT", "Research", "Placements"]
  },
  {
    name: "Indian Institute of Management Bangalore",
    shortName: "IIM Bangalore",
    location: "Bengaluru, Karnataka",
    ranking: 2,
    rating: 4.9,
    feesDisplay: "₹24L – ₹28L (MBA)*",
    courses: ["MBA", "EPGP", "Ph.D."],
    image: u("photo-1507679799987-c73779587ccf"),
    website_link: "https://www.iimb.ac.in",
    description: "Top-tier B-school — consulting, product, and leadership careers.",
    tags: ["IIM", "MBA", "Placements"]
  },
  {
    name: "Indian Institute of Management Ahmedabad",
    shortName: "IIM Ahmedabad",
    location: "Ahmedabad, Gujarat",
    ranking: 1,
    rating: 4.9,
    feesDisplay: "₹26L – ₹30L (MBA)*",
    courses: ["MBA", "PGPX", "FPM"],
    image: u("photo-1454165804606-c3d57bc86b40"),
    website_link: "https://www.iima.ac.in",
    description: "Flagship management institute — case method and global recruiter pull.",
    tags: ["IIM", "MBA", "Leadership"]
  },
  {
    name: "University of Delhi",
    shortName: "Delhi University",
    location: "New Delhi",
    ranking: 14,
    rating: 4.4,
    feesDisplay: "₹0.2L – ₹1.5L / yr*",
    courses: ["B.A.", "B.Com", "B.Sc", "M.A."],
    image: u("photo-1434030216411-0b793f4b4173"),
    website_link: "https://www.du.ac.in",
    description: "Central university with iconic colleges — breadth of programmes and affordability.",
    tags: ["Central Univ", "UGC", "Diversity"]
  },
  {
    name: "Jawaharlal Nehru University",
    shortName: "JNU",
    location: "New Delhi",
    ranking: 10,
    rating: 4.5,
    feesDisplay: "₹0.2L – ₹0.8L / yr*",
    courses: ["B.A.", "M.A.", "M.Phil", "Ph.D."],
    image: u("photo-1509062522246-3755797921d8"),
    website_link: "https://www.jnu.ac.in",
    description: "Premier public university for humanities, languages, and social sciences.",
    tags: ["Research", "Govt", "Campus"]
  }
];
