import DetailView from "@/components/common/DetailView";
import { getResourceBySlug } from "@/lib/serverApi";

export default async function CourseDetail({ params }) {
  const data = await getResourceBySlug("courses", params.slug);
  return <DetailView data={data} />;
}
