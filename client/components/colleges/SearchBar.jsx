"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { POPULAR_SEARCHES } from "@/components/colleges/collegeSearchConstants";
import { fetchCollegeSearchPage } from "@/lib/collegeSearchUtils";

export default function SearchBar({
  value,
  onChange,
  onSearch,
  loading,
  popularOnly = false
}) {
  const [open, setOpen] = useState(false);
  const [suggestLoading, setSuggestLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const debounceRef = useRef(null);
  const wrapRef = useRef(null);

  const runSuggest = useCallback(async (q) => {
    const t = q.trim();
    if (t.length < 2) {
      setSuggestions([]);
      return;
    }
    setSuggestLoading(true);
    try {
      const { results } = await fetchCollegeSearchPage(t, 1);
      setSuggestions((results || []).slice(0, 8).map((r) => r.name).filter(Boolean));
    } catch {
      setSuggestions([]);
    } finally {
      setSuggestLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      runSuggest(value);
    }, 400);
    return () => clearTimeout(debounceRef.current);
  }, [value, runSuggest]);

  useEffect(() => {
    const onDoc = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const submit = (e) => {
    e.preventDefault();
    setOpen(false);
    onSearch?.(value.trim());
  };

  const pick = (text) => {
    onChange(text);
    setOpen(false);
    onSearch?.(text);
  };

  return (
    <div ref={wrapRef} className="relative w-full max-w-3xl">
      <form
        onSubmit={submit}
        className="relative flex flex-col gap-3 rounded-2xl border border-white/60 bg-white/70 p-2 shadow-xl shadow-[#002147]/10 backdrop-blur-xl sm:flex-row sm:items-center sm:p-2"
      >
        <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200/90 bg-white/90 px-4 py-3">
          <Search className="h-5 w-5 shrink-0 text-[#002147]" aria-hidden />
          <input
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder="Search colleges, courses, locations…"
            className="min-w-0 flex-1 bg-transparent text-base text-slate-900 placeholder:text-slate-400 outline-none"
            autoComplete="off"
            aria-autocomplete="list"
            aria-expanded={open}
          />
          {value ? (
            <button
              type="button"
              onClick={() => onChange("")}
              className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
          {suggestLoading ? <Loader2 className="h-4 w-4 shrink-0 animate-spin text-slate-400" /> : null}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-gradient-to-r from-[#002147] to-[#003d7a] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:from-[#003366] hover:to-[#002147] disabled:opacity-60"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Searching
            </span>
          ) : (
            "Search"
          )}
        </button>
      </form>

      <AnimatePresence>
        {open && value.trim().length >= 2 && suggestions.length > 0 ? (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full z-30 mt-2 max-h-72 overflow-auto rounded-xl border border-slate-200 bg-white py-1 shadow-xl"
            role="listbox"
          >
            {suggestions.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  className="w-full px-4 py-2.5 text-left text-sm text-slate-800 hover:bg-slate-50"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => pick(s)}
                >
                  {s}
                </button>
              </li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>

      {!popularOnly ? (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Popular:</span>
          {POPULAR_SEARCHES.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => pick(chip)}
              className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm transition hover:border-orange-400 hover:text-orange-600"
            >
              {chip}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
