"use client";

export default function UserTable({ users, pagination, filters, onPageChange, onEdit, onToggleBlock, onDelete }) {
  return (
    <>
      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Phone</th>
              <th className="px-3 py-2">City</th>
              <th className="px-3 py-2">Qualification</th>
              <th className="px-3 py-2">Role</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Created</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t border-slate-200">
                <td className="px-3 py-2">{user.name || "-"}</td>
                <td className="px-3 py-2">{user.email || "-"}</td>
                <td className="px-3 py-2">{user.phone || "-"}</td>
                <td className="px-3 py-2">{user.city || "-"}</td>
                <td className="px-3 py-2">{user.qualification || user.educationLevel || "-"}</td>
                <td className="px-3 py-2">{user.role}</td>
                <td className="px-3 py-2">
                  <span className={`rounded-full px-2 py-1 text-xs ${user.isBlocked ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"}`}>
                    {user.isBlocked ? "Blocked" : "Active"}
                  </span>
                </td>
                <td className="px-3 py-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="px-3 py-2">
                  <div className="flex gap-2">
                    <button onClick={() => onEdit(user)} className="rounded bg-slate-100 px-2 py-1 text-xs hover:bg-slate-200">
                      Edit
                    </button>
                    <button
                      onClick={() => onToggleBlock(user)}
                      className="rounded bg-amber-100 px-2 py-1 text-xs text-amber-800 hover:bg-amber-200"
                    >
                      {user.isBlocked ? "Unblock" : "Block"}
                    </button>
                    <button onClick={() => onDelete(user._id)} className="rounded bg-rose-100 px-2 py-1 text-xs text-rose-700 hover:bg-rose-200">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
        <p>
          Page {pagination.page} of {pagination.totalPages} - {pagination.total} users
        </p>
        <div className="flex gap-2">
          <button
            disabled={pagination.page <= 1}
            onClick={() => onPageChange({ ...filters, page: filters.page - 1 })}
            className="rounded border border-slate-300 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <button
            disabled={pagination.page >= pagination.totalPages}
            onClick={() => onPageChange({ ...filters, page: filters.page + 1 })}
            className="rounded border border-slate-300 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
