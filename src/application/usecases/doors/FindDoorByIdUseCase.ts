import { DoorRepository } from "../../../domain/repositories/DoorRepository";
import { normalizeKey } from "../../../utils/normalizeKey";

export class FindDoorByIdUseCase {
  constructor(private readonly doorRepository: DoorRepository) {}

  async execute(id: string) {
    const doorId = normalizeKey(id);

    const door = await this.doorRepository.findById(doorId);

    if (!door) {
      throw new Error("Porta não encontrada");
    }

    return door;
  }
}