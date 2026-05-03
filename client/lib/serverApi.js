const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function getResource(resource) {
  try {
    const res = await fetch(`${API_URL}/${resource}`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    return [];
  }
}

export async function getResourceBySlug(resource, slug) {
  try {
    const res = await fetch(`${API_URL}/${resource}/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}
