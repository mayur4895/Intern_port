import { z } from "zod";
const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;
 
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

   phone: z.string().regex(phoneRegex, "Invalid Number!"),
      
      
  });


  export default HireRegisterSchema;