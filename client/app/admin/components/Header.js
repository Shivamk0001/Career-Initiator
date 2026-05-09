"use client";

import { useRouter } from "next/navigation";
import { clearSession } from "@/lib/auth";

export default function AdminHeader({ title, subtitle }) {
  const router = useRouter();

  const handleLogout = () => {
    clearSession();
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="mb-6 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
        {subtitle ? <p className="text-sm text-slate-500">{subtitle}</p> : null}
      </div>
      <button
        onClick={handleLogout}
        className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        Logout
      </button>
    </header>
  );
}
