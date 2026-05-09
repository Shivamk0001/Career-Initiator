"use client";

const TOKEN_KEY = "ci_token";
const USER_KEY = "ci_user";

function parseCookies() {
  if (typeof document === "undefined") return {};
  return document.cookie.split(";").reduce((acc, item) => {
    const [key, ...rest] = item.trim().split("=");
    if (!key) return acc;
    acc[key] = decodeURIComponent(rest.join("=") || "");
    return acc;
  }, {});
}

export function getSession() {
  if (typeof window === "undefined") {
    return { token: null, user: null };
  }

  const token = localStorage.getItem(TOKEN_KEY) || parseCookies().ci_token || null;
  const rawUser = localStorage.getItem(USER_KEY) || parseCookies().ci_user || null;
  let user = null;

  try {
    user = rawUser ? JSON.parse(rawUser) : null;
  } catch {
    localStorage.removeItem(USER_KEY);
    user = null;
  }

  return { token, user };
}

export function setSession(token, user) {
  const serializedUser = JSON.stringify(user || {});
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, serializedUser);
  document.cookie = `ci_token=${encodeURIComponent(token)}; path=/; max-age=604800; samesite=lax`;
  document.cookie = `ci_user=${encodeURIComponent(serializedUser)}; path=/; max-age=604800; samesite=lax`;
  window.dispatchEvent(new Event("ci-auth-changed"));
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  document.cookie = "ci_token=; path=/; max-age=0; samesite=lax";
  document.cookie = "ci_user=; path=/; max-age=0; samesite=lax";
  window.dispatchEvent(new Event("ci-auth-changed"));
}
