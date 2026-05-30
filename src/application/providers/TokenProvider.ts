import { TokenPayload } from "../../domain/dtos/auth/TokenPayloadDTO";

export interface TokenProvider {
  generate(payload: TokenPayload): string;
  verify(token: string): TokenPayload;
}