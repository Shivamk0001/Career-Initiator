import ResourceGrid from "@/components/common/ResourceGrid";
import { getResource } from "@/lib/serverApi";

export const metadata = { title: "Latest Updates | Career Initiator" };

export default async function LatestUpdatesPage() {
  const items = await getResource("blogs");
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Latest Updates</h1>
      <ResourceGrid items={items} titleKey="title" basePath="/latest-updates" />
    </section>
  );
}
