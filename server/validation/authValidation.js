import { z } from "zod";

export const registrationSchema = z
  .object({
    name: z.string().min(6, "Name should contain at least 6 characters"),
    email: z.string().email(),
    password: z.string().min(8, "Password must contain at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });
