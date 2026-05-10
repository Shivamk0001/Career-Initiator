"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa6";

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin") || pathname?.startsWith("/profile")) {
    return null;
  }

  return (
    // Removed mt-16 to fix the black gap issue
    <footer className="bg-[#002147] text-white border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-14">
        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {/* TOP CAREER */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Top Career</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>Engineering</li>
              <li>Data Science & AI</li>
              <li>Business Management</li>
              <li>Government Jobs</li>
              <li>Medical / Doctor</li>
              <li>Software Developer</li>
              <li>Chartered Accountant</li>
              <li>Law / Advocate</li>
            </ul>
          </div>

          {/* TOP COURSES */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Top Courses</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>B.Tech</li>
              <li>MBA</li>
              <li>MCA</li>
              <li>Artificial Intelligence</li>
              <li>BCA</li>
              <li>Data Science</li>
              <li>CA</li>
              <li>M.Tech</li>
            </ul>
          </div>

          {/* HELP & SUPPORT */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Help & Support</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>24/7 Live Help</li>
              <li>Feedback</li>
              <li>Student Support</li>
              <li>Contact Us</li>
              <li>FAQs</li>
            </ul>
          </div>

          {/* GET IN TOUCH */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Get in Touch</h3>
            <div className="text-sm text-white/70 space-y-2">
              <p>Bhopal, India</p>
              <p>Phone: +91 7987081188</p>
              <p>Email: careerinitiator1188@gmail.com</p>
            </div>

            {/* SOCIAL (Branding Colors on Hover) */}
            <div className="flex gap-4 mt-6 text-2xl">
              <a href="https://www.facebook.com/profile.php?id=61582953866454" target="_blank">
                <FaFacebook className="hover:text-blue-500 transition duration-200" />
              </a>
              <a href="https://www.instagram.com/careerinitiator.in?igsh=eDNxdHpiOG5jYXR6" target="_blank">
                <FaInstagram className="hover:text-pink-500 transition duration-200" />
              </a>
              <a href="https://linkedin.com" target="_blank">
                <FaLinkedin className="hover:text-blue-400 transition duration-200" />
              </a>
              <a href="https://youtube.com/@careerinitiator?si=kxLr6jRkc2tn3Wy8" target="_blank">
                <FaYoutube className="hover:text-red-500 transition duration-200" />
              </a>
              <a href="https://wa.me/917987081188" target="_blank">
                <FaWhatsapp className="hover:text-green-500 transition duration-200" />
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-14 border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-white/50">
          <p>© {new Date().getFullYear()} Career Initiator. All rights reserved.</p>
          <div className="flex gap-6 mt-3 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms</Link>
            <Link href="/contact" className="hover:text-white transition">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}