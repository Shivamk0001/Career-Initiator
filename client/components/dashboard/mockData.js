export const sidebarItems = [
  { key: "dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { key: "profile", label: "My Profile", icon: "UserCircle2" },
  { key: "courses", label: "Courses", icon: "GraduationCap" },
  { key: "colleges", label: "Colleges", icon: "Building2" },
  { key: "exams", label: "Exams", icon: "BookOpenCheck" },
  { key: "bookmarks", label: "Bookmarks", icon: "Bookmark" },
  { key: "notifications", label: "Notifications", icon: "BellRing" },
  { key: "settings", label: "Settings", icon: "Settings" },
  { key: "help", label: "Help", icon: "LifeBuoy" },
  { key: "logout", label: "Logout", icon: "LogOut" }
];

export const stats = [
  { title: "Courses", value: "12", trend: "+2 this week", icon: "BookCopy" },
  { title: "Exams", value: "5", trend: "2 upcoming", icon: "BookOpenCheck" },
  { title: "Bookmarks", value: "17", trend: "+4 recent", icon: "Bookmark" },
  { title: "Progress", value: "74%", trend: "+6%", icon: "Target" }
];

export const learningActivity = [
  { day: "Mon", hours: 2.3, tasks: 3 },
  { day: "Tue", hours: 3.5, tasks: 4 },
  { day: "Wed", hours: 2.9, tasks: 3 },
  { day: "Thu", hours: 4.2, tasks: 6 },
  { day: "Fri", hours: 3.8, tasks: 5 },
  { day: "Sat", hours: 2.5, tasks: 3 },
  { day: "Sun", hours: 1.8, tasks: 2 }
];

export const courses = [
  { id: 1, title: "Quantitative Aptitude Bootcamp", instructor: "Rahul Verma", progress: 72, duration: "18h", lastAccessed: "2 hours ago" },
  { id: 2, title: "Career Discovery Framework", instructor: "Priya Nair", progress: 41, duration: "11h", lastAccessed: "Yesterday" },
  { id: 3, title: "AI & Data Science Foundations", instructor: "Aman Singh", progress: 33, duration: "21h", lastAccessed: "3 days ago" },
  { id: 4, title: "Communication for Interviews", instructor: "Sneha Kapoor", progress: 58, duration: "9h", lastAccessed: "4 days ago" }
];

export const colleges = [
  { id: 1, name: "National Tech Institute", rating: "4.8", location: "Bengaluru", fees: "INR 2.4L/year" },
  { id: 2, name: "Global Management School", rating: "4.6", location: "Pune", fees: "INR 3.1L/year" },
  { id: 3, name: "Future Commerce Academy", rating: "4.5", location: "Delhi", fees: "INR 1.8L/year" }
];

export const upcomingExams = [
  { name: "CUET 2026", date: "18 Jun 2026", daysLeft: 24 },
  { name: "JEE Main Session-2", date: "16 Jul 2026", daysLeft: 52 },
  { name: "IPMAT", date: "01 Jul 2026", daysLeft: 37 }
];

export const activities = [
  "Viewed IIT Delhi admission page",
  "Bookmarked CAT preparation roadmap",
  "Downloaded Data Analytics certificate",
  "Submitted application to NIT Trichy"
];
