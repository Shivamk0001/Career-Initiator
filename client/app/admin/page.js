"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { getSession } from "@/lib/auth";

const resources = ["colleges", "courses", "exams", "careers", "blogs"];

export default function AdminPage() {
  const [stats, setStats] = useState(null);
  const [resource, setResource] = useState("colleges");
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  async function loadAll(current = resource) {
    const [statsRes, itemsRes] = await Promise.all([apiFetch("/admin/stats"), apiFetch(`/${current}`)]);
    setStats(statsRes);
    setItems(itemsRes);
  }

  useEffect(() => {
    const session = getSession();
    if (!session?.token || session.user?.role !== "admin") {
      window.location.href = "/login";
      return;
    }
    loadAll();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    await apiFetch(`/admin/${resource}`, {
      method: "POST",
      body: JSON.stringify({ name, title: name, description, content: description })
    });
    setName("");
    setDescription("");
    loadAll(resource);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold">Admin Panel</h1>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <div className="glass rounded-xl p-4">Users: {stats?.users ?? "-"}</div>
        <div className="glass rounded-xl p-4">Colleges: {stats?.colleges ?? "-"}</div>
        <div className="glass rounded-xl p-4">Blogs: {stats?.blogs ?? "-"}</div>
      </div>

      <div className="mt-6 flex gap-2">
        {resources.map((r) => (
          <button
            key={r}
            className={`rounded px-3 py-1.5 ${resource === r ? "bg-brand-500" : "glass"}`}
            onClick={() => {
              setResource(r);
              loadAll(r);
            }}
          >
            {r}
          </button>
        ))}
      </div>

      <form className="glass mt-6 rounded-2xl p-4" onSubmit={handleCreate}>
        <h2 className="mb-3 text-lg font-semibold">Add New {resource.slice(0, -1)}</h2>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-3 w-full rounded border border-white/20 bg-transparent px-3 py-2"
          placeholder="Title / Name"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-3 min-h-28 w-full rounded border border-white/20 bg-transparent px-3 py-2"
          placeholder="Description"
          required
        />
        <button className="rounded bg-brand-500 px-4 py-2">Create</button>
      </form>

      <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article key={item._id} className="glass rounded-xl p-4">
            <h3 className="font-semibold">{item.name || item.title}</h3>
            <p className="mt-2 line-clamp-3 text-sm text-slate-300">{item.description || item.excerpt || item.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
