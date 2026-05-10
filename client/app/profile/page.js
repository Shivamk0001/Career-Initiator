"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { getSession } from "@/lib/auth";
import ProfileSettingsForm from "@/components/profile/ProfileSettingsForm";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = getSession();
    if (!session?.token) {
      router.replace("/login");
      return;
    }
    apiFetch("/users/me")
      .then((data) => setProfile(data))
      .catch(() => router.replace("/login"))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-6">
        <div className="mx-auto max-w-4xl animate-pulse space-y-3">
          <div className="h-10 rounded-lg bg-slate-200" />
          <div className="h-64 rounded-2xl bg-slate-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6">
      <div className="mx-auto max-w-4xl space-y-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">My Profile</h1>
          <p className="text-sm text-slate-500">Manage your profile details and keep your information up to date.</p>
        </div>
        <ProfileSettingsForm profile={profile} onSaved={setProfile} />
      </div>
    </div>
  );
}
