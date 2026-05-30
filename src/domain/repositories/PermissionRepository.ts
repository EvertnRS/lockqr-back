export interface PermissionRepository {
  allowUserInDoor(doorId: string, userId: string): Promise<void>;
  removeUserFromDoor(doorId: string, userId: string): Promise<void>;
  hasPermission(doorId: string, userId: string): Promise<boolean>;
  listUsersByDoor(doorId: string): Promise<string[]>;
}