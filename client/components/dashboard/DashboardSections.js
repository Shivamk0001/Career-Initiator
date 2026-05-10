"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import Link from "next/link";
import { iconMap } from "@/components/dashboard/icons";
import SectionCard from "@/components/dashboard/SectionCard";

export function HeroCard({ user, onContinue }) {
  return (
    <section className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-blue-100">Welcome back</p>
          <h2 className="mt-1 text-2xl font-semibold">Hi, {(user?.name || "Student").split(" ")[0]} 👋</h2>
          <p className="mt-1 text-sm text-blue-100">One small step every day leads to big career results.</p>
        </div>
        <button
          type="button"
          onClick={onContinue}
          className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
        >
          Continue Learning
        </button>
      </div>
    </section>
  );
}

export function StatsGrid({ stats }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = iconMap[item.icon];
        return (
          <article key={item.title} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-blue-50 p-2">
                <Icon size={16} className="text-blue-600" />
              </div>
              <span className="text-xs text-slate-500">{item.trend}</span>
            </div>
            <p className="mt-3 text-2xl font-semibold text-slate-900">{item.value}</p>
            <p className="text-sm text-slate-600">{item.title}</p>
          </article>
        );
      })}
    </div>
  );
}

export function AnalyticsSection({ learningActivity }) {
  return (
    <SectionCard title="Weekly Learning Progress" description="Hours spent learning this week">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={learningActivity}>
            <XAxis dataKey="day" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip />
            <Line type="monotone" dataKey="hours" stroke="#2563eb" strokeWidth={2.5} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}

export function ProfileSummary({ user }) {
  return (
    <SectionCard
      title="Profile Summary"
      description="Quick overview of your information"
      action={<Link href="/profile" className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50">Edit Profile</Link>}
    >
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">Name: {user?.name || "-"}</div>
        <div className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">Email: {user?.email || "-"}</div>
        <div className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">Mobile: {user?.phone || "-"}</div>
        <div className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">Address: {user?.address || user?.city || "-"}</div>
        <div className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
          Education: {user?.qualification || user?.educationLevel || "-"}
        </div>
        <div className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">Career Interest: {user?.stream || "-"}</div>
      </div>
    </SectionCard>
  );
}

export function DashboardLists({ courses, upcomingExams, activities, search, onContinue }) {
  const filteredCourses = courses.filter((c) => c.title.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="grid gap-4 xl:grid-cols-3">
      <SectionCard title="Recent Activity" description="Your latest actions">
        <div className="space-y-2">
          {activities?.length ? (
            activities.map((activity) => (
              <div key={activity} className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
                {activity}
              </div>
            ))
          ) : (
            <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-500">No recent activity yet.</p>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Upcoming Exams" description="Important upcoming dates">
        <div className="space-y-3">
          {upcomingExams?.length ? (
            upcomingExams.map((exam) => (
              <div key={exam.name} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-slate-900">{exam.name}</p>
                  <span className="text-xs text-rose-600">{exam.daysLeft} days</span>
                </div>
                <p className="mt-1 text-xs text-slate-500">Date: {exam.date}</p>
              </div>
            ))
          ) : (
            <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-500">No upcoming exams.</p>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Continue Learning" description="Your in-progress courses">
        <div className="space-y-3">
          {filteredCourses.length ? (
            filteredCourses.slice(0, 4).map((course) => (
              <div key={course.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-slate-900">{course.title}</p>
                    <p className="text-xs text-slate-500">{course.instructor}</p>
                  </div>
                  <button
                    type="button"
                    onClick={onContinue}
                    className="rounded-md bg-blue-600 px-2.5 py-1 text-xs text-white hover:bg-blue-700"
                  >
                    Continue
                  </button>
                </div>
                <div className="mt-2 h-2 rounded-full bg-slate-200">
                  <div className="h-2 rounded-full bg-blue-600" style={{ width: `${course.progress}%` }} />
                </div>
              </div>
            ))
          ) : (
            <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-500">No courses found for this search.</p>
          )}
        </div>
      </SectionCard>
    </div>
  );
}
