"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { clearSession, getSession } from "@/lib/auth";
import { Search, User, Mail } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaWhatsapp } from "react-icons/fa6";
import { SITE_CONTACT } from "@/lib/siteContact";

const navItems = [
  ["Careers", "/careers"],
  ["Courses", "/courses"],
  ["Exams", "/exams"],
  ["Colleges", "/colleges"],
  ["Latest Updates", "/latest-updates"],
  ["About", "/about"],
  ["More", "/more"]
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState({ token: null, user: null });
  const user = session.user;

  useEffect(() => {
    const syncSession = () => {
      setSession(getSession());
    };

    syncSession();
    window.addEventListener("storage", syncSession);
    window.addEventListener("focus", syncSession);
    window.addEventListener("ci-auth-changed", syncSession);

    return () => {
      window.removeEventListener("storage", syncSession);
      window.removeEventListener("focus", syncSession);
      window.removeEventListener("ci-auth-changed", syncSession);
    };
  }, []);

  if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin") || pathname?.startsWith("/profile")) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 z-50 w-full shadow-sm">
      {/* TOP BAR - Light Grey for clean separation */}
      <div className="bg-[#002147] text-slate-00 border-b border-slate-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-[11px] font-semibold  tracking-wider">
          
          {/* EMAIL */}
          <a
            href={`mailto:${SITE_CONTACT.email}`}
            className="flex items-center gap-2 hover:text-rose-200 transition-colors normal-case"
          >
            <Mail size={14} className="bg-[#002147] text-white" />
            <span className="lowercase font-medium">{SITE_CONTACT.email}</span>
          </a>

          {/* SOCIAL LINKS */}
          <div className="hidden sm:flex items-center gap-5">
            <span className="hidden lg:inline text-slate-400 lowercase italic tracking-tight">
              Follow us:
            </span>

            <div className="flex gap-4 items-center text-slate-500">
              <Link href={SITE_CONTACT.social.facebook} target="_blank" rel="noopener noreferrer">
                <FaFacebook className="hover:text-[#255fab] transition-all hover:scale-110 text-sm" />
              </Link>
              <Link href={SITE_CONTACT.social.instagram} target="_blank" rel="noopener noreferrer">
                <FaInstagram className="hover:text-[#E4405F] transition-all hover:scale-110 text-sm" />
              </Link>
              <Link href={SITE_CONTACT.social.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="hover:text-[#77a4d2] transition-all hover:scale-110 text-sm" />
              </Link>
              <Link href={SITE_CONTACT.social.whatsapp} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="hover:text-[#25D366] transition-all hover:scale-110 text-base" />
              </Link>
              <Link href={SITE_CONTACT.social.youtube} target="_blank" rel="noopener noreferrer">
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
  {navItems.map(([label, href]) => {
    const isActive = href !== "#" && pathname === href;
    return (
      <Link
        key={label}
        href={href}
        className={`relative text-[13px] font-bold uppercase tracking-tight transition-colors group ${
          isActive ? "text-orange-500" : "text-slate-900 hover:text-orange-500"
        }`}
      >
        {label}
        <span
          className={`absolute -bottom-1 left-0 h-[2px] bg-orange-500 transition-all duration-300 ${
            isActive ? "w-full" : "w-0 group-hover:w-full"
          }`}
        />
      </Link>
    );
  })}
</nav>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4">

            {/* SEARCH — jump to college discovery */}
            <Link
              href="#"
              className="p-2 text-slate-900 hover:text-cyan-600 hover:bg-slate-50 rounded-full transition-all"
              aria-label="Search colleges"
            >
              <Search size={20} />
            </Link>

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
                  href={user.role === "admin" ? "/admin" : "/"}
                  className="bg-slate-50 border border-slate-200 px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-white hover:border-cyan-400 transition-all text-slate-700"
                >
                  {(user.name || user.fullName || "User").split(" ")[0]}
                </Link>

                {/* <button
                  className="text-[10px] font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest"
                  onClick={() => {
                    clearSession();
                    router.push("/login");
                    router.refresh();
                  }}
                >
                  Logout
                </button> */}
              </div>
            )}

            {/* PROFILE ICON */}
            <Link
              href={user ? "/dashboard" : "/login"}
              className="p-2 bg-slate-50 text-slate-600 rounded-full border border-slate-200 hover:border-cyan-500 hover:text-cyan-600 transition-all shadow-sm"
            >
              <User size={18} />
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}