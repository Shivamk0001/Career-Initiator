"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { getSession } from "@/lib/auth";
import { Mail, Menu, Search, User, X } from "lucide-react";
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
  const pathname = usePathname();
  const [session, setSession] = useState({ token: null, user: null });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [mobileMenuOpen]);

  /* Admin uses its own shell; dashboard/profile use the global marketing header like other pages. */
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const closeMobileMenu = () => setMobileMenuOpen(false);

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
            <div className="hidden lg:flex items-center gap-4">
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

            <button
              type="button"
              className="lg:hidden rounded-lg border border-slate-200 p-2 text-slate-900 transition hover:bg-slate-50"
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={22} aria-hidden />
            </button>
          </div>

        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen ? (
          <>
            <motion.button
              type="button"
              key="mobile-overlay"
              className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-[2px] lg:hidden"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMobileMenu}
            />
            <motion.div
              key="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              className="fixed inset-y-0 right-0 z-[101] flex w-80 max-w-full flex-col bg-white shadow-2xl lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                <Link href="/" onClick={closeMobileMenu} className="relative block h-10 w-44 shrink-0">
                  <Image src="/logo.png" alt="Career Initiator" fill className="object-contain object-left" sizes="176px" />
                </Link>
                <button
                  type="button"
                  className="rounded-lg border border-slate-200 p-2 text-slate-700 transition hover:bg-slate-50"
                  aria-label="Close menu"
                  onClick={closeMobileMenu}
                >
                  <X size={22} aria-hidden />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="Primary">
                <ul className="space-y-1">
                  {navItems.map(([label, href]) => {
                    const isActive = href !== "#" && pathname === href;
                    return (
                      <li key={label}>
                        <Link
                          href={href}
                          onClick={closeMobileMenu}
                          className={`block rounded-xl px-3 py-3 text-[13px] font-bold uppercase tracking-tight transition-colors ${
                            isActive ? "bg-orange-50 text-orange-500" : "text-slate-900 hover:bg-slate-50"
                          }`}
                        >
                          {label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-6 space-y-3 border-t border-slate-100 pt-6">
                  <Link
                    href="#"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                    aria-label="Search colleges"
                  >
                    <Search size={20} className="text-slate-600" aria-hidden />
                    Search
                  </Link>

                  {!user ? (
                    <Link
                      href="/login"
                      onClick={closeMobileMenu}
                      className="flex w-full items-center justify-center rounded-xl bg-[#002147] px-4 py-3 text-center text-[12px] font-bold uppercase tracking-widest text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#003366]"
                    >
                      Login
                    </Link>
                  ) : (
                    <Link
                      href={user.role === "admin" ? "/admin" : "/dashboard"}
                      onClick={closeMobileMenu}
                      className="flex w-full items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-white"
                    >
                      {(user.name || user.fullName || "User").split(" ")[0]} — Dashboard
                    </Link>
                  )}

                  <Link
                    href={user ? "/profile" : "/login"}
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600">
                      <User size={18} aria-hidden />
                    </span>
                    Profile
                  </Link>
                </div>

                <div className="mt-8 border-t border-slate-100 pt-6">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Follow us</p>
                  <div className="mt-3 flex flex-wrap gap-3 text-xl text-slate-600">
                    <Link href={SITE_CONTACT.social.facebook} target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu} className="rounded-lg border border-slate-200 p-2 transition hover:border-[#002147]/30 hover:text-[#1877F2]" aria-label="Facebook">
                      <FaFacebook />
                    </Link>
                    <Link href={SITE_CONTACT.social.instagram} target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu} className="rounded-lg border border-slate-200 p-2 transition hover:border-[#002147]/30 hover:text-pink-600" aria-label="Instagram">
                      <FaInstagram />
                    </Link>
                    <Link href={SITE_CONTACT.social.linkedin} target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu} className="rounded-lg border border-slate-200 p-2 transition hover:border-[#002147]/30 hover:text-[#0A66C2]" aria-label="LinkedIn">
                      <FaLinkedin />
                    </Link>
                    <Link href={SITE_CONTACT.social.whatsapp} target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu} className="rounded-lg border border-slate-200 p-2 transition hover:border-[#002147]/30 hover:text-[#25D366]" aria-label="WhatsApp">
                      <FaWhatsapp />
                    </Link>
                    <Link href={SITE_CONTACT.social.youtube} target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu} className="rounded-lg border border-slate-200 p-2 transition hover:border-[#002147]/30 hover:text-red-600" aria-label="YouTube">
                      <FaYoutube />
                    </Link>
                  </div>
                </div>

                <div className="mt-8 pb-6">
                  <a
                    href={`mailto:${SITE_CONTACT.email}`}
                    className="flex items-center gap-2 rounded-xl bg-[#002147]/5 px-3 py-3 text-xs font-semibold text-[#002147] transition hover:bg-[#002147]/10"
                    onClick={closeMobileMenu}
                  >
                    <Mail size={16} className="shrink-0" aria-hidden />
                    <span className="break-all lowercase">{SITE_CONTACT.email}</span>
                  </a>
                </div>
              </nav>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
