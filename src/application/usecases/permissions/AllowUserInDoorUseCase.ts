import { DoorRepository } from "../../../domain/repositories/DoorRepository";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { PermissionRepository } from "../../../domain/repositories/PermissionRepository";
import { normalizeKey } from "../../../utils/normalizeKey";
import { AllowUserInDoorRequest } from "../../../domain/dtos/permissions/AllowUserInDoorDTO";


export class AllowUserInDoorUseCase {
  constructor(
    private readonly doorRepository: DoorRepository,
    private readonly userRepository: UserRepository,
    private readonly permissionRepository: PermissionRepository
  ) {}

  async execute(data: AllowUserInDoorRequest) {
    const doorId = normalizeKey(data.doorId);
    const userId = normalizeKey(data.userId);

    const door = await this.doorRepository.findById(doorId);

    if (!door) {
      throw new Error("Porta não encontrada");
    }

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    await this.permissionRepository.allowUserInDoor(doorId, userId);

    return {
      doorId,
      userId,
      message: "Permissão adicionada com sucesso",
    };
  }
}