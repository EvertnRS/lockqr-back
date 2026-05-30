import { z } from "zod";

export const validateAccessSchema = z.object({
  doorId: z.string().min(1, "O id da porta é obrigatório"),
  username: z.string().min(1, "O usuário é obrigatório"),
  password: z.string().min(1, "A senha é obrigatória"),
});