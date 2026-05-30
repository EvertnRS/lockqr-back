import jwt, { SignOptions } from "jsonwebtoken";

import { TokenProvider } from "../../application/providers/TokenProvider";
import { TokenPayload } from "../../domain/dtos/auth/TokenPayloadDTO";

export class JwtTokenProvider implements TokenProvider {
  generate(payload: TokenPayload): string {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET não configurado");
    }

    const options: SignOptions = {
      expiresIn: process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"] || "1d",
    };

    return jwt.sign(payload, secret, options);
  }

  verify(token: string): TokenPayload {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET não configurado");
    }

    return jwt.verify(token, secret) as TokenPayload;
  }
}