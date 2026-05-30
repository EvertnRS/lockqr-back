import { UserRole } from "../../entities/UserRole";

export type CreateUserRequest = {
  username: string;
  name: string;
  password: string;
  role?: UserRole 
  active?: boolean;
};

export type CreateUserResponse = {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  active: boolean;
  createdAt: string;
};