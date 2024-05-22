import { z } from "zod";

    const ResetSchema = z.object({
    email: z
      .string()
      .email({
        message: "Invalid email address",
      }),
      
  });


  export default ResetSchema;