import { Request, Response } from "express";
import { ZodError } from "zod";

import { FirebaseDoorRepository } from "../../infra/repositories/FirebaseDoorRepository";

import { CreateDoorUseCase } from "../../application/usecases/doors/CreateDoorUseCase";
import { ListDoorsUseCase } from "../../application/usecases/doors/ListDoorUseCase";
import { FindDoorByIdUseCase } from "../../application/usecases/doors/FindDoorByIdUseCase";
import { UpdateDoorUseCase } from "../../application/usecases/doors/UpdateDoorUseCase";
import { DeleteDoorUseCase } from "../../application/usecases/doors/DeleteDoorUseCase";

import {
  createDoorSchema,
  updateDoorSchema,
  doorParamsSchema,
} from  "../validators/door.validator";

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

export class DoorsController {
  async create(req: Request, res: Response) {
    try {
      const data = createDoorSchema.parse(req.body);

      const doorRepository = new FirebaseDoorRepository();
      const createDoorUseCase = new CreateDoorUseCase(doorRepository);

      const result = await createDoorUseCase.execute(data);

      return res.status(201).json(result);
    } catch (error) {
      return handleError(error, res);
    }
  }

  async list(req: Request, res: Response) {
    try {
      const doorRepository = new FirebaseDoorRepository();
      const listDoorsUseCase = new ListDoorsUseCase(doorRepository);

      const result = await listDoorsUseCase.execute();

      return res.status(200).json(result);
    } catch (error) {
      return handleError(error, res);
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = doorParamsSchema.parse(req.params);

      const doorRepository = new FirebaseDoorRepository();
      const findDoorByIdUseCase = new FindDoorByIdUseCase(doorRepository);

      const result = await findDoorByIdUseCase.execute(id);

      return res.status(200).json(result);
    } catch (error) {
      return handleError(error, res);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = doorParamsSchema.parse(req.params);
      const data = updateDoorSchema.parse(req.body);

      const doorRepository = new FirebaseDoorRepository();
      const updateDoorUseCase = new UpdateDoorUseCase(doorRepository);

      const result = await updateDoorUseCase.execute(id, data);

      return res.status(200).json(result);
    } catch (error) {
      return handleError(error, res);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = doorParamsSchema.parse(req.params);

      const doorRepository = new FirebaseDoorRepository();
      const deleteDoorUseCase = new DeleteDoorUseCase(doorRepository);

      const result = await deleteDoorUseCase.execute(id);

      return res.status(200).json(result);
    } catch (error) {
      return handleError(error, res);
    }
  }
}