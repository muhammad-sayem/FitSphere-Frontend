import { z } from "zod";

export const loginZodSchema = z.object({
  email: z.email("Invalid email address!"),
  password: z.string().min(8, "Password must be at least 8 characters long")
});

export const registerZodSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  image: z.string().optional(),
  email: z.string().email("Invalid email address!"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  role: z.enum(["USER", "TRAINER"], "Role must be either USER or TRAINER"),
});