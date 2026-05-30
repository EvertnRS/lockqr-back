import { UserRole } from "../../entities/UserRole";

export type TokenPayload = {
  sub: string;
  username: string;
  role: UserRole;
};
