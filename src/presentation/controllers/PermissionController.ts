import { Request, Response } from "express";
import { ZodError } from "zod";

import { FirebaseDoorRepository } from "../../infra/repositories/FirebaseDoorRepository";
import { FirebaseUserRepository } from "../../infra/repositories/FirebaseUserRepository";
import { FirebasePermissionRepository } from "../../infra/repositories/FirebasePermissionRepository";

import { AllowUserInDoorUseCase } from "../../application/usecases/permissions/AllowUserInDoorUseCase";
import { RemoveUserFromDoorUseCase } from "../../application/usecases/permissions/RemoveFromDoorUseCase";
import { ListDoorUsersUseCase } from "../../application/usecases/permissions/ListDoorUserUseCase";

import {
  permissionParamsSchema,
  doorPermissionParamsSchema,
} from "../validators/permission.validator";

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

export class PermissionsController {
  async allowUser(req: Request, res: Response) {
    try {
      const { doorId, userId } = permissionParamsSchema.parse(req.params);

      const doorRepository = new FirebaseDoorRepository();
      const userRepository = new FirebaseUserRepository();
      const permissionRepository = new FirebasePermissionRepository();

      const useCase = new AllowUserInDoorUseCase(
        doorRepository,
        userRepository,
        permissionRepository
      );

      const result = await useCase.execute({
        doorId,
        userId,
      });

      return res.status(201).json(result);
    } catch (error) {
      return handleError(error, res);
    }
  }

  async removeUser(req: Request, res: Response) {
    try {
      const { doorId, userId } = permissionParamsSchema.parse(req.params);

      const permissionRepository = new FirebasePermissionRepository();
      const useCase = new RemoveUserFromDoorUseCase(permissionRepository);

      const result = await useCase.execute({
        doorId,
        userId,
      });

      return res.status(200).json(result);
    } catch (error) {
      return handleError(error, res);
    }
  }

  async listUsersByDoor(req: Request, res: Response) {
    try {
      const { doorId } = doorPermissionParamsSchema.parse(req.params);

      const permissionRepository = new FirebasePermissionRepository();
      const useCase = new ListDoorUsersUseCase(permissionRepository);

      const result = await useCase.execute(doorId);

      return res.status(200).json(result);
    } catch (error) {
      return handleError(error, res);
    }
  }
}