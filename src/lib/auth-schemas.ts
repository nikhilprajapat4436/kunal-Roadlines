import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(100, { message: "Password must be at most 100 characters" }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const resetPasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, { message: "Current password must be at least 8 characters" }),
    newPassword: z
      .string()
      .min(8, { message: "New password must be at least 8 characters" })
      .max(100, { message: "New password must be at most 100 characters" })
      .regex(/[A-Z]/, {
        message: "New password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "New password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, {
        message: "New password must contain at least one number",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;