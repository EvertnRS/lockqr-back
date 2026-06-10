import { DoorRepository } from "../../../domain/repositories/DoorRepository";
import { normalizeKey } from "../../../utils/normalizeKey";
import { CreateDoorRequest, CreateDoorResponse } from "../../../domain/dtos/doors/CreateDoorDTO";

export class CreateDoorUseCase {
  constructor(private readonly doorRepository: DoorRepository) {}

  async execute(data: CreateDoorRequest): Promise<CreateDoorResponse> {
    const doorId = normalizeKey(data.id);

    const doorAlreadyExists = await this.doorRepository.findById(doorId);

    if (doorAlreadyExists) {
      throw new Error("Porta já existe");
    }

    if((await this.doorRepository.list()).length >= 5){
      throw new Error("Limite máximo de portas atingido");
    }

    const door = {
      id: doorId,
      name: data.name,
      description: data.description ?? "",
      location: data.location ?? "",
      active: data.active ?? true,
      isOpen: data.isOpen ?? false,
      createdAt: new Date().toISOString(),
    };

    await this.doorRepository.create(door);

    return door;
  }
}