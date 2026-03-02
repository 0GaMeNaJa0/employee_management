"use client"
import { useEffect, useState } from "react";
import { Role, User, ModalState, UserFormData,Status } from "@/features/users/types/type";
import {  PAGE_SIZE,roleConfig,statusConfig } from "@/features/users/constants/constant";
import { DeleteConfirm } from "@/features/users/components/DeleteConfirm";
import { Avatar } from "@/features/users/components/Avatar";
import { UserForm } from "@/features/users/components/UserForm";
import { Modal } from "@/features/users/components/Modal";
import { Pagination } from "@/components/templates/Pagination";
import { useSearchParams } from "next/navigation";

// Helpers
const getInitials = (name: string): string =>
  name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

const getColor = (name: string): string => {
  const colors = [
    "#6366f1", "#0ea5e9", "#f43f5e", "#10b981", "#f59e0b",
    "#8b5cf6", "#ec4899", "#14b8a6", "#ef4444", "#84cc16",
    "#06b6d4", "#d946ef",
  ];

  let total = 0;

  for (let i = 0; i < name.length; i++) {
    total += name.charCodeAt(i);
  }

  const index = total % colors.length;

  return colors[index];
};


export default function Home() {
  const params = useSearchParams();
  const rawPage = params.get("page");
  const parsed = Number(rawPage);
  const pageFromUrl = Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 1;
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [modal, setModal] = useState<ModalState>(null);
  const [search, setSearch] = useState<string>("");
  const [filterRole, setFilterRole] = useState<Role | "All">("All");


  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      const usersWithAvatar = data.map((user : any) => {
        const { avatar, color } = getAbbreviation(user.name);

        return {
          id: user.userId,
          ...user,
          role : {
            roleId : user.roleId,
            name : user.roleName
          },
          status : {
            statusId : user.statusId,
            name : user.statusName
          },
          avatar,
          color,
        };
      });
      setUsers(usersWithAvatar);

    }

    async function fetchRoles(){
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roles`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data: Role[] = await res.json();

      setRoles(data)
    }

    async function fetchStatuses(){
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/statuses`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data: Status[] = await res.json();

      setStatuses(data)
    }

    fetchUsers();
    fetchRoles();
    fetchStatuses();
  }, [users]);

  const getAbbreviation = (name: string) => {
    const splitName = name.split(" ");
    const avatar = splitName[0].charAt(0) + splitName[1].charAt(0);

    const color = getColor(name);

    return {
      avatar, color
    }
  }

  const filtered = users?.filter(
    (u) =>
      (filterRole === "All" || u.role === filterRole) &&
      (u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()))
  );

  const pageUsers = filtered?.slice((pageFromUrl - 1) * PAGE_SIZE, pageFromUrl * PAGE_SIZE);

  const handleAdd = async (form: UserFormData) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: form.email,
        name: form.name,
        roleId: form.roleId,
        statusId: form.statusId
      })
    });

    console.log(res);
    setModal(null);

  };

  const handleEdit = async (form: UserFormData) => {
    if (modal?.type !== "edit") return;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        userId: form.userId,
        email: form.email,
        name: form.name,
        roleId: form.roleId,
        statusId: form.statusId
      })
    });

    setModal(null);
  };

  const handleDelete = async(userId : number) => {
    if (modal?.type !== "delete") return;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        userId: userId
      })
    });
    setModal(null);
  };


  return (
    <div className="min-h-screen bg-[#0a0c10] text-white p-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');`}</style>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Team Members</h1>
            <p className="text-zinc-500 text-sm mt-1">
              {users.length} users across {roles.length} roles
            </p>
          </div>
          <button
            onClick={() => setModal({ type: "add" })}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white text-sm font-medium transition-all shadow-lg shadow-indigo-900/30 active:scale-95"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v12M1 7h12" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Add User
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
              width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/[0.08] rounded-xl text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 transition-all"
              placeholder="Search by name or email…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); }}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {roles.map((r) => (
              <button
                key={r.roleId}
                onClick={() => { setFilterRole(r); }}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all border ${filterRole === r
                  ? "bg-indigo-600 border-indigo-500 text-white"
                  : "bg-white/5 border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/20"
                  }`}
              >
                {r.name}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#0e1117] border border-white/[0.08] rounded-2xl overflow-hidden">
          {/* Table Head */}
          <div className="grid grid-cols-12 px-5 py-3 border-b border-white/5">
            <div className="col-span-5 text-zinc-500 text-xs font-medium uppercase tracking-wider">User</div>
            <div className="col-span-3 text-zinc-500 text-xs font-medium uppercase tracking-wider">Role</div>
            <div className="col-span-2 text-zinc-500 text-xs font-medium uppercase tracking-wider">Status</div>
            <div className="col-span-2 text-zinc-500 text-xs font-medium uppercase tracking-wider text-right">Actions</div>
          </div>

          {/* Rows */}
          {pageUsers.length === 0 ? (
            <div className="py-16 text-center text-zinc-600 text-sm">No users found</div>
          ) : (
            pageUsers.map((user, i) => (
              <div
                key={user.userId}
                className={`grid grid-cols-12 items-center px-5 py-3.5 hover:bg-white/[0.025] transition-colors ${i < pageUsers.length - 1 ? "border-b border-white/5" : ""
                  }`}
              >
                {/* User */}
                <div className="col-span-5 flex items-center gap-3 min-w-0">
                  <Avatar initials={user.avatar} color={user.color} size={9} />
                  <div className="min-w-0">
                    <p className="text-white text-sm font-medium truncate">{user.name}</p>
                    <p className="text-zinc-500 text-xs truncate">{user.email}</p>
                  </div>
                </div>

                {/* Role */}
                <div className="col-span-3">
                  <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-medium ${roleConfig[user.role.name]}`}>
                    {user.role.name}
                  </span>
                </div>

                {/* Status */}
                <div className="col-span-2">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ring-1  ${statusConfig[user.status.name].badge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[user.status.name].dot} ${user.status.name === "Active" ? "animate-pulse" : ""}`} />
                    {user.status.name}
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-2 flex justify-end gap-1">
                  <button
                    onClick={() => setModal({ type: "edit", user })}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all"
                    title="Edit user"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setModal({ type: "delete", user })}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                    title="Delete user"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
                      <path d="M10 11v6M14 11v6" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <Pagination dataSize={filtered.length} pageNo={pageFromUrl} />
      </div>

      {/* Modals */}
      {modal?.type === "add" && (
        <Modal title="Add New User" onClose={() => setModal(null)}>
          <UserForm onSave={handleAdd} onCancel={() => setModal(null)} roleList={roles} statusList={statuses} />
        </Modal>
      )}
      {modal?.type === "edit" && (
        <Modal title="Edit User" onClose={() => setModal(null)}>
          <UserForm initial={modal.user} onSave={handleEdit} onCancel={() => setModal(null)}  roleList={roles} statusList={statuses}/>
        </Modal>
      )}

      {modal?.type === "delete" && (
        <Modal title="Remove User" onClose={() => setModal(null)}>
          <DeleteConfirm user={modal.user} onConfirm={handleDelete} onCancel={() => setModal(null)}  />
        </Modal>
      )}
    </div>
  );
}
