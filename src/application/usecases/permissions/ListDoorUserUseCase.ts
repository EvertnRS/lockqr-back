import { PermissionRepository } from "../../../domain/repositories/PermissionRepository";
import { normalizeKey } from "../../../utils/normalizeKey";

export class ListDoorUsersUseCase {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute(doorId: string) {
    const normalizedDoorId = normalizeKey(doorId);

    const users = await this.permissionRepository.listUsersByDoor(normalizedDoorId);

    return {
      doorId: normalizedDoorId,
      users,
    };
  }
}