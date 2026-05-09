"use client";

import Link from "next/link";
import AdminShell from "@/app/admin/components/AdminShell";

export default function AdminPage() {
  return (
    <AdminShell title="Admin Home" subtitle="Use the links below to manage your platform.">
      <div className="grid gap-4 md:grid-cols-2">
        <Link href="/admin/dashboard" className="rounded-xl border border-slate-200 bg-slate-50 p-4 hover:bg-slate-100">
          <h3 className="text-lg font-semibold text-slate-900">Dashboard</h3>
          <p className="mt-1 text-sm text-slate-600">View total users, active users, blocked users and recent registrations.</p>
        </Link>
        <Link href="/admin/users" className="rounded-xl border border-slate-200 bg-slate-50 p-4 hover:bg-slate-100">
          <h3 className="text-lg font-semibold text-slate-900">Users</h3>
          <p className="mt-1 text-sm text-slate-600">Search, filter, edit, block/unblock and delete users.</p>
        </Link>
      </div>
    </AdminShell>
  );
}
