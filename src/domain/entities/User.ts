export type User = {
  id: string;
  username: string;
  name: string;
  passwordHash: string;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
};