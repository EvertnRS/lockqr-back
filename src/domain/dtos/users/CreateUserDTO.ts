export type CreateUserRequest = {
  username: string;
  name: string;
  password: string;
  active?: boolean;
};

export type CreateUserResponse = {
  id: string;
  username: string;
  name: string;
  active: boolean;
  createdAt: string;
};