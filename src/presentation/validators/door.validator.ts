import { z } from "zod";

export const createDoorSchema = z.object({
  id: z.string().min(3, "O id da porta deve ter pelo menos 3 caracteres"),
  name: z.string().min(3, "O nome da porta deve ter pelo menos 3 caracteres"),
  description: z.string().optional(),
  location: z.string().optional(),
  active: z.boolean().optional(),
  isOpen: z.boolean().optional(),
});

export const updateDoorSchema = z
  .object({
    name: z.string().min(3, "O nome da porta deve ter pelo menos 3 caracteres").optional(),
    description: z.string().optional(),
    location: z.string().optional(),
    active: z.boolean().optional(),
    isOpen: z.boolean().optional(),
  })
  .refine(
    (data) =>
      data.name !== undefined ||
      data.description !== undefined ||
      data.location !== undefined ||
      data.active !== undefined ||
      data.isOpen !== undefined,
    {
      message: "Informe pelo menos um campo para atualizar",
    }
  );

export const doorParamsSchema = z.object({
  id: z.string().min(1, "O id da porta é obrigatório"),
});