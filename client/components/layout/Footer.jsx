import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-slate-900/60">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 md:grid-cols-3">
        <div>
          <h3 className="font-semibold text-cyan-300">Career Initiator</h3>
          <p className="mt-2 text-sm text-slate-300">Guiding students from school to successful career paths.</p>
        </div>
        <div>
          <h4 className="font-semibold">Quick Links</h4>
          <div className="mt-2 flex flex-col gap-1 text-sm text-slate-300">
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/latest-updates">Latest Updates</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold">Social</h4>
          <p className="mt-2 text-sm text-slate-300">YouTube | WhatsApp | LinkedIn | Facebook</p>
          <p className="mt-4 text-xs text-slate-400">© {new Date().getFullYear()} Career Initiator</p>
        </div>
      </div>
    </footer>
  );
}
