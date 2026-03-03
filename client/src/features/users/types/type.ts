export interface Role {
  roleId: number,
  name : string
}
export interface Status {
  statusId: number,
  name : string
}

export interface User {
  userId: number;
  name: string;
  email: string;
  role: Role;
  status: Status;
  avatar : string,
  color : string
}

export type ModalState =
  | { type: "add" }
  | { type: "edit"; user: User }
  | { type: "delete"; user: User }
  | null;

export interface UserFormData {
  userId : number,
  name: string;
  email: string;
  roleId: number;
  statusId: number;
}

export interface UserFilter{
  roleId : number,
  statusId : number,
  
}