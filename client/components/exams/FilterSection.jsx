"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Collapsible filter group with height animation (accordion-style).
 */
export default function FilterSection({ title, children, defaultOpen = true, className = "" }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`overflow-hidden rounded-xl border border-slate-200/90 bg-white/90 shadow-sm ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full list-none items-center justify-between gap-2 px-3 py-2.5 text-left text-sm font-semibold text-slate-800 transition hover:bg-slate-50/80"
        aria-expanded={open}
      >
        {title}
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-slate-100"
          >
            <div className="px-3 pb-3 pt-2">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
