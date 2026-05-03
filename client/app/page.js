import Hero from "@/components/home/Hero";

const cards = [
  { title: "Top Colleges", desc: "Compare fees, ranking, location and admissions." },
  { title: "Trending Courses", desc: "Find industry-ready UG, PG and certification courses." },
  { title: "Exam Guidance", desc: "Stay updated with exam dates, eligibility and tips." },
  { title: "Career Roadmaps", desc: "Explore future-proof career options with salary insights." }
];

export default function HomePage() {
  return (
    <div>
      <Hero />
      <section className="mx-auto max-w-7xl px-4 pb-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <article key={card.title} className="glass rounded-2xl p-5">
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{card.desc}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
