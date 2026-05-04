"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  User,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  MessageSquare,
} from "lucide-react";

export default function LeadFormHome() {
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");

    setTimeout(() => {
      setStatus("sent");
    }, 1200);
  }

  return (
    <section className="px-4 py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-4xl">

        {/* CARD */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-white border border-gray-200 shadow-lg p-8 md:p-14"
        >

          {/* HEADER */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-black">
              Take the first step towards{" "}
              <span className="text-[#f26838]">career clarity</span>
            </h2>

            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Share your details and our experts will guide you with proper career direction,
              exams, and planning.
            </p>
          </div>

          {/* SUCCESS STATE */}
          <AnimatePresence mode="wait">
            {status === "sent" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-10"
              >
                <div className="h-20 w-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                  <CheckCircle2 size={40} />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-black">
                  Query Received
                </h3>

                <p className="mt-2 text-gray-600 max-w-sm">
                  Our team will contact you within 24 hours.
                </p>

                <Link
                  href="/contact"
                  className="mt-6 text-[#f26838] font-semibold underline"
                >
                  Need urgent help? Contact us
                </Link>
              </motion.div>
            ) : (

              /* FORM */
              <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">

                <Input label="Full Name" icon={<User />} placeholder="Your name" />
                <Input label="Phone Number" icon={<Phone />} placeholder="+91 XXXXX XXXXX" />
                <Input label="Email" icon={<Mail />} placeholder="email@example.com" />
                <Input label="City" icon={<MapPin />} placeholder="Your city" />

                {/* STAGE */}
                <div className="md:col-span-2 space-y-2">
                  <Label icon={<GraduationCap />} text="Career Stage" />
                  <select className="w-full rounded-xl border border-gray-300 bg-white px-5 py-4 text-black outline-none focus:border-[#f26838] focus:ring-2 focus:ring-orange-100">
                    <option>Select your stage</option>
                    <option>Class 8–10</option>
                    <option>Class 11–12</option>
                    <option>Graduate</option>
                    <option>Professional</option>
                    <option>Parent</option>
                  </select>
                </div>

                {/* MESSAGE */}
                <div className="md:col-span-2 space-y-2">
                  <Label icon={<MessageSquare />} text="Your Query" />
                  <textarea
                    rows={4}
                    placeholder="Tell us about your career doubts..."
                    className="w-full rounded-xl border border-gray-300 bg-white px-5 py-4 text-black outline-none focus:border-[#f26838] focus:ring-2 focus:ring-orange-100 resize-none"
                  />
                </div>

                {/* BUTTON */}
                <div className="md:col-span-2 pt-2">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full rounded-xl bg-[#002147] text-white py-4 font-bold uppercase tracking-widest hover:bg-[#00172f] transition"
                  >
                    {status === "submitting" ? "Sending..." : "Submit Query"}
                  </button>
                </div>

              </form>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </section>
  );
}

/* ================= UI COMPONENTS ================= */

function Input({ label, icon, placeholder }) {
  return (
    <div className="space-y-2">
      <Label icon={icon} text={label} />
      <input
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-300 bg-white px-5 py-4 text-black outline-none focus:border-[#f26838] focus:ring-2 focus:ring-orange-100"
      />
    </div>
  );
}

function Label({ icon, text }) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
      <span className="text-[#f26838]">{icon}</span>
      {text}
    </label>
  );
}