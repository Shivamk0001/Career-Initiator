"use client";

import { useState } from "react";
import Link from "react-router-dom"; // Ya 'next/link' agar Next.js use kar rahe ho
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, User, Phone, Mail, MapPin, GraduationCap, MessageSquare } from "lucide-react";

export default function LeadFormHome() {
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    
    // Simulating API call
    setTimeout(() => {
      setStatus("sent");
    }, 1500);
  }

  return (
    <section id="get-started" className="relative scroll-mt-28 px-4 py-24 md:py-32 overflow-hidden bg-[#05070a]">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="mx-auto max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl md:p-14 shadow-2xl"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Take the first step towards <span className="text-cyan-400">career clarity</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400">
              Share your details and our expert team will guide you on assessments, 
              counselling, and the right next steps for your career stage.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {status === "sent" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-2xl font-bold text-white">Query Received!</h3>
                <p className="mt-2 max-w-sm text-slate-400">
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
                <Link 
                  to="/contact" 
                  className="mt-8 font-semibold text-cyan-400 hover:text-cyan-300 transition-colors underline underline-offset-4"
                >
                  Need urgent help? Contact us directly
                </Link>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-300 ml-1">
                    <User size={14} className="text-cyan-400" /> Full Name
                  </label>
                  <input
                    required
                    name="name"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-slate-600 outline-none transition-all focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10"
                    placeholder="Shivam Rajput"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-300 ml-1">
                    <Phone size={14} className="text-cyan-400" /> Phone Number
                  </label>
                  <input
                    required
                    name="phone"
                    type="tel"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-slate-600 outline-none transition-all focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10"
                    placeholder="+91 00000 00000"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-300 ml-1">
                    <Mail size={14} className="text-cyan-400" /> Email Address
                  </label>
                  <input
                    required
                    name="email"
                    type="email"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-slate-600 outline-none transition-all focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10"
                    placeholder="shivam@example.com"
                  />
                </div>

                {/* City */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-300 ml-1">
                    <MapPin size={14} className="text-cyan-400" /> City
                  </label>
                  <input
                    required
                    name="city"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-slate-600 outline-none transition-all focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10"
                    placeholder="Enter your city"
                  />
                </div>

                {/* Stage Selection */}
                <div className="md:col-span-2 space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-300 ml-1">
                    <GraduationCap size={14} className="text-cyan-400" /> Current Career Stage
                  </label>
                  <select
                    name="stage"
                    className="w-full rounded-2xl border border-white/10 bg-[#0a0c10] px-5 py-4 text-white outline-none transition-all focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 appearance-none cursor-pointer"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>Select your current stage</option>
                    <option value="class-8-10">Class 8–10 Student</option>
                    <option value="class-11-12">Class 11–12 Student</option>
                    <option value="undergraduate">Undergraduate Student</option>
                    <option value="postgraduate">Postgraduate / Professional</option>
                    <option value="parent">Parent / Guardian</option>
                  </select>
                </div>

                {/* Query Textarea */}
                <div className="md:col-span-2 space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-300 ml-1">
                    <MessageSquare size={14} className="text-cyan-400" /> How can we help?
                  </label>
                  <textarea
                    name="query"
                    rows={4}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-slate-600 outline-none transition-all focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 resize-none"
                    placeholder="Mention any specific career path or exam you need help with..."
                  />
                </div>

                <div className="md:col-span-2 pt-4">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group relative w-full overflow-hidden rounded-2xl bg-cyan-600 py-5 text-sm font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-cyan-500 active:scale-[0.98] disabled:opacity-70"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {status === "submitting" ? (
                        "Sending..."
                      ) : (
                        <>
                          Submit Query <Send size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </>
                      )}
                    </span>
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