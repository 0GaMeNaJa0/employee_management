"use client"
import { useState } from "react";
import { Status,Role } from "../types/type";
import { ROLES,STATUSES } from "../constants/constant";
import { UserFormData } from "../types/type";

interface UserFormProps {
  initial?: UserFormData;
  onSave: (data: UserFormData) => void;
  onCancel: () => void;
}

export function UserForm({ initial, onSave, onCancel }: UserFormProps) {
  const [form, setForm] = useState<UserFormData>(
    initial ?? { name: "", email: "", role: "Developer", status: "Active" }
  );

  const set = <K extends keyof UserFormData>(key: K, value: UserFormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

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
          className={inputClass}
          placeholder="e.g. Jane Smith"
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
        />
      </div>
      <div>
        <label className={labelClass}>Email</label>
        <input
          className={inputClass}
          type="email"
          placeholder="jane@company.io"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Role</label>
          <select
            className={inputClass + " cursor-pointer"}
            value={form.role}
            onChange={(e) => set("role", e.target.value as Role)}
          >
            {ROLES.map((r) => (
              <option key={r} value={r} className="bg-[#111318]">{r}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Status</label>
          <select
            className={inputClass + " cursor-pointer"}
            value={form.status}
            onChange={(e) => set("status", e.target.value as Status)}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s} className="bg-[#111318]">{s}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 text-sm font-medium transition-all"
        >
          Cancel
        </button>
        <button
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