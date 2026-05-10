"use client";

import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/lib/api";
import InlineToast from "@/components/ui/InlineToast";

export default function ProfileSettingsForm({ profile, onSaved }) {
  const initialForm = useMemo(
    () => ({
      name: profile?.name || "",
      email: profile?.email || "",
      phone: profile?.phone || "",
      address: profile?.address || profile?.city || "",
      educationLevel: profile?.educationLevel || profile?.qualification || "",
      stream: profile?.stream || ""
    }),
    [profile]
  );

  const [form, setForm] = useState(initialForm);
  useEffect(() => {
    setForm(initialForm);
  }, [initialForm]);

  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ type: "info", message: "" });

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const validate = () => {
    if (!form.name.trim()) return "Name is required.";
    if (!form.email.includes("@")) return "Please enter a valid email.";
    if (form.phone && String(form.phone).trim().length < 10) return "Phone number should be at least 10 digits.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      setToast({ type: "error", message: error });
      return;
    }
    setSaving(true);
    setToast({ type: "info", message: "" });
    try {
      const payload = {
        name: form.name.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        city: form.address.trim(),
        qualification: form.educationLevel.trim(),
        educationLevel: form.educationLevel.trim(),
        stream: form.stream.trim()
      };
      const updated = await apiFetch("/users/me", {
        method: "PUT",
        body: JSON.stringify(payload)
      });
      onSaved?.(updated);
      setToast({ type: "success", message: "Profile updated successfully." });
    } catch (err) {
      setToast({
        type: "error",
        message: err instanceof Error ? err.message : "Failed to update profile."
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Profile Settings</h2>
      <p className="text-sm text-slate-500">Update your basic profile information.</p>
      <InlineToast type={toast.type === "error" ? "error" : "success"} message={toast.message} />

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-1">
          <span className="text-sm text-slate-600">Full Name</span>
          <input
            value={form.name}
            onChange={(e) => setField("name", e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
          />
        </label>
        <label className="space-y-1">
          <span className="text-sm text-slate-600">Email</span>
          <input
            value={form.email}
            disabled
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-500 outline-none"
          />
        </label>
        <label className="space-y-1">
          <span className="text-sm text-slate-600">Mobile</span>
          <input
            value={form.phone}
            onChange={(e) => setField("phone", e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
          />
        </label>
        <label className="space-y-1">
          <span className="text-sm text-slate-600">Address</span>
          <input
            value={form.address}
            onChange={(e) => setField("address", e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
          />
        </label>
        <label className="space-y-1">
          <span className="text-sm text-slate-600">Education</span>
          <input
            value={form.educationLevel}
            onChange={(e) => setField("educationLevel", e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
          />
        </label>
        <label className="space-y-1">
          <span className="text-sm text-slate-600">Career Interest</span>
          <input
            value={form.stream}
            onChange={(e) => setField("stream", e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
          />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <button type="button" disabled className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-500">
          Change Password (Coming Soon)
        </button>
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
