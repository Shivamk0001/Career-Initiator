"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/app/admin/components/AdminShell";
import UserFilters from "@/app/admin/users/components/UserFilters";
import UserTable from "@/app/admin/users/components/UserTable";
import EditUserModal from "@/app/admin/users/components/EditUserModal";
import { apiFetch } from "@/lib/api";

const initialFilters = { role: "all", status: "all", page: 1, limit: 10 };
const initialForm = {
  name: "",
  email: "",
  password: "",
  phone: "",
  address: "",
  city: "",
  stream: "",
  qualification: "",
  role: "user",
  isBlocked: false
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0, limit: 10 });
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [editForm, setEditForm] = useState(initialForm);

  const loadUsers = async (nextFilters = filters, nextSearch = search) => {
    const query = new URLSearchParams({
      page: String(nextFilters.page),
      limit: String(nextFilters.limit),
      role: nextFilters.role,
      status: nextFilters.status,
      search: nextSearch
    });
    const response = await apiFetch(`/users?${query.toString()}`);
    setUsers(response.users || []);
    setPagination(response.pagination || { page: 1, totalPages: 1, total: 0, limit: 10 });
  };

  useEffect(() => {
    loadUsers().catch((err) => setError(err instanceof Error ? err.message : "Failed to load users"));
  }, []);

  const handleApplyFilters = async () => {
    const next = { ...filters, page: 1 };
    setFilters(next);
    setError("");
    try {
      await loadUsers(next, search);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to apply filters");
    }
  };

  const handleOpenEdit = (user) => {
    setSelectedUser(user);
    setEditForm({
      name: user.name || "",
      email: user.email || "",
      password: "",
      phone: user.phone || "",
      address: user.address || "",
      city: user.city || "",
      stream: user.stream || "",
      qualification: user.qualification || user.educationLevel || "",
      role: user.role || "user",
      isBlocked: Boolean(user.isBlocked)
    });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!selectedUser?._id) return;
    try {
      setError("");
      const payload = { ...editForm };
      if (!payload.password) delete payload.password;
      await apiFetch(`/users/${selectedUser._id}`, { method: "PUT", body: JSON.stringify(payload) });
      setSelectedUser(null);
      await loadUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update user");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Delete this user permanently?")) return;
    try {
      setError("");
      await apiFetch(`/users/${userId}`, { method: "DELETE" });
      await loadUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete user");
    }
  };

  const handleToggleBlock = async (user) => {
    try {
      setError("");
      await apiFetch(`/admin/users/${user._id}/block`, {
        method: "PATCH",
        body: JSON.stringify({ isBlocked: !user.isBlocked })
      });
      await loadUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update status");
    }
  };

  const handlePageChange = async (nextFilters) => {
    setFilters(nextFilters);
    await loadUsers(nextFilters, search);
  };

  return (
    <AdminShell title="Users" subtitle="Search, filter and manage user accounts">
      {error ? <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</div> : null}
      <UserFilters
        search={search}
        filters={filters}
        onSearchChange={setSearch}
        onFilterChange={setFilters}
        onApply={handleApplyFilters}
      />
      <UserTable
        users={users}
        pagination={pagination}
        filters={filters}
        onPageChange={handlePageChange}
        onEdit={handleOpenEdit}
        onToggleBlock={handleToggleBlock}
        onDelete={handleDeleteUser}
      />
      <EditUserModal
        user={selectedUser}
        form={editForm}
        onChange={setEditForm}
        onClose={() => setSelectedUser(null)}
        onSubmit={handleUpdateUser}
      />
    </AdminShell>
  );
}
