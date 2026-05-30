import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "O username é obrigatório"),
  password: z.string().min(1, "A senha é obrigatória"),
});