'use server'
 
 
 
import { signIn } from "@/auth";
import { db } from "@/lib/db";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import LoginSchema from "@/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { error } from "console";
import { AuthError } from "next-auth";
import { useSearchParams } from "next/navigation";
import z from "zod"
export const  login = async (values :z.infer <typeof LoginSchema>)=>{
 
    const validatedFields =  LoginSchema.safeParse(values);
if(!validatedFields.success){

       return   {error: "Invlaid Fields"}
            };
            const {email ,password} = validatedFields.data;
    try { 
await signIn("credentials",{
             email: email,
              password:password,
              redirectTo:DEFAULT_LOGIN_REDIRECT 
           }) 
           return {success: "Loged In"}  
       
      } catch (error) {
          if (error instanceof AuthError) {
               switch (error.type) {
                         case "OAuthAccountNotLinked": 
                             return { error: "Invalid credentials" , status: "error"};
                         case "CredentialsSignin":
                             throw error;
                         default:
                             return { error: "Something went wrong", status: "error" };
                     }
             }
  
      }
}       
