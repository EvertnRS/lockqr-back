import { UserRole } from './UserRole';

export type User = {
  id: string;
  username: string;
  name: string;
  passwordHash: string;
  role: UserRole;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
};