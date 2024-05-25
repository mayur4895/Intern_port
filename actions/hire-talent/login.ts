"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user"; 
import { generateVerificationToken } from "@/lib/Tokens";
import { db } from "@/lib/db";
import { SendVerificationEmail } from "@/lib/mail"; 
import LoginSchema from "@/schemas/LoginSchema";

import { AuthError } from "next-auth";
import z from "zod";
export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invlaid Fields" };
  }
  const { email, password } = validatedFields.data;


  const ExistUser = await  getUserByEmail(email);

  if(!ExistUser || !ExistUser.email || !ExistUser.password  ) {
    return {error:"User does not exist"}
  }

  
  
  if(!ExistUser.emailVerified  ){
    const verificationToken = await generateVerificationToken(email)

  
    if(verificationToken.email && verificationToken.token) {
      await SendVerificationEmail(verificationToken.email,verificationToken.token);
 
       }
    return {success:"Confirmation Email Sent"} 
  }

  try {
    await signIn("credentials", {
      email: email,
      password: password,
      redirectTo:"/hire-talent"
    });
    return { success: "Loged In" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "OAuthAccountNotLinked":
          return { error: "Invalid credentials", status: "error" };
        case "CredentialsSignin":
          throw error;
        default:
          return { error: "Something went wrong", status: "error" };
      }
    }
  }
};
