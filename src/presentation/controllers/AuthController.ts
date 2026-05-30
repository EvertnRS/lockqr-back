import { Request, Response } from "express";
import { ZodError } from "zod";

import { FirebaseUserRepository } from "../../infra/repositories/FirebaseUserRepository";
import { JwtTokenProvider } from "../../application/providers/JwtTokenProvider";

import { CreateUserUseCase } from "../../application/usecases/users/CreateUserUseCase";
import { LoginUseCase } from "../../application/usecases/auth/LoginUseCase";

import { createUserSchema } from "../validators/user.validator";
import { loginSchema } from "../validators/auth.validator";

function handleError(error: unknown, res: Response) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "Dados inválidos",
      errors: error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  return res.status(400).json({
    message: error instanceof Error ? error.message : "Erro interno",
  });
}

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const data = createUserSchema.parse(req.body);

      const userRepository = new FirebaseUserRepository();
      const createUserUseCase = new CreateUserUseCase(userRepository);

      const result = await createUserUseCase.execute(data);

      return res.status(201).json(result);
    } catch (error) {
      return handleError(error, res);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const data = loginSchema.parse(req.body);

      const userRepository = new FirebaseUserRepository();
      const tokenProvider = new JwtTokenProvider();

      const loginUseCase = new LoginUseCase(userRepository, tokenProvider);

      const result = await loginUseCase.execute(data);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(401).json({
        message: error instanceof Error ? error.message : "Erro ao fazer login",
      });
    }
  }
}