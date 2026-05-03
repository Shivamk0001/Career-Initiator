"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { getSession } from "@/lib/auth";

export default function DashboardPage() {
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const session = getSession();
    if (!session?.token) {
      window.location.href = "/login";
      return;
    }
    apiFetch("/users/me")
      .then(setProfile)
      .catch(() => {
        window.location.href = "/login";
      });
  }, []);

  async function handleUpdate(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await apiFetch("/users/me", {
      method: "PUT",
      body: JSON.stringify({
        fullName: formData.get("fullName"),
        phone: formData.get("phone"),
        city: formData.get("city")
      })
    });
    setMessage("Profile updated");
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold">Student Dashboard</h1>
      <form onSubmit={handleUpdate} className="glass mt-6 rounded-2xl p-6">
        <input name="fullName" defaultValue={profile?.fullName || ""} className="mb-3 w-full rounded border border-white/20 bg-transparent px-3 py-2" />
        <input name="phone" defaultValue={profile?.phone || ""} placeholder="Phone" className="mb-3 w-full rounded border border-white/20 bg-transparent px-3 py-2" />
        <input name="city" defaultValue={profile?.city || ""} placeholder="City" className="mb-3 w-full rounded border border-white/20 bg-transparent px-3 py-2" />
        <button className="rounded bg-brand-500 px-4 py-2">Save</button>
        {message ? <p className="mt-3 text-emerald-300">{message}</p> : null}
      </form>
    </section>
  );
}
