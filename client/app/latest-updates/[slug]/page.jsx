import { notFound } from "next/navigation";
import UpdateDetailView from "@/components/updates/UpdateDetailView";
import { getAllUpdateSlugs, getRelatedUpdates, getUpdateBySlug } from "@/data/updates";

export function generateStaticParams() {
  return getAllUpdateSlugs();
}

export async function generateMetadata({ params }) {
  const update = getUpdateBySlug(params.slug);
  if (!update) {
    return {
      title: "Update not found | Career Initiator",
      description: "The requested article could not be found."
    };
  }
  const desc = update.excerpt?.slice(0, 160) ?? "Education and career update from Career Initiator.";
  return {
    title: `${update.title} | Career Initiator`,
    description: desc,
    openGraph: {
      title: update.title,
      description: desc,
      type: "article",
      publishedTime: update.date
    }
  };
}

export default function UpdateDetailPage({ params }) {
  const update = getUpdateBySlug(params.slug);
  if (!update) {
    notFound();
  }
  const related = getRelatedUpdates(params.slug, 3);
  return <UpdateDetailView update={update} related={related} />;
}
