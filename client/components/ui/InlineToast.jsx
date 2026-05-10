"use client";

export default function InlineToast({ type = "info", message }) {
  if (!message) return null;
  const tone =
    type === "error"
      ? "border-rose-200 bg-rose-50 text-rose-700"
      : "border-emerald-200 bg-emerald-50 text-emerald-700";
  return <div className={`rounded-lg border px-3 py-2 text-sm ${tone}`}>{message}</div>;
}
