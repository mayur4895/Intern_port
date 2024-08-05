 'use server'
 
 
 
import { db } from "@/lib/db";
import RegisterSchema from "@/schemas/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { error } from "console";
import bcryptjs from "bcryptjs"
import z from "zod"
import { generateVerificationToken } from "@/lib/Tokens";
import { SendVerificationEmail } from "@/lib/mail";
 
export const  register = async (values :z.infer <typeof RegisterSchema>)=>{
      
    try {
        const validatedFields =  RegisterSchema.safeParse(values);

         if(!validatedFields.success){
            return   {error: "Invlaid Fields"}
         };

const {name,email,password} = validatedFields.data;

   const salt = await bcryptjs.genSalt(10);
const hashpassword = await bcryptjs.hash(password, salt);
         
    const userExist = await db.user.findUnique({
        where: {
          email: email,
          
        }
      });

       

      if(userExist){
        return  {error: "User already exists"}
      }
      
       await db.user.create({

        data: {
          name: name,
          email: email,
          password: hashpassword,
          departmentId:'66ae59948164403dd19cb866'  
        }
      })
     
       const verificationToken = await generateVerificationToken(email);
         
        if(verificationToken.email && verificationToken.token) {
       await SendVerificationEmail(verificationToken.email,verificationToken.token);

      return {success:"Confirmation Email Sent"} 
        }
      } catch (error) {
        console.log(error); 
  
      }
}