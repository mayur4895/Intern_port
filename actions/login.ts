"use server";

import { getUserByEmail } from "@/data/user";
 
 
import { db } from "@/lib/db";

import LoginSchema from "@/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { error } from "console";
import { AuthError } from "next-auth";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import z from "zod";
export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invlaid Fields" };
  }
  const { email, password } = validatedFields.data;


 const existUser = await getUserByEmail(email);


 if(!existUser || !existUser.email || !existUser.password){
    return { error: "Email does not exist" };
 }

 if(!existUser.emailVerified){
   
  return {success:"Confirmation Email Sent"} 
   
 
 }


  try {
    await signIn("credentials", {
      email: email,
      password: password,
 
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
