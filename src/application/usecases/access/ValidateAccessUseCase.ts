import { DoorRepository } from "../../../domain/repositories/DoorRepository";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { PermissionRepository } from "../../../domain/repositories/PermissionRepository";
import { AccessLogRepository } from "../../../domain/repositories/AccessLogRepository";
import { ValidateAccessRequest } from "../../../domain/dtos/access/ValidateAccessDTO";

import { normalizeKey } from "../../../utils/normalizeKey";

export class ValidateAccessUseCase {
  constructor(
    private readonly doorRepository: DoorRepository,
    private readonly userRepository: UserRepository,
    private readonly permissionRepository: PermissionRepository,
    private readonly accessLogRepository: AccessLogRepository
  ) {}

  async execute(data: ValidateAccessRequest) {
    const doorId = normalizeKey(data.doorId);
    const userId = normalizeKey(data.userId);

    let allowed = false;
    let reason = "Acesso negado";

    const door = await this.doorRepository.findById(doorId);

    if (!door) {
      reason = "Porta não encontrada";
      await this.registerLog(doorId, userId, allowed, reason);

      return {
        allowed,
        message: reason,
      };
    }

    if (!door.active) {
      reason = "Porta inativa";
      await this.registerLog(doorId, userId, allowed, reason);

      return {
        allowed,
        message: reason,
      };
    }

    const user = await this.userRepository.findById(userId);

    if (!user) {
      reason = "Usuário não encontrado";
      await this.registerLog(doorId, userId, allowed, reason);

      return {
        allowed,
        message: reason,
      };
    }

    if (!user.active) {
      reason = "Usuário inativo";
      await this.registerLog(doorId, userId, allowed, reason);

      return {
        allowed,
        message: reason,
      };
    }

    const hasPermission = await this.permissionRepository.hasPermission(
      doorId,
      userId
    );

    if (!hasPermission) {
      reason = "Usuário sem permissão para esta porta";
      await this.registerLog(doorId, userId, allowed, reason);

      return {
        allowed,
        message: reason,
      };
    }

    // Validar senha da porta se ela existe
    if (door.password) {
      if (!data.password) {
        reason = "Senha obrigatória para esta porta";
        await this.registerLog(doorId, userId, allowed, reason);

        return {
          allowed,
          message: reason,
        };
      }

      if (data.password !== door.password) {
        reason = "Senha incorreta";
        await this.registerLog(doorId, userId, allowed, reason);

        return {
          allowed,
          message: reason,
        };
      }
    }

    allowed = true;
    reason = "Acesso liberado";

    await this.registerLog(doorId, userId, allowed, reason);

    return {
      allowed,
      message: reason,
    };
  }

  private async registerLog(
    doorId: string,
    userId: string,
    allowed: boolean,
    reason: string
  ) {
    await this.accessLogRepository.create({
      doorId,
      userId,
      allowed,
      reason,
      createdAt: new Date().toISOString(),
    });
  }
}