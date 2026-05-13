"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Mail, MessageSquare, Phone, Send, User, FileText } from "lucide-react";

const initial = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: ""
};

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

/** Optional Indian mobile: 10 digits starting 6–9, or empty. */
function isValidPhoneOptional(v) {
  const digits = v.replace(/\D/g, "");
  if (digits.length === 0) return true;
  if (digits.length === 12 && digits.startsWith("91")) return /^91[6-9]\d{9}$/.test(digits);
  if (digits.length === 10) return /^[6-9]\d{9}$/.test(digits);
  return false;
}

export default function ContactForm() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle");

  const validate = useCallback(
    (v = values) => {
      const next = {};
      if (!v.fullName.trim() || v.fullName.trim().length < 2) {
        next.fullName = "Please enter your full name (at least 2 characters).";
      }
      if (!v.email.trim()) {
        next.email = "Email is required.";
      } else if (!isValidEmail(v.email)) {
        next.email = "Enter a valid email address.";
      }
      if (!isValidPhoneOptional(v.phone)) {
        next.phone = "Enter a valid 10-digit Indian mobile number, or leave blank.";
      }
      if (!v.subject.trim()) {
        next.subject = "Please add a subject.";
      } else if (v.subject.trim().length < 3) {
        next.subject = "Subject is too short.";
      }
      if (!v.message.trim()) {
        next.message = "Please write your message.";
      } else if (v.message.trim().length < 10) {
        next.message = "Message should be at least 10 characters.";
      }
      return next;
    },
    [values]
  );

  function handleBlur(field) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  }

  function handleChange(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      setErrors(validate({ ...values, [field]: value }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const allTouched = Object.keys(initial).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(allTouched);
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("success");
    setValues(initial);
    setTouched({});
    setErrors({});
  }

  if (status === "success") {
    return (
      <motion.div
        role="status"
        aria-live="polite"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center rounded-2xl border border-emerald-100 bg-emerald-50/80 px-6 py-12 text-center sm:px-10"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-9 w-9" aria-hidden />
        </div>
        <h3 className="mt-5 text-xl font-bold text-slate-900 sm:text-2xl">Message sent</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-600">
          Thank you for reaching out. Our team typically replies within one business day during working hours. For urgent
          queries you can also call or WhatsApp us.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 rounded-xl bg-[#002147] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#00172f]"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-5 sm:grid-cols-2"
      noValidate
      aria-busy={status === "submitting"}
    >
      <Field
        id="contact-full-name"
        label="Full name"
        icon={<User className="h-4 w-4" aria-hidden />}
        error={touched.fullName ? errors.fullName : undefined}
      >
        <input
          id="contact-full-name"
          name="fullName"
          type="text"
          autoComplete="name"
          value={values.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
          onBlur={() => handleBlur("fullName")}
          aria-invalid={touched.fullName && !!errors.fullName}
          aria-describedby={touched.fullName && errors.fullName ? "contact-full-name-err" : undefined}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none ring-slate-200 transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          placeholder="Your name"
        />
      </Field>

      <Field
        id="contact-email"
        label="Email address"
        icon={<Mail className="h-4 w-4" aria-hidden />}
        error={touched.email ? errors.email : undefined}
      >
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          aria-invalid={touched.email && !!errors.email}
          aria-describedby={touched.email && errors.email ? "contact-email-err" : undefined}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none ring-slate-200 transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          placeholder="you@example.com"
        />
      </Field>

      <Field
        id="contact-phone"
        label="Phone number"
        icon={<Phone className="h-4 w-4" aria-hidden />}
        optional
        error={touched.phone ? errors.phone : undefined}
      >
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="numeric"
          value={values.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          onBlur={() => handleBlur("phone")}
          aria-invalid={touched.phone && !!errors.phone}
          aria-describedby={touched.phone && errors.phone ? "contact-phone-err" : undefined}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none ring-slate-200 transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          placeholder="+91 or 10-digit mobile"
        />
      </Field>

      <Field
        id="contact-subject"
        label="Subject"
        icon={<FileText className="h-4 w-4" aria-hidden />}
        error={touched.subject ? errors.subject : undefined}
      >
        <input
          id="contact-subject"
          name="subject"
          type="text"
          autoComplete="off"
          value={values.subject}
          onChange={(e) => handleChange("subject", e.target.value)}
          onBlur={() => handleBlur("subject")}
          aria-invalid={touched.subject && !!errors.subject}
          aria-describedby={touched.subject && errors.subject ? "contact-subject-err" : undefined}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none ring-slate-200 transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          placeholder="How can we help?"
        />
      </Field>

      <Field
        id="contact-message"
        label="Message"
        icon={<MessageSquare className="h-4 w-4" aria-hidden />}
        className="sm:col-span-2"
        error={touched.message ? errors.message : undefined}
      >
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(e) => handleChange("message", e.target.value)}
          onBlur={() => handleBlur("message")}
          aria-invalid={touched.message && !!errors.message}
          aria-describedby={touched.message && errors.message ? "contact-message-err" : undefined}
          className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none ring-slate-200 transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          placeholder="Tell us about your query — courses, exams, careers, or partnerships."
        />
      </Field>

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#002147] to-[#0a4d8c] px-6 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-900/20 transition hover:opacity-[0.97] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:min-w-[200px]"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden />
              Submit message
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Field({ id, label, icon, optional, error, children, className = "" }) {
  const errId = `${id}-err`;
  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={id} className="flex items-center gap-2 text-sm font-semibold text-slate-800">
        <span className="text-orange-500">{icon}</span>
        {label}
        {optional ? <span className="text-xs font-normal text-slate-500">(optional)</span> : null}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error ? (
          <motion.p
            id={errId}
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs font-medium text-red-600"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
