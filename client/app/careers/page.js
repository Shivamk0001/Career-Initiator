import ResourceGrid from "@/components/common/ResourceGrid";
import { getResource } from "@/lib/serverApi";

export const metadata = { title: "Careers | Career Initiator" };

export default async function CareersPage() {
  const items = await getResource("careers");
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Careers</h1>
      <ResourceGrid items={items} titleKey="title" basePath="/careers" />
    </section>
  );
}
