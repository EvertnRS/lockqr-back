export type CreateDoorRequest = {
  id: string;
  name: string;
  description?: string;
  location?: string;
  active?: boolean;
};

export type CreateDoorResponse = {
    id: string;
    name: string;
    description: string;
    location: string;
    active: boolean;
    createdAt: string;
};