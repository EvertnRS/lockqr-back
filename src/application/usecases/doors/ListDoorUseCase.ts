import { DoorRepository } from "../../../domain/repositories/DoorRepository";

export class ListDoorsUseCase {
  constructor(private readonly doorRepository: DoorRepository) {}

  async execute() {
    return await this.doorRepository.list();
  }
}