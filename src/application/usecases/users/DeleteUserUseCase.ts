import { UserRepository } from "../../../domain/repositories/UserRepository";
import { normalizeKey } from "../../../utils/normalizeKey";

export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string) {
    const userId = normalizeKey(id);

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    await this.userRepository.delete(userId);

    return {
      id: userId,
      message: "Usuário removido com sucesso",
    };
  }
}