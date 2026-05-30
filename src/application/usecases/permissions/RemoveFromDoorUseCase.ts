import { PermissionRepository } from "../../../domain/repositories/PermissionRepository";
import { normalizeKey } from "../../../utils/normalizeKey";
import { RemoveUserFromDoorRequest } from "../../../domain/dtos/permissions/RemoveFromDoorDto";

export class RemoveUserFromDoorUseCase {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute(data: RemoveUserFromDoorRequest) {
    const doorId = normalizeKey(data.doorId);
    const userId = normalizeKey(data.userId);

    await this.permissionRepository.removeUserFromDoor(doorId, userId);

    return {
      doorId,
      userId,
      message: "Permissão removida com sucesso",
    };
  }
}