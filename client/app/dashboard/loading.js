export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6">
      <div className="mx-auto max-w-6xl animate-pulse space-y-4">
        <div className="h-14 rounded-xl bg-slate-200" />
        <div className="h-32 rounded-xl bg-slate-200" />
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="h-24 rounded-xl bg-slate-200" />
          ))}
        </div>
      </div>
    </div>
  );
}
