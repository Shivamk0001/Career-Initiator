import ResourceGrid from "@/components/common/ResourceGrid";
import { getResource } from "@/lib/serverApi";

export const metadata = { title: "Courses | Career Initiator" };

export default async function CoursesPage() {
  const items = await getResource("courses");
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Courses</h1>
      <ResourceGrid items={items} basePath="/courses" />
    </section>
  );
}
