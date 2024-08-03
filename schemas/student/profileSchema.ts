import { z } from "zod";
 
 
const StudentProfileSchema = z.object({
    firstname: z.string().min(1,{
      message: "This field is required",
    }),
     lastname: z.string().min(1,{
        message: "This field is required",
    }),
    email: z.string().email({ message: "Invalid email address" }),    
    phone: z.string().regex( /^\+?[1-9]\d{1,14}$/, "Invalid phone number"), 
    about: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
    }), 
    profilePicture:z.string(),
    urls: z.array(z.string().url("Invalid URL")).optional(),
    resumeUrl: z.string().min(1,{ message: "required"})
  });


  export default StudentProfileSchema;