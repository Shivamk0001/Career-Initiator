"use client";

export default function EditUserModal({ user, form, onChange, onClose, onSubmit }) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
      <form onSubmit={onSubmit} className="w-full max-w-3xl rounded-xl bg-white p-5 shadow-xl">
        <h3 className="text-lg font-semibold text-slate-900">Edit User</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <input value={form.name} onChange={(e) => onChange({ ...form, name: e.target.value })} placeholder="Name" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input value={form.email} onChange={(e) => onChange({ ...form, email: e.target.value })} placeholder="Email" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input value={form.password} onChange={(e) => onChange({ ...form, password: e.target.value })} placeholder="Password (optional)" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input value={form.phone} onChange={(e) => onChange({ ...form, phone: e.target.value })} placeholder="Phone" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input value={form.address} onChange={(e) => onChange({ ...form, address: e.target.value })} placeholder="Address" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input value={form.city} onChange={(e) => onChange({ ...form, city: e.target.value })} placeholder="City" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input value={form.stream} onChange={(e) => onChange({ ...form, stream: e.target.value })} placeholder="Stream" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input value={form.qualification} onChange={(e) => onChange({ ...form, qualification: e.target.value })} placeholder="Qualification" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <select value={form.role} onChange={(e) => onChange({ ...form, role: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <label className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <input type="checkbox" checked={form.isBlocked} onChange={(e) => onChange({ ...form, isBlocked: e.target.checked })} />
            Block user
          </label>
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
            Cancel
          </button>
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
}
