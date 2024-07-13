import { z } from "zod";

export const ApplyFormSchema = z.object({
    resume: z.string().min(1, {
      message: "Required Resume",
    }),
  })