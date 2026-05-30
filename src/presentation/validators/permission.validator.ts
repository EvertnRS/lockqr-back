import { z } from "zod";

export const permissionParamsSchema = z.object({
  doorId: z.string().min(1, "O id da porta é obrigatório"),
  userId: z.string().min(1, "O id do usuário é obrigatório"),
});

export const doorPermissionParamsSchema = z.object({
  doorId: z.string().min(1, "O id da porta é obrigatório"),
});