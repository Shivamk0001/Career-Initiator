"use client";

import { iconMap } from "@/components/dashboard/icons";

export default function DashboardSidebar({ items, activeItem, onSelect }) {
  return (
    <aside className="sticky top-3 h-[calc(100vh-1.5rem)] w-72 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="mb-5 rounded-xl bg-blue-50 p-3">
        <p className="font-semibold text-slate-900">Career Initiator</p>
        <p className="text-xs text-slate-500">Student Dashboard</p>
      </div>

      <nav className="space-y-1 overflow-y-auto pr-1 pb-4">
        {items.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = activeItem === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onSelect(item.key)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Icon size={17} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
