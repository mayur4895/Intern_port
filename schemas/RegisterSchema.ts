import { z } from "zod";

const RegisterSchema = z.object({
    name: z.string().min(2, {
      message: "name must be at least 2 characters",
    }),
    email: z.string().email({ message: "Invalid email address" }),
  
    password: z.string().min(8, {
      message: "password must be at least 8 characters",
    }),
  });


  export default RegisterSchema;