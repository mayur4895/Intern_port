import { z } from "zod";
 
 
const HireRegisterSchema = z.object({
    firstname: z.string().min(1, {
      message: "Required",
    }),
lastname: z.string().min(1, {
        message: "Required",
      }),
    email: z.string().email({ message: "Invalid email address" }),
  
    password: z.string().min(8, {
      message: "password must be at least 8 characters",
    }),

    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  });


  export default HireRegisterSchema;