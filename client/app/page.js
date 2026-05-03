import Hero from "@/components/home/Hero";
import VideoSpotlight from "@/components/home/VideoSpotlight";
import LeadFormHome from "@/components/home/LeadFormHome";
import FaqSectionHome from "@/components/home/FaqSectionHome";
import {
  IntroBand,
  SmartCareerHeading,
  AudienceSplit,
  ServicesShowcase,
  HowItWorks,
  TrustStats,
  TestimonialsHome,
  FinalCtaBand,
} from "@/components/home/HomeSections";

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <IntroBand />
      <VideoSpotlight />
      <SmartCareerHeading />
      <AudienceSplit />
      <ServicesShowcase />
      <HowItWorks />
      <TrustStats />
      <LeadFormHome />
      <TestimonialsHome />
      <FaqSectionHome />
      <FinalCtaBand />
    </div>
  );
}
