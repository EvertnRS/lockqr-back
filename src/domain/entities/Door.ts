export type Door = {
  id: string;
  name: string;
  description?: string;
  location?: string;
  password?: string;
  active: boolean;
  isOpen: boolean;
  createdAt: string;
  updatedAt?: string;
};