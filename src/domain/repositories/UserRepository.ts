import { User } from "../entities/User";

export interface UserRepository {
  create(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
  list(): Promise<User[]>;
  update(id: string, data: Partial<User>): Promise<void>;
  delete(id: string): Promise<void>;
}