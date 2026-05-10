"use client";

import { motion } from "framer-motion";

export default function SectionCard({ title, description, children, action }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          {description ? <p className="text-sm text-slate-500">{description}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </motion.section>
  );
}
