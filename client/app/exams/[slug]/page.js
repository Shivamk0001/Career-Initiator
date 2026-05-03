import DetailView from "@/components/common/DetailView";
import { getResourceBySlug } from "@/lib/serverApi";

export default async function ExamDetail({ params }) {
  const data = await getResourceBySlug("exams", params.slug);
  return <DetailView data={data} />;
}
