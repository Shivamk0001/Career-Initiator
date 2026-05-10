"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { apiFetch } from "@/lib/api";
import { clearSession, getSession } from "@/lib/auth";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import {
  activities,
  courses,
  learningActivity,
  sidebarItems,
  stats,
  upcomingExams
} from "@/components/dashboard/mockData";
import {
  AnalyticsSection,
  DashboardLists,
  HeroCard,
  ProfileSummary,
  StatsGrid
} from "@/components/dashboard/DashboardSections";

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeItem, setActiveItem] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const session = getSession();
    if (!session?.token) {
      router.replace("/login");
      return;
    }
    apiFetch("/users/me")
      .then((data) => setProfile(data))
      .catch(() => {
        router.replace("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router]);

  const handleSidebarSelect = (key) => {
    setActiveItem(key);
    const routeMap = {
      dashboard: "/dashboard",
      courses: "/courses",
      colleges: "/colleges",
      exams: "/exams",
      profile: "/profile",
      settings: "/profile"
    };
    if (key === "logout") {
      clearSession();
      router.push("/login");
      return;
    }
    if (routeMap[key] && routeMap[key] !== "/dashboard") {
      router.push(routeMap[key]);
      return;
    }
    if (!routeMap[key]) {
      setToast(`${key.replace("-", " ")} is coming soon.`);
      setTimeout(() => setToast(""), 2200);
    }
  };

  const handleDropdownAction = (action) => {
    setDropdownOpen(false);
    if (action === "Logout") {
      clearSession();
      router.push("/login");
      return;
    }
    if (action === "My Profile" || action === "Edit Profile" || action === "Settings") {
      router.push("/profile");
    }
  };

  const handleContinueLearning = () => {
    router.push("/courses");
  };

  return (
    <div className="min-h-screen bg-slate-50 px-3 py-3 text-slate-900 sm:px-4">
      <div className="mx-auto flex max-w-[1550px] gap-3">
        <div className="hidden lg:block">
          <DashboardSidebar items={sidebarItems} activeItem={activeItem} onSelect={handleSidebarSelect} />
        </div>

        <AnimatePresence>
          {sidebarOpen ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-slate-900/30 lg:hidden">
              <div className="absolute left-3 top-3">
                <DashboardSidebar
                  items={sidebarItems}
                  activeItem={activeItem}
                  onSelect={(key) => {
                    handleSidebarSelect(key);
                    setSidebarOpen(false);
                  }}
                />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <main className="flex-1">
          <AnimatePresence>
            {toast ? (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mb-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm text-blue-700"
              >
                {toast}
              </motion.div>
            ) : null}
          </AnimatePresence>
          <DashboardTopbar
            user={profile}
            search={search}
            onSearchChange={setSearch}
            onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
            dropdownOpen={dropdownOpen}
            onToggleDropdown={() => setDropdownOpen((prev) => !prev)}
            onDropdownAction={handleDropdownAction}
          />

          {loading ? (
            <DashboardSkeleton />
          ) : (
            <div className="space-y-4 pb-8">
              <HeroCard user={profile} onContinue={handleContinueLearning} />
              <StatsGrid stats={stats} />
              <AnalyticsSection learningActivity={learningActivity} />
              <ProfileSummary user={profile} />
              <DashboardLists
                courses={courses}
                upcomingExams={upcomingExams}
                activities={activities}
                search={search}
                onContinue={handleContinueLearning}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
