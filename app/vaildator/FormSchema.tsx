'use client'
import { z } from "zod";

  


  export const SignupformSchema = z.object({
    firstname: z.string().min(1, {
      message: "required",
    }),
    lastname: z.string().min(1, {
        message: "required",
      }),
      email: z.string().email({
        message: "Envalid email address",
      }),
      password: z.string().min(6, {
        message: "password must be at least 6 characters.",
      }),
  })
  



  export const SigninformSchema = z.object({
    
      email: z.string().email({
        message: "Envalid email address",
      }),
      password: z.string().min(6, {
        message: "password must be at least 6 characters.",
      }),
  })
  

