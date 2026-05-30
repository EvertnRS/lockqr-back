import bcrypt from "bcrypt";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { TokenProvider } from "../../providers/TokenProvider";
import { normalizeKey } from "../../../utils/normalizeKey";

type LoginRequest = {
  username: string;
  password: string;
};

export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenProvider: TokenProvider
  ) {}

  async execute(data: LoginRequest) {
    const userId = normalizeKey(data.username);

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error("Usuário ou senha inválidos");
    }

    if (!user.active) {
      throw new Error("Usuário inativo");
    }

    const passwordMatches = await bcrypt.compare(
      data.password,
      user.passwordHash
    );

    if (!passwordMatches) {
      throw new Error("Usuário ou senha inválidos");
    }

    const token = this.tokenProvider.generate({
      sub: user.id,
      username: user.username,
      role: user.role,
    });

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
      },
    };
  }
}