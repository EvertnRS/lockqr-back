import bcrypt from "bcrypt";
import { Door } from "../../../domain/entities/Door";
import { DoorRepository } from "../../../domain/repositories/DoorRepository";
import { normalizeKey } from "../../../utils/normalizeKey";
import { UpdateDoorRequest } from "../../../domain/dtos/doors/UpdateDoorDTO";

export class UpdateDoorUseCase {
  constructor(private readonly doorRepository: DoorRepository) {}

  async execute(id: string, data: UpdateDoorRequest) {
    const doorId = normalizeKey(id);

    const door = await this.doorRepository.findById(doorId);

    if (!door) {
      throw new Error("Porta não encontrada");
    }

    const updateData: Partial<Door> = {
      updatedAt: new Date().toISOString(),
    };

    if (data.name !== undefined) {
      updateData.name = data.name;
    }

    if (data.description !== undefined) {
      updateData.description = data.description;
    }

    if (data.location !== undefined) {
      updateData.location = data.location;
    }

    if (data.password !== undefined) {
      updateData.passwordHash = await bcrypt.hash(data.password, 10);
    }

    if (data.isOpen !== undefined) {
      updateData.isOpen = data.isOpen;
    }

    await this.doorRepository.update(doorId, updateData);

    return {
      id: doorId,
      message: "Porta atualizada com sucesso",
    };
  }
}