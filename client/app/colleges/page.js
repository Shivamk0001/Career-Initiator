import ResourceGrid from "@/components/common/ResourceGrid";
import { getResource } from "@/lib/serverApi";

export const metadata = { title: "Colleges | Career Initiator" };

export default async function CollegesPage() {
  const items = await getResource("colleges");
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Colleges</h1>
      <ResourceGrid items={items} basePath="/colleges" />
    </section>
  );
}
