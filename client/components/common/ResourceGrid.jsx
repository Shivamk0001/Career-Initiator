"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ResourceGrid({ items = [], titleKey = "name", basePath = "/" }) {
  if (!items.length) {
    return <p className="text-slate-300">No results found.</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <motion.div key={item._id} whileHover={{ y: -5 }} className="glass rounded-2xl p-5">
          <h3 className="text-lg font-semibold">{item[titleKey]}</h3>
          {item.location ? <p className="mt-1 text-sm text-slate-300">{item.location}</p> : null}
          {item.description ? (
            <p className="mt-3 line-clamp-3 text-sm text-slate-300">{item.description}</p>
          ) : null}
          <Link href={`${basePath}/${item.slug}`} className="mt-4 inline-block text-sm text-cyan-300">
            View Details →
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
