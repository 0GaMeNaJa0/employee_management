import { Role,Status,User } from "@/features/users/types/type";

// export const INITIAL_USERS: User[] = [
//   { id: 1,  name: "Sophia Reeves",  email: "sophia@company.io",  roleName: "Admin",     statusName: "Active"  },
//   { id: 2,  name: "Marcus Chen",    email: "marcus@company.io",  roleName: "Developer", statusName: "Active"  },
//   { id: 3,  name: "Aaliyah Torres", email: "aaliyah@company.io", roleName: "Designer",  statusName: "Idle"  },
//   { id: 4,  name: "James Holloway", email: "james@company.io",   roleName: "Manager",   statusName: "Active"  },
//   { id: 5,  name: "Priya Nair",     email: "priya@company.io",   roleName: "Developer", statusName: "Inactive" },
//   { id: 6,  name: "Oliver Watts",   email: "oliver@company.io",  roleName: "Designer",  statusName: "Active" },
//   { id: 7,  name: "Leila Hassan",   email: "leila@company.io",   roleName: "Analyst",   statusName: "Idle"   },
//   { id: 8,  name: "Derek Kim",      email: "derek@company.io",   roleName: "Developer", statusName: "Active" },
//   { id: 9,  name: "Camille Dubois", email: "camille@company.io", roleName: "Admin",     statusName: "Inactive" },
//   { id: 10, name: "Nathan Osei",    email: "nathan@company.io",  roleName: "Manager",   statusName: "Active" },
//   { id: 11, name: "Yuki Tanaka",    email: "yuki@company.io",    roleName: "Developer", statusName: "Active"  },
//   { id: 12, name: "Rosa Mendez",    email: "rosa@company.io",    roleName: "Analyst",   statusName: "Idle"   },
// ];

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
