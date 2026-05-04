"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { clearSession, getSession } from "@/lib/auth";
import { Search, User, Mail } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaWhatsapp } from "react-icons/fa6";

const navItems = [
  ["Colleges", "/colleges"],
  ["Exams", "/exams"],
  ["Courses", "/courses"],
  ["Careers", "/careers"],
  ["Latest Updates", "/latest-updates"],
  ["More", "#"]
];

export default function Header() {
  const session = useMemo(() => getSession(), []);
  const user = session?.user;

  return (
    <header className="fixed top-0 left-0 z-50 w-full shadow-sm">
      {/* TOP BAR - Light Grey for clean separation */}
      <div className="bg-[#002147] text-slate-00 border-b border-slate-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-[11px] font-semibold  tracking-wider">
          
          {/* EMAIL */}
          <a
            href="mailto:careerinitiator1188@gmail.com"
            className="flex items-center gap-2 hover:text-rose-200 transition-colors normal-case"
          >
            <Mail size={14} className="bg-[#002147] text-white" />
            <span className="lowercase font-medium">careerinitiator1188@gmail.com</span>
          </a>

          {/* SOCIAL LINKS */}
          <div className="hidden sm:flex items-center gap-5">
            <span className="hidden lg:inline text-slate-400 lowercase italic tracking-tight">
              Follow us:
            </span>

            <div className="flex gap-4 items-center text-slate-500">
              <Link href="https://www.facebook.com/profile.php?id=61582953866454" target="_blank">
                <FaFacebook className="hover:text-[#255fab] transition-all hover:scale-110 text-sm" />
              </Link>
              <Link href="https://www.instagram.com/careerinitiator.in?igsh=eDNxdHpiOG5jYXR6" target="_blank">
                <FaInstagram className="hover:text-[#E4405F] transition-all hover:scale-110 text-sm" />
              </Link>
              <Link href="https://linkedin.com" target="_blank">
                <FaLinkedin className="hover:text-[#77a4d2] transition-all hover:scale-110 text-sm" />
              </Link>
              <Link href="https://wa.me/917987081188" target="_blank">
                <FaWhatsapp className="hover:text-[#25D366] transition-all hover:scale-110 text-base" />
              </Link>
              <Link href="https://youtube.com/@careerinitiator?si=kxLr6jRkc2tn3Wy8" target="_blank">
                <FaYoutube className="hover:text-[#FF0000] transition-all hover:scale-110 text-sm" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN HEADER - Pure White for Logo Visibility */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-00">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">

          {/* LOGO - Increased width for better impact */}
          <Link href="/" className="flex items-center transition-transform duration-300 hover:scale-[1.02]">
            <Image
              src="/logo.png"
              alt="Career Initiator"
              width={220}
              height={60}
              className="object-contain"
              priority
            />
          </Link>

         {/* NAVIGATION - Slate Grey text for a professional look */}
<nav className="hidden lg:flex items-center gap-8">
  {navItems.map(([label, href]) => (
    <Link
      key={label}
      href={href}
      className="relative text-[13px] font-bold uppercase tracking-tight text-slate-900 hover:text-orange-500 transition-colors group"
    >
      {label}
      {/* Bottom line animation - Orange color */}
      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
    </Link>
  ))}
</nav>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4">

            {/* SEARCH */}
            <button className="p-2 text-slate-900 hover:text-cyan-600 hover:bg-slate-50 rounded-full transition-all">
              <Search size={20} />
            </button>

            <div className="h-6 w-[1px] bg-slate-200 mx-1"></div>

            {!user ? (
              <Link
                href="/login"
                className="bg-[#002147] hover:bg-[#003366] text-white px-7 py-2 rounded-full text-[12px] font-bold uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-blue-900/20"
                // className="bg-cyan-600 hover:bg-cyan-700 text-white px-7 py-2 rounded-full text-[12px] font-bold uppercase tracking-widest transition-all active:scale-95 shadow-md shadow-cyan-100"
              >
                Login
              </Link>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href={user.role === "admin" ? "/admin" : "/dashboard"}
                  className="bg-slate-50 border border-slate-200 px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-white hover:border-cyan-400 transition-all text-slate-700"
                >
                  {user.fullName?.split(" ")[0]}
                </Link>

                <button
                  className="text-[10px] font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest"
                  onClick={() => {
                    clearSession();
                    window.location.href = "/";
                  }}
                >
                  Logout
                </button>
              </div>
            )}

            {/* PROFILE ICON */}
            <button className="p-2 bg-slate-50 text-slate-600 rounded-full border border-slate-200 hover:border-cyan-500 hover:text-cyan-600 transition-all shadow-sm">
              <User size={18} />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}