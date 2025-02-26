import z from "zod";

export const authSchema = z.object({
  name: z.string().trim().min(2).max(256),
  email: z.string().email(),
  password: z.string().min(6).max(100),
  confirmPassword: z.string().min(6).max(100),
});

export type AuthSchemaType = z.infer<typeof authSchema>;
export type RegisterSchemaType = z.infer<typeof authSchema>;
export const registerSchema = authSchema
  .pick({
    name: true,
    email: true,
    password: true,
    confirmPassword: true,
  })
  .strict()
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export type LoginSchemaType = Pick<AuthSchemaType, "email" | "password">;
export const loginSchema = authSchema
  .pick({ email: true, password: true })
  .strict();
