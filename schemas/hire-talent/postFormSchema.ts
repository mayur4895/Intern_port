import { z } from "zod";
 
 
const  postFormSchema = z.object({
    firstname: z.string().min(1,{
      message: "This field is required",
    }),
     lastname: z.string().min(1,{
        message: "This field is required",
    }),
    email: z.string().email({ message: "Invalid email address" }),   
    designation: z.string().min(1, { message: "This field is required"}),  
    phone: z.string().regex( /^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  });


  export default  postFormSchema;