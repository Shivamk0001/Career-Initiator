"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/admin/components/Sidebar";
import AdminHeader from "@/app/admin/components/Header";
import { getSession } from "@/lib/auth";

export default function AdminShell({ title, subtitle, children }) {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const session = getSession();
    if (!session?.token || session?.user?.role !== "admin") {
      router.replace("/login");
      return;
    }
    setIsReady(true);
  }, [router]);

  if (!isReady) {
    return <div className="min-h-screen bg-slate-100 p-6 text-slate-700">Loading admin page...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6">
        <Sidebar />
        <main className="flex-1">
          <AdminHeader title={title} subtitle={subtitle} />
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">{children}</div>
        </main>
      </div>
    </div>
  );
}
