"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import CourseFilters from "@/components/courses/CourseFilters";

export default function CourseFilterDrawer({ open, onClose, filters, onToggle, onClearAll, onFeeRange, onRatingMin }) {
  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
            aria-label="Close filters"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed inset-y-0 left-0 z-50 w-[min(92vw,400px)] overflow-y-auto border-r border-slate-200 bg-slate-50 p-4 shadow-2xl lg:hidden"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-900">Filters</span>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 text-slate-600 hover:bg-white"
                aria-label="Close filters"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <CourseFilters
              filters={filters}
              onToggle={onToggle}
              onClearAll={onClearAll}
              onFeeRange={onFeeRange}
              onRatingMin={onRatingMin}
              className="!static !max-h-none shadow-none"
            />
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
