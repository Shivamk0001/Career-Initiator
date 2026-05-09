const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function apiFetch(path, options = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("ci_token") : null;

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    },
    cache: "no-store"
  });

  const responseType = response.headers.get("content-type") || "";
  const isJson = responseType.includes("application/json");
  const data = isJson ? await response.json().catch(() => ({})) : {};

  if (!isJson) {
    const fallbackMessage = "Invalid API response. Check NEXT_PUBLIC_API_URL and backend routes.";
    throw new Error(data.message || fallbackMessage);
  }

  if (!response.ok) {
    if (typeof window !== "undefined" && (response.status === 401 || response.status === 403)) {
      localStorage.removeItem("ci_token");
      localStorage.removeItem("ci_user");
      document.cookie = "ci_token=; path=/; max-age=0; samesite=lax";
      document.cookie = "ci_user=; path=/; max-age=0; samesite=lax";
      window.dispatchEvent(new Event("ci-auth-changed"));
    }
    throw new Error(data.message || "Request failed");
  }
  return data;
}

export { API_URL };
