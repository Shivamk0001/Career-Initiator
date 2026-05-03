"use client";

export function getSession() {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem("ci_token");
  const rawUser = localStorage.getItem("ci_user");
  return { token, user: rawUser ? JSON.parse(rawUser) : null };
}

export function setSession(token, user) {
  localStorage.setItem("ci_token", token);
  localStorage.setItem("ci_user", JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem("ci_token");
  localStorage.removeItem("ci_user");
}
