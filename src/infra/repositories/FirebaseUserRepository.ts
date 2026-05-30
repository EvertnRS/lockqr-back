import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { db } from "../firebase/firebase";

export class FirebaseUserRepository implements UserRepository {
  async create(user: User): Promise<void> {
    await db.ref(`users/${user.id}`).set(user);
  }

  async findById(id: string): Promise<User | null> {
    const snapshot = await db.ref(`users/${id}`).get();

    if (!snapshot.exists()) {
      return null;
    }

    return snapshot.val() as User;
  }

  async list(): Promise<User[]> {
    const snapshot = await db.ref("users").get();
    const data = snapshot.val();

    if (!data) {
      return [];
    }

    return Object.values(data) as User[];
  }

  async update(id: string, data: Partial<User>): Promise<void> {
    await db.ref(`users/${id}`).update(data);
  }

  async delete(id: string): Promise<void> {
    await db.ref(`users/${id}`).remove();
  }
}