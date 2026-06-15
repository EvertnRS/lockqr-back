export type Door = {
  id: string;
  name: string;
  description?: string;
  location?: string;
  passwordHash: string;
  active: boolean;
  isOpen: boolean;
  createdAt: string;
  updatedAt?: string;
};