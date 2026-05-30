import bcrypt from "bcrypt";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { normalizeKey } from "../../../utils/normalizeKey";

type UpdateUserRequest = {
  id: string;
  name?: string;
  password?: string;
  active?: boolean;
};

export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: UpdateUserRequest) {
    const userId = normalizeKey(data.id);

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const updateData: Record<string, unknown> = {
      updatedAt: new Date().toISOString(),
    };

    if (data.name !== undefined) {
      updateData.name = data.name;
    }

    if (data.active !== undefined) {
      updateData.active = data.active;
    }

    if (data.password !== undefined && data.password.trim().length > 0) {
      updateData.passwordHash = await bcrypt.hash(data.password, 10);
    }

    await this.userRepository.update(userId, updateData);

    return {
      id: userId,
      message: "Usuário atualizado com sucesso",
    };
  }
}