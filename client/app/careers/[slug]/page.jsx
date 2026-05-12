import { notFound } from "next/navigation";
import CareerDetailView from "@/components/careers/CareerDetailView";
import { getAllCareerSlugs, getCareerBySlug } from "@/data/careers";

export function generateStaticParams() {
  return getAllCareerSlugs();
}

export async function generateMetadata({ params }) {
  const career = getCareerBySlug(params.slug);
  if (!career) {
    return { title: "Career not found | Career Initiator" };
  }
  return {
    title: `${career.title} | Career Initiator`,
    description: career.shortDescription,
    openGraph: {
      title: career.title,
      description: career.shortDescription
    }
  };
}

export default function CareerSlugPage({ params }) {
  const career = getCareerBySlug(params.slug);
  if (!career) {
    notFound();
  }
  return <CareerDetailView career={career} />;
}
