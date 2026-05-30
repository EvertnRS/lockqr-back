import { Door } from "../../domain/entities/Door";
import { DoorRepository } from "../../domain/repositories/DoorRepository";
import { db } from "../firebase/firebase";

export class FirebaseDoorRepository implements DoorRepository {
  async create(door: Door): Promise<void> {
    await db.ref(`doors/${door.id}`).set(door);
  }

  async findById(id: string): Promise<Door | null> {
    const snapshot = await db.ref(`doors/${id}`).get();

    if (!snapshot.exists()) {
      return null;
    }

    return snapshot.val() as Door;
  }

  async list(): Promise<Door[]> {
    const snapshot = await db.ref("doors").get();
    const data = snapshot.val();

    if (!data) {
      return [];
    }

    return Object.values(data) as Door[];
  }

  async update(id: string, data: Partial<Door>): Promise<void> {
    await db.ref(`doors/${id}`).update(data);
  }

  async delete(id: string): Promise<void> {
    await db.ref(`doors/${id}`).remove();
  }
}