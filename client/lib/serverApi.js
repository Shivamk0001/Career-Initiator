/**
 * Server-only helpers for Next.js App Router pages.
 * Fetches public resources from the Express API (`/api/:resource`).
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function safeJson(res) {
  const type = res.headers.get("content-type") || "";
  if (!type.includes("application/json")) return null;
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export async function getResource(resource) {
  try {
    const res = await fetch(`${API_URL}/${resource}`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await safeJson(res);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function getResourceBySlug(resource, slug) {
  try {
    const res = await fetch(`${API_URL}/${resource}/${encodeURIComponent(slug)}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await safeJson(res);
  } catch {
    return null;
  }
}
