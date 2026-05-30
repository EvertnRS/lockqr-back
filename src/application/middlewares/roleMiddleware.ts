import { NextFunction, Request, Response } from "express";
import { UserRole } from "../../domain/entities/UserRole";

export function roleMiddleware(role: UserRole) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      return res.status(401).json({
        message: "Usuário não autenticado",
      });
    }

    if (req.user.role !== role) {
      return res.status(403).json({
        message: "Usuário sem permissão",
      });
    }

    return next();
  };
}