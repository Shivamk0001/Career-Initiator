import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Briefcase,
  GraduationCap,
  TrendingUp,
  IndianRupee,
  Clock,
} from "lucide-react";

import { careers } from "@/data/careers";

export async function generateMetadata({ params }) {
  const career = careers.find((item) => item.slug === params.slug);

  if (!career) {
    return {
      title: "Career Not Found",
    };
  }

  return {
    title: `${career.title} Career Guide`,
    description: career.shortDescription,
  };
}

export default function CareerDetailsPage({ params }) {
  const career = careers.find((item) => item.slug === params.slug);

  if (!career) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#002147] to-[#0a4d8c] py-16 text-white">
        <div className="container mx-auto px-4">
          <Link
            href="/careers"
            className="mb-6 inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Careers
          </Link>

          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium">
                {career.category}
              </span>

              <h1 className="mb-4 text-4xl font-bold md:text-5xl">
                {career.title}
              </h1>

              <p className="max-w-2xl text-lg text-white/90">
                {career.shortDescription}
              </p>
            </div>

            <div className="relative h-72 overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src={career.image}
                alt={career.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="container mx-auto -mt-10 px-4">
        <div className="grid gap-4 rounded-3xl bg-white p-6 shadow-xl md:grid-cols-4">
          <FactCard
            icon={<IndianRupee className="h-5 w-5 text-blue-600" />}
            label="Average Salary"
            value={career.averageSalary}
          />
          <FactCard
            icon={<Clock className="h-5 w-5 text-blue-600" />}
            label="Duration"
            value={career.duration}
          />
          <FactCard
            icon={<GraduationCap className="h-5 w-5 text-blue-600" />}
            label="Education"
            value={career.education}
          />
          <FactCard
            icon={<TrendingUp className="h-5 w-5 text-blue-600" />}
            label="Growth"
            value={career.growth}
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Left Content */}
          <div className="space-y-10 lg:col-span-2">
            {/* Overview */}
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Career Overview
              </h2>
              <p className="leading-8 text-slate-600">
                {career.overview || career.shortDescription}
              </p>
            </div>

            {/* Skills */}
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Required Skills
              </h2>
              <div className="flex flex-wrap gap-3">
                {career.skills?.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Roadmap */}
            {career.roadmap && (
              <div className="rounded-3xl bg-white p-8 shadow-sm">
                <h2 className="mb-4 text-2xl font-bold text-slate-900">
                  Career Roadmap
                </h2>
                <ul className="space-y-3">
                  {career.roadmap.map((step, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                        {index + 1}
                      </span>
                      <span className="text-slate-600">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-bold text-slate-900">
                Quick Facts
              </h3>

              <div className="space-y-4 text-sm">
                <SidebarItem
                  label="Category"
                  value={career.category}
                />
                <SidebarItem
                  label="Salary"
                  value={career.averageSalary}
                />
                <SidebarItem
                  label="Duration"
                  value={career.duration}
                />
                <SidebarItem
                  label="Growth"
                  value={career.growth}
                />
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-[#002147] to-[#0a4d8c] p-6 text-white shadow-xl">
              <h3 className="mb-3 text-xl font-bold">
                Need Career Guidance?
              </h3>
              <p className="mb-4 text-white/90">
                Talk to our experts and get personalized advice.
              </p>
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-xl bg-white px-4 py-3 font-semibold text-[#002147]"
              >
                Get Counseling
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function FactCard({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
        {icon}
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-500">
          {label}
        </p>
        <p className="font-semibold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

function SidebarItem({ label, value }) {
  return (
    <div className="flex justify-between border-b border-slate-100 pb-2">
      <span className="text-slate-500">{label}</span>
      <span className="font-semibold text-slate-900">{value}</span>
    </div>
  );
}