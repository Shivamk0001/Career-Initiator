import ResourceGrid from "@/components/common/ResourceGrid";
import { getResource } from "@/lib/serverApi";

export const metadata = { title: "Exams | Career Initiator" };

export default async function ExamsPage() {
  const items = await getResource("exams");
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Exams</h1>
      <ResourceGrid items={items} basePath="/exams" />
    </section>
  );
}
