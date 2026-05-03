import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#071428] text-white mt-16 border-t border-white/10">

      <div className="mx-auto max-w-7xl px-6 py-12">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">

          {/* TOP CAREER */}
          <div>
            <h3 className="text-cyan-300 font-semibold mb-4">Top Career</h3>
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
            <h3 className="text-cyan-300 font-semibold mb-4">Top Courses</h3>
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
            <h3 className="text-cyan-300 font-semibold mb-4">Help & Support</h3>
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
            <h3 className="text-cyan-300 font-semibold mb-4">Get in Touch</h3>

            <div className="text-sm text-white/70 space-y-2">
              <p>Bhopal, India</p>
              <p>Phone: +91 7987081188</p>
              <p>Email: careerinitiator1188@gmail.com</p>
            </div>

            {/* SOCIAL */}
            <div className="flex gap-3 mt-5">
              <a href="https://www.facebook.com/profile.php?id=61582953866454" target="_blank">
                <FaFacebook className="hover:text-blue-500 transition" />
              </a>
              <a href="https://www.instagram.com/careerinitiator.in?igsh=eDNxdHpiOG5jYXR6" target="_blank">
                <FaInstagram className="hover:text-pink-500 transition" />
              </a>
              <a href="https://linkedin.com" target="_blank">
                <FaLinkedin className="hover:text-blue-400 transition" />
              </a>
              <a href="https://youtube.com/@careerinitiator?si=kxLr6jRkc2tn3Wy8" target="_blank">
                <FaYoutube className="hover:text-red-500 transition" />
              </a>
              <a href="https://wa.me/917987081188" target="_blank">
                <FaWhatsapp className="hover:text-green-500 transition" />
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-white/50">
          <p>© {new Date().getFullYear()} Career Initiator. All rights reserved.</p>

          <div className="flex gap-5 mt-3 md:mt-0">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}