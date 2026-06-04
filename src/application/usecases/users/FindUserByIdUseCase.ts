import { GetUserResponse } from "../../../domain/dtos/users/GetUserDTO";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { normalizeKey } from "../../../utils/normalizeKey";

export class FindUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<GetUserResponse> {
    const userId = normalizeKey(id);

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
      active: user.active,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt ?? "",
    };
  }
}