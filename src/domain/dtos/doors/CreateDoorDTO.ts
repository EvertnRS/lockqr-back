export type CreateDoorRequest = {
  id: string;
  name: string;
  description?: string;
  location?: string;
  password: string;
  active?: boolean;
  isOpen?: boolean;
};

export type CreateDoorResponse = {
  id: string;
  name: string;
  description: string;
  location: string;
  active: boolean;
  isOpen: boolean;
  createdAt: string;
};