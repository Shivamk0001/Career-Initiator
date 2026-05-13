/**
 * Canonical contact and company details used across the marketing site
 * (footer, contact page, about/more). Keep in sync with support channels.
 */

export const SITE_CONTACT = {
  companyName: "Career Initiator",
  /** Shorter line for compact UI (e.g. footer). */
  addressShort: "Bhopal, India",
  /** Full address for maps and contact cards. */
  addressFull: "Bhopal, Madhya Pradesh, India",
  workingHours: "Monday to Saturday, 9:00 AM to 7:00 PM",
  email: "careerinitiator1188@gmail.com",
  /** International format for tel: and consistency. */
  phoneE164: "+917987081188",
  /** Spaced display (matches existing More page). */
  phoneDisplay: "+91 79870 81188",
  /** Compact display (matches existing footer). */
  phoneDisplayCompact: "+91 7987081188",
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61582953866454",
    instagram: "https://www.instagram.com/careerinitiator.in?igsh=eDNxdHpiOG5jYXR6",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com/@careerinitiator?si=kxLr6jRkc2tn3Wy8",
    whatsapp: "https://wa.me/917987081188"
  }
};

/** Google Maps iframe (no API key) — embeds search for the office region. */
export function getGoogleMapsEmbedUrl() {
  const q = encodeURIComponent(SITE_CONTACT.addressFull);
  return `https://maps.google.com/maps?q=${q}&hl=en&z=12&output=embed`;
}

/** Support-focused FAQs for the contact page. */
export const CONTACT_PAGE_FAQS = [
  {
    q: "How quickly will you respond to my message?",
    a: "We aim to reply within one business day for email and the contact form. Calls and WhatsApp during working hours are usually answered the same day."
  },
  {
    q: "What are your support hours?",
    a: `Our team is available ${SITE_CONTACT.workingHours}. Messages sent outside these hours are queued for the next working day.`
  },
  {
    q: "Can I get help choosing a college or course?",
    a: "Yes. Share your stream, location preference, and budget in your message so we can route you to the right counselor or resource on the platform."
  },
  {
    q: "Is counseling or personalized guidance free?",
    a: "Browsing careers, colleges, courses, and updates is free. Some personalized counseling packages may be paid — mention your need in the form and we will share current options."
  },
  {
    q: "I need urgent help before an exam deadline. What should I do?",
    a: "For time-sensitive queries, call or WhatsApp us directly with the exam name and your question. Always cross-check critical dates on the official exam website."
  },
  {
    q: "Do you handle business or partnership inquiries?",
    a: 'Yes. Use the same form with subject "Partnership" or "Business" and we will connect you with the right person on the team.'
  }
];
