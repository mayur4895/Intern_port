import { z } from "zod";

    const NewPasswordSchema = z.object({
        password: z.string().min(8, {
            message: "password must be at least 8 characters",
          }),});


  export default NewPasswordSchema;