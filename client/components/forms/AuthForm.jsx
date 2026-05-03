"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { setSession } from "@/lib/auth";

export default function AuthForm({ mode = "login" }) {
  const router = useRouter();
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const endpoint = mode === "signup" ? "/auth/signup" : "/auth/login";
      const payload = mode === "signup" ? form : { email: form.email, password: form.password };
      const data = await apiFetch(endpoint, { method: "POST", body: JSON.stringify(payload) });
      setSession(data.token, data.user);
      router.push(data.user.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="glass mx-auto mt-12 max-w-md rounded-2xl p-6">
      <h1 className="text-2xl font-bold">{mode === "signup" ? "Create Account" : "Welcome Back"}</h1>
      {mode === "signup" ? (
        <input
          className="mt-4 w-full rounded-lg border border-white/20 bg-transparent px-3 py-2"
          placeholder="Full Name"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          required
        />
      ) : null}
      <input
        className="mt-4 w-full rounded-lg border border-white/20 bg-transparent px-3 py-2"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        className="mt-4 w-full rounded-lg border border-white/20 bg-transparent px-3 py-2"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      {error ? <p className="mt-3 text-sm text-rose-300">{error}</p> : null}
      <button disabled={loading} className="mt-5 w-full rounded-lg bg-brand-500 px-4 py-2 font-medium">
        {loading ? "Please wait..." : mode === "signup" ? "Signup" : "Login"}
      </button>
    </form>
  );
}
