import DetailView from "@/components/common/DetailView";
import { getResourceBySlug } from "@/lib/serverApi";

export default async function BlogDetail({ params }) {
  const data = await getResourceBySlug("blogs", params.slug);
  return <DetailView data={data} titleKey="title" />;
}
