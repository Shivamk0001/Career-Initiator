"use client";

import { Bell, ChevronDown, Menu, Search } from "lucide-react";

export default function DashboardTopbar({
  user,
  onToggleSidebar,
  search,
  onSearchChange,
  dropdownOpen,
  onToggleDropdown,
  onDropdownAction
}) {
  return (
    <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onToggleSidebar} className="rounded-lg border border-slate-200 p-2 lg:hidden">
            <Menu size={18} />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-slate-900">Welcome, {(user?.name || "Student").split(" ")[0]}</h1>
            <p className="text-sm text-slate-500">Keep learning and track your progress.</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <label className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700">
            <Search size={16} />
            <input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search courses, colleges, exams"
              className="w-48 bg-transparent outline-none placeholder:text-slate-400"
            />
          </label>
          <button type="button" className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50">
            <Bell size={16} />
          </button>
          <div className="relative">
            <button
              type="button"
              onClick={onToggleDropdown}
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-blue-100 font-semibold text-blue-700">
                {(user?.name || "U").slice(0, 1).toUpperCase()}
              </span>
              <span className="hidden sm:block">{user?.email || "student@careerinitiator.in"}</span>
              <ChevronDown size={16} />
            </button>
            {dropdownOpen ? (
              <div className="absolute right-0 z-20 mt-2 w-44 rounded-lg border border-slate-200 bg-white p-1 text-sm text-slate-700 shadow-lg">
                {["My Profile", "Edit Profile", "Settings", "Logout"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => onDropdownAction(item)}
                    className="w-full rounded-md px-3 py-2 text-left hover:bg-slate-100"
                  >
                    {item}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
