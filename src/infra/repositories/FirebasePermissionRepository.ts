import { PermissionRepository } from "../../domain/repositories/PermissionRepository";
import { db } from "../firebase/firebase";

export class FirebasePermissionRepository implements PermissionRepository {
  async allowUserInDoor(doorId: string, userId: string): Promise<void> {
    await db.ref(`permissions/${doorId}/${userId}`).set(true);
  }

  async removeUserFromDoor(doorId: string, userId: string): Promise<void> {
    await db.ref(`permissions/${doorId}/${userId}`).remove();
  }

  async hasPermission(doorId: string, userId: string): Promise<boolean> {
    const snapshot = await db.ref(`permissions/${doorId}/${userId}`).get();

    return snapshot.val() === true;
  }

  async listUsersByDoor(doorId: string): Promise<string[]> {
    const snapshot = await db.ref(`permissions/${doorId}`).get();
    const data = snapshot.val();

    if (!data) {
      return [];
    }

    return Object.keys(data);
  }
}