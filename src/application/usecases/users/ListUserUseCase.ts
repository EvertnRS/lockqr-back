import { GetUserResponse } from "../../../domain/dtos/users/GetUserDTO";
import { UserRepository } from "../../../domain/repositories/UserRepository";

export class ListUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<Array<GetUserResponse>> {
    const users = await this.userRepository.list();

    return users.map((user) => ({
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
      active: user.active,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt ?? "",
    }));
  }
}