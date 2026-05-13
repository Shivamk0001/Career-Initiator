import ContactPage from "@/components/contact/ContactPage";

export const metadata = {
  title: "Contact Us | Career Initiator",
  description:
    "Reach Career Initiator for careers, colleges, courses, and exam support. Phone, email, WhatsApp, office hours, and our Bhopal-based team.",
  openGraph: {
    title: "Contact Us | Career Initiator",
    description: "Contact Career Initiator — phone, email, WhatsApp, working hours, and office location in Bhopal, Madhya Pradesh.",
    type: "website"
  }
};

export default function ContactRoutePage() {
  return <ContactPage />;
}
