"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/app/admin/components/AdminShell";
import { apiFetch } from "@/lib/api";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch("/admin/stats")
      .then(setStats)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load stats"));
  }, []);

  return (
    <AdminShell title="Dashboard" subtitle="Platform usage overview">
      {error ? <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</div> : null}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Total Users</p>
          <p className="mt-2 text-2xl font-semibold">{stats?.users ?? 0}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Active Users</p>
          <p className="mt-2 text-2xl font-semibold">{stats?.activeUsers ?? 0}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Blocked Users</p>
          <p className="mt-2 text-2xl font-semibold">{(stats?.users ?? 0) - (stats?.activeUsers ?? 0)}</p>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 p-4">
        <h3 className="text-lg font-semibold text-slate-900">Recent Registrations</h3>
        <div className="mt-3 space-y-2">
          {(stats?.recentRegistrations || []).map((user) => (
            <div key={user._id} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm">
              <span>{user.name}</span>
              <span className="text-slate-500">{user.email}</span>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
