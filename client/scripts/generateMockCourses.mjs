/**
 * One-off generator: run `node client/scripts/generateMockCourses.mjs`
 * Writes client/data/mockCourses.json (~180 courses).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(__dirname, "..", "data", "mockCourses.json");

const pad = (n) => String(n).padStart(2, "0");
const iso = (y, m, d) => `${y}-${pad(m)}-${pad(d)}T10:00:00.000Z`;

const recruiters = ["TCS", "Infosys", "Wipro", "Accenture", "Amazon", "Microsoft", "Google", "HDFC Bank", "ICICI Bank", "L&T", "Dr. Reddy's", "Apollo", "KPMG", "Deloitte", "EY", "PwC", "Flipkart", "Swiggy", "Zomato", "Mahindra"];
const colleges = ["IIT Bombay", "IIT Delhi", "IIT Madras", "NIT Trichy", "BITS Pilani", "DU", "JNU", "AIIMS Delhi", "IIM Ahmedabad", "XLRI", "NIFT Mumbai", "NLSIU", "Symbiosis Pune", "Manipal", "VIT", "SRM", "Amity", "Christ University", "NMIMS", "Jamia"];

function pick(arr, n, seed) {
  const outArr = [];
  for (let i = 0; i < n; i++) outArr.push(arr[(seed + i) % arr.length]);
  return [...new Set(outArr)];
}

function slugify(name, id) {
  const base = `${name}-${id}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return base.slice(0, 96) || `course-${id}`;
}

/** @type {Array<[string, string, string, string, string, number, string, string[], string]>} */
const rows = [];

function add(stream, courseName, level, duration, specialization, feesLakh, salary, exams, mode = "Full Time") {
  rows.push([stream, courseName, level, duration, specialization, feesLakh, salary, exams, mode]);
}

// Engineering
const eng = [
  ["B.Tech Civil Engineering", "UG", "4 Years", "Civil", 1.8, "5-9 LPA", ["JEE Main", "MHT CET"]],
  ["B.Tech Mechanical Engineering", "UG", "4 Years", "Mechanical", 2, "6-10 LPA", ["JEE Main", "BITSAT"]],
  ["B.Tech Computer Science & Engineering", "UG", "4 Years", "CSE", 3.5, "12-22 LPA", ["JEE Main", "JEE Advanced"]],
  ["B.Tech AI & Machine Learning", "UG", "4 Years", "AI/ML", 3.8, "14-24 LPA", ["JEE Main", "VITEEE"]],
  ["B.Tech Data Science", "UG", "4 Years", "Data Science", 3.2, "11-18 LPA", ["JEE Main", "COMEDK"]],
  ["B.Tech Cyber Security", "UG", "4 Years", "Cyber Security", 2.8, "10-16 LPA", ["JEE Main", "KCET"]],
  ["B.Tech Electrical Engineering", "UG", "4 Years", "Electrical", 2.2, "7-12 LPA", ["JEE Main", "WBJEE"]],
  ["B.Tech Electronics & Communication", "UG", "4 Years", "ECE", 2.6, "8-14 LPA", ["JEE Main", "TS EAMCET"]],
  ["M.Tech Structural Engineering", "PG", "2 Years", "Structural", 2.5, "8-14 LPA", ["GATE"]],
  ["M.Tech VLSI Design", "PG", "2 Years", "VLSI", 3, "10-18 LPA", ["GATE"]],
  ["Diploma in Mechanical Engineering", "Diploma", "3 Years", "Mechanical", 0.6, "3-5 LPA", ["Polytechnic Entrance"]],
  ["Polytechnic Computer Engineering", "Diploma", "3 Years", "Computer", 0.55, "3-5 LPA", ["JEECUP", "DCECE"]],
  ["B.Tech Aerospace Engineering", "UG", "4 Years", "Aerospace", 3.2, "9-15 LPA", ["JEE Advanced"]],
  ["B.Tech Chemical Engineering", "UG", "4 Years", "Chemical", 2.4, "7-12 LPA", ["JEE Main"]],
  ["B.Tech Biotechnology", "UG", "4 Years", "Biotech Eng", 2.6, "6-11 LPA", ["JEE Main"]],
  ["M.Tech Computer Science", "PG", "2 Years", "CSE", 2.8, "12-20 LPA", ["GATE"]],
  ["B.Tech Information Technology", "UG", "4 Years", "IT", 2.9, "9-15 LPA", ["JEE Main", "MET"]],
  ["B.Tech Robotics & Automation", "UG", "4 Years", "Robotics", 3.1, "10-17 LPA", ["JEE Main"]],
  ["B.Tech Petroleum Engineering", "UG", "4 Years", "Petroleum", 2.5, "8-14 LPA", ["JEE Main"]],
  ["B.Tech Agricultural Engineering", "UG", "4 Years", "Agri Eng", 1.5, "5-9 LPA", ["ICAR AIEEA"]],
  ["M.Tech Thermal Engineering", "PG", "2 Years", "Thermal", 2.2, "7-12 LPA", ["GATE"]],
  ["B.Tech Mining Engineering", "UG", "4 Years", "Mining", 1.9, "7-12 LPA", ["JEE Main"]],
  ["B.Tech Metallurgical Engineering", "UG", "4 Years", "Metallurgy", 1.8, "6-10 LPA", ["JEE Main"]],
  ["B.Tech Instrumentation & Control", "UG", "4 Years", "Instrumentation", 2.1, "7-11 LPA", ["JEE Main"]],
  ["B.Tech Production & Industrial Eng.", "UG", "4 Years", "Production", 2, "6-10 LPA", ["JEE Main"]]
];
eng.forEach(([n, l, d, s, f, sal, ex]) => add("Engineering", n, l, d, s, f, sal, ex));

// Medical
[
  ["MBBS", "UG", "5.5 Years", "Medicine", 12, "10-18 LPA*", ["NEET UG"]],
  ["BDS", "UG", "5 Years", "Dental", 5, "6-10 LPA*", ["NEET UG"]],
  ["BAMS", "UG", "5.5 Years", "Ayurveda", 3.5, "5-8 LPA*", ["NEET UG"]],
  ["BHMS", "UG", "5.5 Years", "Homeopathy", 3.2, "5-8 LPA*", ["NEET UG"]],
  ["B.Sc Nursing", "UG", "4 Years", "Nursing", 2.5, "4-7 LPA", ["NEET UG", "State CET"]],
  ["B.Pharm", "UG", "4 Years", "Pharmacy", 2.8, "4-8 LPA", ["NEET UG", "MHT CET"]],
  ["BPT (Physiotherapy)", "UG", "4.5 Years", "Physiotherapy", 2.2, "4-7 LPA", ["NEET UG"]],
  ["B.Sc Medical Lab Technology", "UG", "3 Years", "MLT", 1.8, "3-6 LPA", ["NEET UG"]],
  ["MD General Medicine", "PG", "3 Years", "Medicine", 15, "18-35 LPA*", ["NEET PG"]],
  ["MS Orthopaedics", "PG", "3 Years", "Surgery", 16, "20-40 LPA*", ["NEET PG"]],
  ["B.Sc Radiology Technology", "UG", "3 Years", "Radiology", 2, "4-7 LPA", ["NEET UG"]],
  ["M.Pharm Pharmacology", "PG", "2 Years", "Pharmacology", 3.5, "6-10 LPA", ["GPAT"]],
  ["B.Sc Operation Theatre Technology", "UG", "3 Years", "OTT", 1.9, "3-6 LPA", ["NEET UG"]],
  ["B.Sc Anaesthesia Technology", "UG", "3 Years", "Anaesthesia", 2, "3-6 LPA", ["NEET UG"]],
  ["BUMS", "UG", "5.5 Years", "Unani", 2.8, "4-7 LPA*", ["NEET UG"]],
  ["BVSc & AH", "UG", "5.5 Years", "Veterinary", 2.2, "5-9 LPA", ["NEET UG"]],
  ["M.Sc Medical Biochemistry", "PG", "2 Years", "Biochemistry", 2.5, "5-9 LPA", ["CUET PG"]],
  ["Diploma in Pharmacy", "Diploma", "2 Years", "Pharmacy", 0.9, "2-4 LPA", ["State Polytechnic"]]
].forEach(([n, l, d, s, f, sal, ex]) => add("Medical", n, l, d, s, f, sal, ex));

// Management
[
  ["MBA Finance", "PG", "2 Years", "Finance", 8, "12-25 LPA", ["CAT", "XAT"]],
  ["MBA Marketing", "PG", "2 Years", "Marketing", 7.5, "10-22 LPA", ["CAT", "SNAP"]],
  ["MBA HR", "PG", "2 Years", "Human Resources", 7, "9-18 LPA", ["CAT", "CMAT"]],
  ["MBA Business Analytics", "PG", "2 Years", "Analytics", 9, "14-28 LPA", ["CAT", "NMAT"]],
  ["BBA", "UG", "3 Years", "Business Administration", 2.5, "4-8 LPA", ["IPMAT", "CUET UG"]],
  ["PGDM", "PG", "2 Years", "General Management", 10, "11-24 LPA", ["CAT", "MAT"]],
  ["MBA Operations", "PG", "2 Years", "Operations", 7.2, "10-20 LPA", ["CAT"]],
  ["MBA International Business", "PG", "2 Years", "IB", 8.5, "12-24 LPA", ["CAT", "IIFT"]],
  ["Executive MBA", "PG", "1 Year", "Executive", 15, "18-35 LPA", ["CAT", "GMAT"]],
  ["BBA Digital Marketing", "UG", "3 Years", "Digital Marketing", 2.8, "4-9 LPA", ["CUET UG"]],
  ["MBA Healthcare Management", "PG", "2 Years", "Healthcare", 7.8, "10-18 LPA", ["CAT"]],
  ["MBA Supply Chain", "PG", "2 Years", "Supply Chain", 7.4, "10-21 LPA", ["CAT"]],
  ["PGDM Retail Management", "PG", "2 Years", "Retail", 6.5, "7-15 LPA", ["MAT", "CMAT"]],
  ["BBA Aviation Management", "UG", "3 Years", "Aviation Mgmt", 3.2, "5-10 LPA", ["CUET UG"]],
  ["MBA FinTech", "PG", "2 Years", "FinTech", 9.5, "15-30 LPA", ["CAT"]],
  ["Integrated MBA (5 Yr)", "UG", "5 Years", "Integrated MBA", 6, "8-16 LPA", ["IPMAT"]],
  ["MBA Rural Management", "PG", "2 Years", "Rural Mgmt", 6.8, "8-16 LPA", ["CAT", "XAT"]],
  ["BBA Finance", "UG", "3 Years", "Finance", 2.6, "4-8 LPA", ["CUET UG"]],
  ["MBA IT & Systems", "PG", "2 Years", "IT Management", 8, "12-24 LPA", ["CAT"]],
  ["PGDM Data Science", "PG", "2 Years", "Data Science", 11, "14-28 LPA", ["CAT", "NMAT"]]
].forEach(([n, l, d, s, f, sal, ex]) => add("Management", n, l, d, s, f, sal, ex));

// Law
[
  ["BA LLB (Hons)", "UG", "5 Years", "Integrated Law", 3.5, "6-12 LPA", ["CLAT", "AILET"]],
  ["BBA LLB", "UG", "5 Years", "Business Law", 3.8, "6-12 LPA", ["CLAT"]],
  ["LLB", "UG", "3 Years", "Law", 1.2, "5-10 LPA", ["DU LLB", "MHCET Law"]],
  ["LLM Corporate Law", "PG", "1 Year", "Corporate Law", 2.5, "8-15 LPA", ["CLAT PG"]],
  ["LLM Constitutional Law", "PG", "2 Years", "Constitutional", 2.2, "7-14 LPA", ["CUET PG"]],
  ["BA LLB", "UG", "5 Years", "Law", 3, "5-10 LPA", ["CLAT", "LSAT India"]],
  ["LLM Criminal Law", "PG", "2 Years", "Criminal Law", 2, "6-12 LPA", ["CLAT PG"]],
  ["B.Com LLB", "UG", "5 Years", "Commerce Law", 3.2, "6-11 LPA", ["CLAT"]]
].forEach(([n, l, d, s, f, sal, ex]) => add("Law", n, l, d, s, f, sal, ex));

// Commerce
[
  ["B.Com (Hons)", "UG", "3 Years", "Commerce", 0.8, "3-7 LPA", ["CUET UG"]],
  ["M.Com", "PG", "2 Years", "Commerce", 0.6, "4-9 LPA", ["CUET PG"]],
  ["B.Com Accounting & Finance", "UG", "3 Years", "Accounting", 1.1, "4-8 LPA", ["CUET UG"]],
  ["CA Foundation + Coaching", "Certificate", "6 Months", "CA", 0.35, "—", ["CA Foundation"]],
  ["CS Executive", "Certificate", "9 Months", "Company Secretary", 0.25, "—", ["CS Executive"]],
  ["CMA Intermediate", "Certificate", "1 Year", "CMA", 0.3, "—", ["CMA"]],
  ["B.Com Banking & Insurance", "UG", "3 Years", "Banking", 1, "4-8 LPA", ["CUET UG"]],
  ["M.Com Finance", "PG", "2 Years", "Finance", 0.7, "5-10 LPA", ["CUET PG"]],
  ["B.Com Taxation", "UG", "3 Years", "Taxation", 0.9, "3-7 LPA", ["CUET UG"]],
  ["B.Com Computer Applications", "UG", "3 Years", "Computers", 1, "4-8 LPA", ["CUET UG"]],
  ["PG Diploma Banking", "PG", "1 Year", "Banking", 1.5, "5-10 LPA", ["IBPS", "Bank exams"]],
  ["B.Com International Business", "UG", "3 Years", "IB", 1.2, "4-9 LPA", ["CUET UG"]],
  ["M.Com Accounting", "PG", "2 Years", "Accounting", 0.65, "5-10 LPA", ["CUET PG"]],
  ["B.Com E-Commerce", "UG", "3 Years", "E-Commerce", 1.05, "4-9 LPA", ["CUET UG"]],
  ["Financial Risk Manager Prep", "Certificate", "4 Months", "FRM", 0.4, "—", ["GARP FRM"]]
].forEach(([n, l, d, s, f, sal, ex]) => add("Commerce", n, l, d, s, f, sal, ex));

// Science
[
  ["B.Sc Physics", "UG", "3 Years", "Physics", 0.5, "3-7 LPA", ["CUET UG"]],
  ["M.Sc Physics", "PG", "2 Years", "Physics", 0.45, "4-9 LPA", ["CUET PG", "IIT JAM"]],
  ["B.Sc Chemistry", "UG", "3 Years", "Chemistry", 0.48, "3-7 LPA", ["CUET UG"]],
  ["M.Sc Chemistry", "PG", "2 Years", "Chemistry", 0.42, "4-9 LPA", ["IIT JAM"]],
  ["B.Sc Mathematics", "UG", "3 Years", "Mathematics", 0.46, "4-9 LPA", ["CUET UG"]],
  ["M.Sc Mathematics", "PG", "2 Years", "Mathematics", 0.44, "5-12 LPA", ["IIT JAM"]],
  ["B.Sc Biotechnology", "UG", "3 Years", "Biotechnology", 1.2, "4-8 LPA", ["CUET UG"]],
  ["M.Sc Biotechnology", "PG", "2 Years", "Biotechnology", 1.5, "5-11 LPA", ["CUET PG"]],
  ["B.Sc Data Science", "UG", "3 Years", "Data Science", 1.4, "5-10 LPA", ["CUET UG"]],
  ["B.Sc Environmental Science", "UG", "3 Years", "Environment", 0.55, "3-6 LPA", ["CUET UG"]],
  ["M.Sc Microbiology", "PG", "2 Years", "Microbiology", 0.9, "4-8 LPA", ["CUET PG"]],
  ["B.Sc Food Technology", "UG", "3 Years", "Food Tech", 1.1, "4-8 LPA", ["CUET UG"]],
  ["M.Sc Statistics", "PG", "2 Years", "Statistics", 0.5, "6-14 LPA", ["CUET PG"]],
  ["B.Sc Actuarial Science", "UG", "3 Years", "Actuarial", 2, "6-12 LPA", ["CUET UG"]],
  ["Integrated M.Sc Economics", "UG", "5 Years", "Economics", 1.8, "6-12 LPA", ["CUET UG"]],
  ["B.Sc Forensic Science", "UG", "3 Years", "Forensic", 0.95, "3-7 LPA", ["CUET UG"]],
  ["M.Sc Data Analytics", "PG", "2 Years", "Analytics", 1.6, "7-15 LPA", ["CUET PG"]],
  ["B.Sc Zoology", "UG", "3 Years", "Zoology", 0.42, "3-6 LPA", ["CUET UG"]],
  ["M.Sc Botany", "PG", "2 Years", "Botany", 0.4, "4-8 LPA", ["CUET PG"]],
  ["B.Sc Electronics", "UG", "3 Years", "Electronics", 0.85, "4-8 LPA", ["CUET UG"]]
].forEach(([n, l, d, s, f, sal, ex]) => add("Science", n, l, d, s, f, sal, ex));

// Arts & Humanities
[
  ["BA English Literature", "UG", "3 Years", "English", 0.35, "3-7 LPA", ["CUET UG"]],
  ["MA English", "PG", "2 Years", "English", 0.32, "4-9 LPA", ["CUET PG"]],
  ["BA Journalism & Mass Communication", "UG", "3 Years", "Journalism", 1.5, "4-9 LPA", ["CUET UG", "IIMC"]],
  ["MA Psychology", "PG", "2 Years", "Psychology", 0.55, "4-10 LPA", ["CUET PG"]],
  ["BA Psychology", "UG", "3 Years", "Psychology", 0.48, "3-7 LPA", ["CUET UG"]],
  ["MA Sociology", "PG", "2 Years", "Sociology", 0.3, "4-8 LPA", ["CUET PG"]],
  ["BA Political Science", "UG", "3 Years", "Political Science", 0.33, "3-8 LPA", ["CUET UG"]],
  ["MA Political Science", "PG", "2 Years", "Political Science", 0.34, "4-9 LPA", ["CUET PG"]],
  ["BA History", "UG", "3 Years", "History", 0.3, "3-6 LPA", ["CUET UG"]],
  ["MA Public Administration", "PG", "2 Years", "Public Admin", 0.4, "5-10 LPA", ["CUET PG"]],
  ["BA Economics", "UG", "3 Years", "Economics", 0.38, "4-9 LPA", ["CUET UG"]],
  ["MA Economics", "PG", "2 Years", "Economics", 0.42, "6-14 LPA", ["CUET PG"]],
  ["BA Fine Arts", "UG", "4 Years", "Fine Arts", 1.2, "3-8 LPA", ["CUET UG"]],
  ["MA International Relations", "PG", "2 Years", "IR", 0.5, "6-12 LPA", ["CUET PG"]],
  ["BA Social Work", "UG", "3 Years", "Social Work", 0.4, "3-7 LPA", ["CUET UG"]]
].forEach(([n, l, d, s, f, sal, ex]) => add("Arts & Humanities", n, l, d, s, f, sal, ex));

// Computer & IT
[
  ["BCA", "UG", "3 Years", "Computer Applications", 1.2, "4-9 LPA", ["CUET UG"]],
  ["MCA", "PG", "2 Years", "Computer Applications", 1.6, "6-14 LPA", ["NIMCET", "CUET PG"]],
  ["B.Sc IT", "UG", "3 Years", "Information Technology", 1.1, "4-8 LPA", ["CUET UG"]],
  ["M.Sc IT", "PG", "2 Years", "IT", 1.4, "6-12 LPA", ["CUET PG"]],
  ["PG Diploma Full Stack Development", "PG", "1 Year", "Full Stack", 2.5, "6-12 LPA", ["Institute test"]],
  ["B.Sc Cloud Computing", "UG", "3 Years", "Cloud", 1.8, "5-11 LPA", ["CUET UG"]],
  ["MCA AI & ML", "PG", "2 Years", "AI", 2.2, "8-16 LPA", ["NIMCET"]],
  ["B.Sc Software Development", "UG", "3 Years", "Software", 1.5, "5-10 LPA", ["CUET UG"]],
  ["PG Diploma Cyber Security", "PG", "1 Year", "Cyber Security", 2.8, "7-14 LPA", ["Aptitude test"]],
  ["BCA Data Analytics", "UG", "3 Years", "Analytics", 1.4, "5-10 LPA", ["CUET UG"]],
  ["MCA Cloud & DevOps", "PG", "2 Years", "DevOps", 2, "8-15 LPA", ["NIMCET"]],
  ["B.Sc Computer Science", "UG", "3 Years", "CS", 1.05, "5-11 LPA", ["CUET UG"]]
].forEach(([n, l, d, s, f, sal, ex]) => add("Computer & IT", n, l, d, s, f, sal, ex));

// Design
[
  ["B.Des Fashion Design", "UG", "4 Years", "Fashion Design", 4.5, "5-12 LPA", ["NIFT", "UCEED"]],
  ["M.Des UI/UX", "PG", "2 Years", "UI/UX", 5.2, "8-18 LPA", ["CEED"]],
  ["B.Des Interior Design", "UG", "4 Years", "Interior", 4.2, "4-10 LPA", ["NIFT"]],
  ["B.Des Graphic Design", "UG", "4 Years", "Graphic", 4, "4-10 LPA", ["NIFT"]],
  ["B.Sc Animation & VFX", "UG", "3 Years", "Animation", 2.8, "4-10 LPA", ["CUET UG"]],
  ["Diploma in Fashion Design", "Diploma", "1 Year", "Fashion", 1.2, "3-6 LPA", ["Institute test"]],
  ["B.Des Product Design", "UG", "4 Years", "Product", 4.8, "6-14 LPA", ["UCEED"]],
  ["M.Des Communication Design", "PG", "2 Years", "Communication", 5, "7-16 LPA", ["CEED"]],
  ["B.Des Textile Design", "UG", "4 Years", "Textile", 4.1, "4-9 LPA", ["NIFT"]],
  ["PG Diploma UI Design", "PG", "1 Year", "UI", 2.2, "6-12 LPA", ["Portfolio review"]]
].forEach(([n, l, d, s, f, sal, ex]) => add("Design", n, l, d, s, f, sal, ex));

// Hotel Management
[
  ["BHM (Bachelor of Hotel Management)", "UG", "4 Years", "Hotel Management", 3.5, "4-9 LPA", ["NCHM JEE"]],
  ["B.Sc Hospitality & Hotel Admin", "UG", "3 Years", "Hospitality", 2.8, "4-8 LPA", ["CUET UG"]],
  ["MBA Hospitality Management", "PG", "2 Years", "Hospitality", 6, "8-16 LPA", ["CAT"]],
  ["Diploma in Food Production", "Diploma", "1.5 Years", "Culinary", 1.5, "3-6 LPA", ["Institute test"]]
].forEach(([n, l, d, s, f, sal, ex]) => add("Hotel Management", n, l, d, s, f, sal, ex));

// Aviation
[
  ["B.Sc Aviation", "UG", "3 Years", "Aviation", 4.2, "5-12 LPA", ["AME CET", "CUET UG"]],
  ["MBA Aviation Management", "PG", "2 Years", "Aviation Mgmt", 7.5, "8-18 LPA", ["CAT"]],
  ["Commercial Pilot Training (CPL)", "Certificate", "18 Months", "Pilot", 35, "15-40 LPA*", ["DGCA exams"]],
  ["BBA Airport Management", "UG", "3 Years", "Airport", 3, "4-9 LPA", ["CUET UG"]],
  ["Aircraft Maintenance Engineering", "Diploma", "3 Years", "AME", 5, "6-14 LPA", ["AME CET"]]
].forEach(([n, l, d, s, f, sal, ex]) => add("Aviation", n, l, d, s, f, sal, ex));

// Agriculture
[
  ["B.Sc Agriculture", "UG", "4 Years", "Agriculture", 1.2, "4-8 LPA", ["ICAR AIEEA"]],
  ["M.Sc Agronomy", "PG", "2 Years", "Agronomy", 0.9, "5-10 LPA", ["ICAR AIEEA PG"]],
  ["B.Tech Agricultural Engineering", "UG", "4 Years", "Agri Eng", 1.6, "5-9 LPA", ["ICAR AIEEA"]],
  ["B.Sc Horticulture", "UG", "4 Years", "Horticulture", 1.1, "4-8 LPA", ["ICAR AIEEA"]],
  ["M.Sc Plant Breeding", "PG", "2 Years", "Plant Breeding", 0.85, "5-10 LPA", ["ICAR AIEEA PG"]],
  ["B.Sc Forestry", "UG", "4 Years", "Forestry", 1, "4-8 LPA", ["ICAR AIEEA"]],
  ["B.Sc Food Science", "UG", "3 Years", "Food Science", 1.05, "4-8 LPA", ["CUET UG"]],
  ["M.Sc Soil Science", "PG", "2 Years", "Soil Science", 0.8, "4-9 LPA", ["ICAR AIEEA PG"]]
].forEach(([n, l, d, s, f, sal, ex]) => add("Agriculture", n, l, d, s, f, sal, ex));

// Government & Skill
[
  ["ITI Electrician", "Diploma", "2 Years", "Electrician", 0.08, "2-4 LPA", ["NCVT"]],
  ["ITI Fitter", "Diploma", "2 Years", "Fitter", 0.08, "2-4 LPA", ["NCVT"]],
  ["NSDC Skill Certificate — Welding", "Certificate", "6 Months", "Welding", 0.05, "2-4 LPA", ["NSDC Assessment"]],
  ["Diploma in Fire & Safety", "Diploma", "1 Year", "Fire Safety", 0.45, "3-6 LPA", ["State board"]],
  ["B.Ed", "UG", "2 Years", "Education", 0.6, "3-6 LPA", ["CUET PG", "State B.Ed"]],
  ["D.El.Ed", "Diploma", "2 Years", "Elementary Ed", 0.35, "2-5 LPA", ["State entrance"]],
  ["Stenography Skill Course", "Certificate", "1 Year", "Stenography", 0.15, "2-5 LPA", ["SSC skill test"]],
  ["Diploma in Rural Development", "Diploma", "1 Year", "Rural Dev", 0.25, "3-5 LPA", ["IGNOU"]],
  ["Certificate in GST Practitioner", "Certificate", "3 Months", "GST", 0.08, "2-5 LPA", ["NACIN"]],
  ["NSDC Digital Marketing", "Certificate", "4 Months", "Digital Marketing", 0.12, "3-6 LPA", ["NSDC"]],
  ["ITI COPA", "Diploma", "1 Year", "Computer Operator", 0.06, "2-4 LPA", ["NCVT"]],
  ["Diploma in Beauty & Wellness", "Diploma", "1 Year", "Beauty", 0.5, "2-5 LPA", ["Institute"]]
].forEach(([n, l, d, s, f, sal, ex]) => add("Government & Skill Courses", n, l, d, s, f, sal, ex));

// Online Certification
[
  ["Google Data Analytics Certificate", "Certificate", "6 Months", "Data Analytics", 0.15, "4-8 LPA", ["Coursera"]],
  ["AWS Cloud Practitioner", "Certificate", "3 Months", "Cloud", 0.12, "5-10 LPA", ["AWS"]],
  ["Microsoft Azure Fundamentals", "Certificate", "2 Months", "Cloud", 0.08, "5-10 LPA", ["Microsoft"]],
  ["IBM Data Science Professional", "Certificate", "8 Months", "Data Science", 0.2, "5-11 LPA", ["IBM"]],
  ["Meta Front-End Developer", "Certificate", "6 Months", "Web Dev", 0.14, "5-10 LPA", ["Meta"]],
  ["NPTEL Python for DS", "Certificate", "4 Months", "Python", 0, "3-7 LPA", ["NPTEL exam"]],
  ["Udacity Full Stack Nanodegree", "Certificate", "4 Months", "Full Stack", 0.35, "6-12 LPA", ["Project review"]],
  ["Great Learning PG Certificate ML", "Certificate", "6 Months", "ML", 0.45, "7-14 LPA", ["GL assessment"]],
  ["Simplilearn PMP Prep", "Certificate", "3 Months", "Project Mgmt", 0.25, "8-18 LPA", ["PMI"]],
  ["upGrad HR Analytics", "Certificate", "5 Months", "HR Analytics", 0.4, "5-10 LPA", ["upGrad"]],
  ["Coursera Deep Learning", "Certificate", "4 Months", "Deep Learning", 0.18, "6-14 LPA", ["Coursera"]],
  ["LinkedIn Learning Excel Expert", "Certificate", "2 Months", "Excel", 0.03, "3-6 LPA", ["LinkedIn"]],
  ["Scaler Academy Software Dev", "Certificate", "12 Months", "Software", 3.5, "8-18 LPA", ["Scaler test"]],
  ["Coding Ninjas DSA Course", "Certificate", "6 Months", "DSA", 0.22, "6-15 LPA", ["CN"]],
  ["Unacademy UPSC Foundation", "Certificate", "12 Months", "UPSC", 0.55, "—", ["Mock tests"]],
  ["edX MicroMasters Statistics", "Certificate", "8 Months", "Statistics", 0.3, "6-12 LPA", ["edX"]],
  ["IIMBx Business Strategy", "Certificate", "4 Months", "Strategy", 0.28, "5-12 LPA", ["IIMBx"]],
  ["NPTEL IoT", "Certificate", "3 Months", "IoT", 0, "4-9 LPA", ["NPTEL"]]
].forEach(([n, l, d, s, f, sal, ex]) => add("Online Certification Courses", n, l, d, s, f, sal, ex, "Online"));

const courses = rows.map(([stream, courseName, level, duration, specialization, fees, averageSalary, entranceExams, mode], idx) => {
  const id = idx + 1;
  const slug = slugify(courseName, id);
  const rating = Math.round((3.8 + (id % 17) * 0.08 + (stream.length % 5) * 0.05) * 10) / 10;
  const totalStudents = 800 + (id * 137) % 12000;
  const statuses = ["Active", "Active", "Active", "Trending", "New"];
  const status = statuses[id % 5];
  const isPopular = id % 4 === 1 || id % 7 === 2;
  const isTrending = id % 6 === 0 || id % 9 === 1;
  const y = 2024 + (id % 2);
  const m = 1 + (id % 11);
  const d = 1 + (id % 27);

  const desc = `${courseName} is a ${level} programme in ${stream} focusing on ${specialization}. Recognised across Indian universities and industry; curriculum blends theory, practical labs, and industry exposure. Ideal for students targeting careers in ${specialization.toLowerCase()} and related sectors.`;

  const careers = [
    `${specialization} specialist`,
    "Consultant",
    stream === "Engineering" ? "R&D engineer" : stream === "Medical" ? "Clinical roles" : "Analyst",
    "Entrepreneurship"
  ];

  return {
    id,
    courseName,
    slug,
    stream,
    level,
    duration,
    mode,
    fees,
    feesDisplay: fees === 0 ? "Free / Govt subsidised" : `₹${fees.toFixed(2)} L / yr`,
    averageSalary,
    eligibility:
      level === "UG"
        ? "10+2 or equivalent from a recognised board with minimum marks as per institute/university norms."
        : level === "PG"
          ? "Bachelor’s degree in relevant discipline with required CGPA/percentage; some programmes require entrance scores."
          : level === "Diploma"
            ? "10th pass for most ITI/polytechnic programmes; 10+2 for advanced diplomas as per brochure."
            : "Varies by programme — typically 10th/12th pass or working professionals; check provider guidelines.",
    description: desc,
    careerOptions: careers,
    topRecruiters: pick(recruiters, 5, id),
    popularColleges: pick(colleges, 4, id + 3),
    entranceExams,
    specialization,
    rating,
    totalStudents,
    image: `https://picsum.photos/seed/${slug}/640/400`,
    status,
    createdAt: iso(y, m, d),
    isPopular,
    isTrending,
    skillsGained: [
      `${specialization} fundamentals`,
      "Communication & teamwork",
      "Industry tools & best practices",
      "Research or analytical methods"
    ],
    faqs: [
      {
        "q": "What is the duration and mode of this course?",
        "a": `This is a ${duration} programme offered in ${mode} mode. Verify session structure on the institute website.`
      },
      {
        "q": "Which entrance exams are accepted?",
        "a": `Commonly: ${entranceExams.join(", ")}. Cut-offs vary by institution and category.`
      },
      {
        "q": "What salary can I expect after completion?",
        "a": `Indicative packages are around ${averageSalary} depending on college, location, and role. Medical figures may refer to internship/residency stages.`
      }
    ]
  };
});

const trimmed = courses.slice(0, 195);
fs.writeFileSync(out, JSON.stringify(trimmed, null, 2), "utf8");
console.log("Wrote", trimmed.length, "courses to", out);
