"use client";

import AdminShell from "@/app/admin/components/AdminShell";

export default function AdminSettingsPage() {
  return (
    <AdminShell title="Settings" subtitle="Admin settings and controls">
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm text-slate-700">
          Role management and block/unblock controls are available directly from the Users page to keep moderation workflows fast.
        </p>
      </div>
    </AdminShell>
  );
}
