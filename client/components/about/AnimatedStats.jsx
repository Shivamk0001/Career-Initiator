"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

/**
 * @param {{ end: number; suffix: string; duration?: number }} props
 */
function StatFigure({ end, suffix, duration = 1.25 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, end, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v))
    });
    return () => controls.stop();
  }, [inView, end, duration]);

  return (
    <span ref={ref} className="tabular-nums" aria-live="polite">
      {display}
      {suffix}
    </span>
  );
}

export default function AnimatedStats({ stats }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s, i) => (
        <div
          key={s.id}
          className="rounded-2xl border border-slate-200/90 bg-white p-6 text-center shadow-[0_8px_30px_rgba(0,33,71,0.06)] ring-1 ring-slate-100/80 transition hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(0,33,71,0.1)]"
          style={{ transitionDelay: `${i * 40}ms` }}
        >
          <p className="text-2xl font-bold text-[#002147] sm:text-3xl">
            <StatFigure end={s.end} suffix={s.suffix} duration={s.duration} />
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-800">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
