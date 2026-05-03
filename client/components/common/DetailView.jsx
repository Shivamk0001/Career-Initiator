export default function DetailView({ data, titleKey = "name" }) {
  if (!data) return <p className="text-slate-300">Data not found.</p>;

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <article className="glass rounded-2xl p-6">
        <h1 className="text-3xl font-bold">{data[titleKey]}</h1>
        {data.location ? <p className="mt-2 text-slate-300">{data.location}</p> : null}
        <p className="mt-6 whitespace-pre-line text-slate-200">{data.description || data.content || data.roadmap}</p>
      </article>
    </section>
  );
}
