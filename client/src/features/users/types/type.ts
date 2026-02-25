export type Role   = "Admin" | "Developer" | "Designer" | "Manager" | "Analyst";
export type Status = "Active" | "Idle" | "Inactive";

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  status: Status;
  avatar: string;
  color: string;
}

export type ModalState =
  | { type: "add" }
  | { type: "edit"; user: User }
  | { type: "delete"; user: User }
  | null;

export type UserFormData = Pick<User, "name" | "email" | "role" | "status">;