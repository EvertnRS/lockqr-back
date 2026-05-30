import { NextFunction, Request, Response } from "express";
import { JwtTokenProvider } from "../../application/providers/JwtTokenProvider";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Token não informado",
    });
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    return res.status(401).json({
      message: "Token inválido",
    });
  }

  try {
    const tokenProvider = new JwtTokenProvider();
    const payload = tokenProvider.verify(token);

    req.user = {
      id: payload.sub,
      username: payload.username,
      role: payload.role,
    };

    return next();
  } catch {
    return res.status(401).json({
      message: "Token inválido ou expirado",
    });
  }
}