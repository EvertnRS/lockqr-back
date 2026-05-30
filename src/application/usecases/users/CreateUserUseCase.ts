import bcrypt from "bcrypt";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { normalizeKey } from "../../../utils/normalizeKey";
import { CreateUserRequest, CreateUserResponse } from "../../../domain/dtos/users/CreateUserDTO";

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: CreateUserRequest): Promise<CreateUserResponse> {
    const userId = normalizeKey(data.username);

    const userAlreadyExists = await this.userRepository.findById(userId);

    if (userAlreadyExists) {
      throw new Error("Usuário já existe");
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = {
      id: userId,
      username: data.username,
      name: data.name,
      passwordHash,
      active: data.active ?? true,
      createdAt: new Date().toISOString(),
      role: data.role ?? "user",
    };

    await this.userRepository.create(user);

    return {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
      active: user.active,
      createdAt: user.createdAt,
    };
  }
}