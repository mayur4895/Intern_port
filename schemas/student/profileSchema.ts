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
    profilePicture:z.string(),
    socialUrls: z.array(z.string()),
    resumeUrl: z.string().min(1,{ message: "required"})
  });


  export default StudentProfileSchema;