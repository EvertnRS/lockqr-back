import { z } from "zod";

export const createUserSchema = z.object({
  username: z.string().min(3, "O username deve ter pelo menos 3 caracteres"),
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  password: z.string().min(4, "A senha deve ter pelo menos 4 caracteres"),
  role: z.enum(["admin", "user"]).optional(),
  active: z.boolean().optional(),
});

export const updateUserSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres").optional(),
  password: z.string().min(4, "A senha deve ter pelo menos 4 caracteres").optional(),
  role: z.enum(["admin", "user"]).optional(),
  active: z.boolean().optional(),
});

export const userParamsSchema = z.object({
  id: z.string().min(1, "O id do usuário é obrigatório"),
});