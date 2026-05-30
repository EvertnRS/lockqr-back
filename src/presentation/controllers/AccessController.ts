import { Request, Response } from "express";
import { ZodError } from "zod";

import { FirebaseDoorRepository } from "../../infra/repositories/FirebaseDoorRepository";
import { FirebaseUserRepository } from "../../infra/repositories/FirebaseUserRepository";
import { FirebasePermissionRepository } from "../../infra/repositories/FirebasePermissionRepository";
import { FirebaseAccessLogRepository } from "../../infra/repositories/FirebaseAccessLogRepository";

import { ValidateAccessUseCase } from "../../application/usecases/access/ValidateAccessUseCase";

import { validateAccessSchema } from "../validators/access.validator";

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

export class AccessController {
  async validate(req: Request, res: Response) {
    try {
      const data = validateAccessSchema.parse(req.body);

      const doorRepository = new FirebaseDoorRepository();
      const userRepository = new FirebaseUserRepository();
      const permissionRepository = new FirebasePermissionRepository();
      const accessLogRepository = new FirebaseAccessLogRepository();

      const validateAccessUseCase = new ValidateAccessUseCase(
        doorRepository,
        userRepository,
        permissionRepository,
        accessLogRepository
      );

      const result = await validateAccessUseCase.execute(data);

      return res.status(result.allowed ? 200 : 401).json(result);
    } catch (error) {
      return handleError(error, res);
    }
  }
}