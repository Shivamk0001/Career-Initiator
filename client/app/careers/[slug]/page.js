import DetailView from "@/components/common/DetailView";
import { getResourceBySlug } from "@/lib/serverApi";

export default async function CareerDetail({ params }) {
  const data = await getResourceBySlug("careers", params.slug);
  return <DetailView data={data} titleKey="title" />;
}
