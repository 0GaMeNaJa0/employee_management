import { Role,Status,User } from "@/features/users/types/type";

export const INITIAL_USERS: User[] = [
  { id: 1,  name: "Sophia Reeves",  email: "sophia@company.io",  role: "Admin",     status: "Active",   avatar: "SR", color: "#6366f1" },
  { id: 2,  name: "Marcus Chen",    email: "marcus@company.io",  role: "Developer", status: "Active",   avatar: "MC", color: "#0ea5e9" },
  { id: 3,  name: "Aaliyah Torres", email: "aaliyah@company.io", role: "Designer",  status: "Idle",     avatar: "AT", color: "#f43f5e" },
  { id: 4,  name: "James Holloway", email: "james@company.io",   role: "Manager",   status: "Active",   avatar: "JH", color: "#10b981" },
  { id: 5,  name: "Priya Nair",     email: "priya@company.io",   role: "Developer", status: "Inactive", avatar: "PN", color: "#f59e0b" },
  { id: 6,  name: "Oliver Watts",   email: "oliver@company.io",  role: "Designer",  status: "Active",   avatar: "OW", color: "#8b5cf6" },
  { id: 7,  name: "Leila Hassan",   email: "leila@company.io",   role: "Analyst",   status: "Idle",     avatar: "LH", color: "#ec4899" },
  { id: 8,  name: "Derek Kim",      email: "derek@company.io",   role: "Developer", status: "Active",   avatar: "DK", color: "#14b8a6" },
  { id: 9,  name: "Camille Dubois", email: "camille@company.io", role: "Admin",     status: "Inactive", avatar: "CD", color: "#ef4444" },
  { id: 10, name: "Nathan Osei",    email: "nathan@company.io",  role: "Manager",   status: "Active",   avatar: "NO", color: "#84cc16" },
  { id: 11, name: "Yuki Tanaka",    email: "yuki@company.io",    role: "Developer", status: "Active",   avatar: "YT", color: "#06b6d4" },
  { id: 12, name: "Rosa Mendez",    email: "rosa@company.io",    role: "Analyst",   status: "Idle",     avatar: "RM", color: "#d946ef" },
];

export const ROLES: Role[]     = ["Admin", "Developer", "Designer", "Manager", "Analyst"];
export const STATUSES: Status[] = ["Active", "Idle", "Inactive"];
export const PAGE_SIZE = 6;

export const statusConfig: Record<Status, { dot: string; badge: string }> = {
  Active:   { dot: "bg-emerald-400", badge: "bg-emerald-400/10 text-emerald-400 ring-emerald-400/30" },
  Idle:     { dot: "bg-amber-400",   badge: "bg-amber-400/10 text-amber-400 ring-amber-400/30" },
  Inactive: { dot: "bg-zinc-500",    badge: "bg-zinc-500/10 text-zinc-400 ring-zinc-500/30" },
};

export const roleConfig: Record<Role, string> = {
  Admin:     "bg-violet-500/15 text-violet-300",
  Developer: "bg-sky-500/15 text-sky-300",
  Designer:  "bg-rose-500/15 text-rose-300",
  Manager:   "bg-teal-500/15 text-teal-300",
  Analyst:   "bg-orange-500/15 text-orange-300",
};
