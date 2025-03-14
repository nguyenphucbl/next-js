import z from "zod";

export const AccountRes = z
  .object({
    data: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string(),
    }),
    message: z.string(),
  })
  .strict();

export type AccountResType = z.TypeOf<typeof AccountRes>;
