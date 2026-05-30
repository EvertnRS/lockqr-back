import { Door } from "../entities/Door";

export interface DoorRepository {
  create(door: Door): Promise<void>;
  findById(id: string): Promise<Door | null>;
  list(): Promise<Door[]>;
  update(id: string, data: Partial<Door>): Promise<void>;
  delete(id: string): Promise<void>;
}