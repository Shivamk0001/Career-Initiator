"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { clearSession, getSession } from "@/lib/auth";
import { Search, User } from "lucide-react";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";
const navItems = [
  ["Colleges", "/colleges"],
  ["Exam", "/exams"],
  ["Courses", "/courses"],
  ["Careers", "/careers"],
  ["Latest Updates", "/latest-updates"],
  ["More", "#"]
];

export default function Header() {
  const session = useMemo(() => getSession(), []);
  const user = session?.user;

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-gradient-to-r from-[#050b2c] via-[#070d3a] to-[#050b2c] text-white shadow-lg">

      {/* TOP BAR */}
      <div className="flex items-center justify-between px-6 py-2 text-xs border-b border-white/10">
        <div className="flex items-center gap-2">
          <span>careerinitiator1188@gmail.com</span>
        </div>

        <div className="flex items-center gap-4">
  <span className="text-white/80">We’re on your favourite socials!</span>

  <div className="flex gap-3 text-white">
    <Facebook className="w-5 h-5 cursor-pointer hover:text-blue-500" />
    <Instagram className="w-5 h-5 cursor-pointer hover:text-pink-500" />
    <Linkedin className="w-5 h-5 cursor-pointer hover:text-blue-400" />
    <Twitter className="w-5 h-5 cursor-pointer hover:text-sky-400" />
    <Youtube className="w-5 h-5 cursor-pointer hover:text-red-500" />
  </div>
</div>
      </div>

      {/* MAIN HEADER */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">

        {/* LOGO (IMAGE) */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Career Initiator"
            width={160}
            height={50}
            className="object-contain"
          />
        </Link>

        {/* NAVIGATION */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {navItems.map(([label, href]) => (
            <motion.div key={label} whileHover={{ y: -2 }}>
              <Link
                href={href}
                className="text-white/80 hover:text-cyan-300 transition"
              >
                {label}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full hover:bg-white/10">
            <Search size={18} />
          </button>

          {!user ? (
            <Link
              href="/login"
              className="rounded-lg border border-white/20 px-4 py-1.5 text-sm hover:bg-white/10"
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                href={user.role === "admin" ? "/admin" : "/dashboard"}
                className="rounded-lg border border-cyan-400/40 px-3 py-1.5 text-sm"
              >
                {user.fullName?.split(" ")[0]}
              </Link>

              <button
                className="rounded-lg border border-white/20 px-3 py-1.5 text-sm"
                onClick={() => {
                  clearSession();
                  window.location.href = "/";
                }}
              >
                Logout
              </button>
            </>
          )}

          <button className="p-2 rounded-full hover:bg-white/10">
            <User size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}