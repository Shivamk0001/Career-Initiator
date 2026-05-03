import DetailView from "@/components/common/DetailView";
import { getResourceBySlug } from "@/lib/serverApi";

export default async function CollegeDetail({ params }) {
  const data = await getResourceBySlug("colleges", params.slug);
  return <DetailView data={data} />;
}
