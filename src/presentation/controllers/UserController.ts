import { Request, Response } from "express";
import { ZodError } from "zod";

import { FirebaseUserRepository } from "../../infra/repositories/FirebaseUserRepository";

import { CreateUserUseCase } from "../../application/usecases/users/CreateUserUseCase";
import { ListUsersUseCase } from "../../application/usecases/users/ListUserUseCase";
import { FindUserByIdUseCase } from "../../application/usecases/users/FindUserByIdUseCase";
import { UpdateUserUseCase } from "../../application/usecases/users/UpdateUserUseCase";
import { DeleteUserUseCase } from "../../application/usecases/users/DeleteUserUseCase";

import {
  createUserSchema,
  updateUserSchema,
  userParamsSchema,
} from "../validators/user.validator";

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

export class UsersController {
  async create(req: Request, res: Response) {
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

  async list(req: Request, res: Response) {
    try {
      const userRepository = new FirebaseUserRepository();
      const listUsersUseCase = new ListUsersUseCase(userRepository);

      const result = await listUsersUseCase.execute();

      return res.status(200).json(result);
    } catch (error) {
      return handleError(error, res);
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = userParamsSchema.parse(req.params);

      const userRepository = new FirebaseUserRepository();
      const findUserByIdUseCase = new FindUserByIdUseCase(userRepository);

      const result = await findUserByIdUseCase.execute(id);

      return res.status(200).json(result);
    } catch (error) {
      return handleError(error, res);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = userParamsSchema.parse(req.params);
      const data = updateUserSchema.parse(req.body);

      const userRepository = new FirebaseUserRepository();
      const updateUserUseCase = new UpdateUserUseCase(userRepository);

      const result = await updateUserUseCase.execute(id, data);

      return res.status(200).json(result);
    } catch (error) {
      return handleError(error, res);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = userParamsSchema.parse(req.params);

      const userRepository = new FirebaseUserRepository();
      const deleteUserUseCase = new DeleteUserUseCase(userRepository);

      const result = await deleteUserUseCase.execute(id);

      return res.status(200).json(result);
    } catch (error) {
      return handleError(error, res);
    }
  }
}