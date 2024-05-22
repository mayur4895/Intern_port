"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
 ;
import { generatePasswordResetToken, generateVerificationToken } from "@/lib/Tokens";
import { db } from "@/lib/db";
import { SendPasswordResetEmail, SendVerificationEmail } from "@/lib/mail";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import ResetSchema from "@/schemas/ResetSchema";
 

import { AuthError } from "next-auth";
import z from "zod";
export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invlaid Fields" };
  }
  const { email  } = validatedFields.data;


  const ExistUser = await  getUserByEmail(email);

  if(!ExistUser) {
    return {error:"email does not exist"}
  }
  
  
 

    const passwordResetToken = await generatePasswordResetToken(email)
  
      
    if(passwordResetToken.email && passwordResetToken.token) {
      await SendPasswordResetEmail(passwordResetToken.email,passwordResetToken.token);
 
       }
    return {success:"Email send for password reset"} 
 
 
};
