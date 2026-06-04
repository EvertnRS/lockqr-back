export type Door = {
  id: string;
  name: string;
  description?: string;
  location?: string;
  active: boolean;
  isOpen: boolean;
  createdAt: string;
  updatedAt?: string;
};