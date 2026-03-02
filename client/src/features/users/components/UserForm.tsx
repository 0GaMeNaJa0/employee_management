"use client";
import { useState } from "react";
import { Status, Role, User,UserFormData } from "../types/type";

interface UserFormProps {
  initial?: User;
  roleList: Role[];
  statusList: Status[];
  onSave: (data: UserFormData) => void;
  onCancel: () => void;
}

export function UserForm({
  initial,
  roleList,
  statusList,
  onSave,
  onCancel,
}: UserFormProps) {
  const [form, setForm] = useState<UserFormData>({
    "userId" : initial?.userId ?? 1,
    "email" : initial?.email ?? "",
    "name" : initial?.name ?? "",
    "roleId" : initial?.role.roleId ?? 1,
    "statusId" : initial?.status.statusId ?? 1
  });

  const isValid = form.name.trim() !== "" && form.email.trim() !== "";

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-indigo-500/60 focus:bg-white/[0.08] transition-all";
  const labelClass =
    "block text-zinc-400 text-xs font-medium mb-1.5 tracking-wide uppercase";

  return (
    <div className="space-y-4">
      <div>
        <label className={labelClass}>Full Name</label>
        <input
          type="text"
          className={inputClass}
          placeholder="e.g. Jane Smith"
          value={form.name}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </div>

      <div>
        <label className={labelClass}>Email</label>
        <input
          className={inputClass}
          type="email"
          placeholder="jane@company.io"
          value={form.email}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, email: e.target.value }))
          }
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Role</label>
          <select
            className={inputClass + " cursor-pointer"}
            value={form.roleId}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, roleId: Number(e.target.value) }))
            }
          >
            {roleList.map((r) => (
              <option key={r.roleId} value={r.roleId} className="bg-[#111318]">
                {r.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Status</label>
          <select
            className={inputClass + " cursor-pointer"}
            value={form.statusId}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, statusId: Number(e.target.value) }))
            }
          >
            {statusList.map((s) => (
              <option
                key={s.statusId}
                value={s.statusId}
                className="bg-[#111318]"
              >
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 text-sm font-medium transition-all"
        >
          Cancel
        </button>

        <button
          type="button"
          disabled={!isValid}
          onClick={() => isValid && onSave(form)}
          className="flex-1 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white text-sm font-medium transition-all"
        >
          {initial ? "Save Changes" : "Add User"}
        </button>
      </div>
    </div>
  );
}