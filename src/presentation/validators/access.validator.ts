import { z } from "zod";

export const validateAccessSchema = z.object({
  doorId: z.string().min(1, "O id da porta é obrigatório"),
});