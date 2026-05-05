"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, X, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { setSession } from "@/lib/auth";

export default function AuthForm({ mode: initialMode = "login", onClose }) {
  const [mode, setMode] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    stream: "",
    level: "",
    password: "",
    address: "",
  });

  const handleChange = (e) => {
    setError("");
    setSuccess("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    if (!form.email.includes("@")) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (mode !== "forget" && form.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    if (mode === "signup") {
      if (!form.fullName || !form.phone || !form.stream || !form.level) {
        setError("All profile fields are required.");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      if (mode === "forget") {
        setError("Password reset flow is not configured yet.");
        setIsLoading(false); // Stop loading if checked here
        return;
      }

      // 1. 🌟 BACKEND SERVER URL APNE ENDPOINTS ME ADD KAREIN
      const endpoint =
        mode === "signup"
          ? "http://localhost:5000/api/auth/signup"
          : "http://localhost:5000/api/auth/login";

      const payload =
        mode === "signup"
          ? form
          : {
              email: form.email,
              password: form.password,
            };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      
      // 2. 🌟 !data.success WALI CONDITION KO HATA DIJIYE, KYUKI BACKEND SE APAN SIDA STATUS CODE CONTROL KAR RHE HAIN
      if (!response.ok) {
        throw new Error(data.message || "Authentication failed.");
      }

      if (mode === "login" && data.token) {
        setSession(data.token, data.user);
        localStorage.setItem("ci_auth_ready", "true");
      }

      setSuccess(data.message || "Success!");

      if (onClose) {
        setTimeout(() => onClose(), 500);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all duration-200";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-gray-100 to-blue-50/30 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 15 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-full max-w-md rounded-2xl bg-white border border-gray-100 p-8 shadow-2xl shadow-gray-200/80 backdrop-blur-sm"
      >
        {/* CLOSE BUTTON */}
        {onClose && (
          <button
            onClick={onClose}
            type="button"
            className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X size={16} />
          </button>
        )}

        {/* BRAND LOGO & HEADER */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 p-0.5 shadow-lg shadow-blue-500/20 mb-3">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center relative overflow-hidden">
              <Image
                src="/logo1.png"
                alt="logo"
                width={36}
                height={36}
                className="object-contain"
                priority
              />
            </div>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Career Initiator
          </h1>
          <p className="text-xs font-medium tracking-wide text-blue-600 uppercase mt-0.5">
            Guiding Right Career Choices
          </p>
        </div>

        {/* DYNAMIC TITLE */}
        <h2 className="text-base font-semibold text-gray-800 mb-5">
          {mode === "signup"
            ? "Create your account"
            : mode === "forget"
            ? "Reset your password"
            : "Sign in to platform"}
        </h2>

        {/* ERROR MESSAGE CONTAINER */}
        <AnimatePresence mode="popLayout">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 px-3 py-2.5 rounded-lg bg-red-50 border border-red-100 text-xs text-red-600 font-medium"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="popLayout">
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 px-3 py-2.5 rounded-lg bg-emerald-50 border border-emerald-100 text-xs text-emerald-700 font-medium"
            >
              {success}
            </motion.div>
          )}
        </AnimatePresence>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* EXPANDABLE SIGNUP FIELDS */}
          <div className="overflow-hidden">
            <AnimatePresence initial={false} mode="sync">
              {mode === "signup" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3"
                >
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      value={form.fullName}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>
                  
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />

                  <select
                    name="stream"
                    value={form.stream}
                    onChange={(e) => handleSelectChange("stream", e.target.value)}
                    className={`${inputClass} appearance-none bg-none`}
                    required
                  >
                    <option value="" disabled hidden>Select Stream</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Management">Management</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Arts">Arts</option>
                  </select>

                  <select
                    name="level"
                    value={form.level}
                    onChange={(e) => handleSelectChange("level", e.target.value)}
                    className={`${inputClass} sm:col-span-2 appearance-none bg-none`}
                    required
                  >
                    <option value="" disabled hidden>Current Level of Education</option>
                    <option value="High School">High School (10th/12th)</option>
                    <option value="Undergraduate">Undergraduate (UG)</option>
                    <option value="Postgraduate">Postgraduate (PG)</option>
                  </select>

                  <textarea
                    name="address"
                    placeholder="Address details..."
                    value={form.address}
                    onChange={handleChange}
                    className={`${inputClass} sm:col-span-2 h-20 resize-none`}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* BASE EMAIL FIELD */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* BASE PASSWORD FIELD */}
          {mode !== "forget" && (
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className={inputClass}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3.5 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full relative flex items-center justify-center bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 text-white py-2.5 rounded-lg text-sm font-medium transition-all duration-200 shadow-md shadow-blue-500/10 active:scale-[0.99]"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <span className="flex items-center gap-1.5">
                {mode === "signup" ? "Create Account" : mode === "forget" ? "Send Reset Link" : "Sign In"}
                <ArrowRight size={14} />
              </span>
            )}
          </button>
        </form>

        {/* FOOTER NAVIGATIONS */}
        <div className="mt-5 pt-4 border-t border-gray-100 flex flex-col items-center justify-center gap-2 text-xs text-gray-500">
          {mode === "login" && (
            <button
              type="button"
              onClick={() => { setMode("forget"); setError(""); }}
              className="text-blue-600 hover:underline font-medium"
            >
              Forgot Password?
            </button>
          )}

          <p>
            {mode === "signup" ? "Already have an account?" : "New to the platform?"}{" "}
            <button
              type="button"
              onClick={() => {
                setMode(mode === "signup" ? "login" : "signup");
                setError("");
              }}
              className="text-blue-600 hover:underline font-semibold"
            >
              {mode === "signup" ? "Sign In" : "Register here"}
            </button>
          </p>
          
          {mode === "forget" && (
            <button
              type="button"
              onClick={() => { setMode("login"); setError(""); }}
              className="text-gray-500 hover:text-gray-800 hover:underline font-medium mt-1"
            >
              Back to Login
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}