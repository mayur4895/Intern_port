'use server' 
 
 
import { db } from "@/lib/db"; 
import { zodResolver } from "@hookform/resolvers/zod";
import { error } from "console";
import bcryptjs from "bcryptjs"
import z from "zod"
import { generateVerificationToken } from "@/lib/Tokens";
import { SendVerificationEmail } from "@/lib/mail";
import HireRegisterSchema from "@/schemas/hire-talent/HireRegisterSchema";
 
export const  register = async (values :z.infer <typeof HireRegisterSchema>)=>{
      
    try {
        const validatedFields =  HireRegisterSchema.safeParse(values);

         if(!validatedFields.success){
            return   {error: "Invlaid Fields"}
         };

const {firstname,lastname,email,password} = validatedFields.data;

   const salt = await bcryptjs.genSalt(10);
const hashpassword = await bcryptjs.hash(password, salt);
         
    const userExist = await db.user.findUnique({
        where: {
          email: email
        }
      });

      if(userExist){

        if(userExist.role == "STUDENT"){
          return  {error: "This email is already registered as a student. "}
        }
        return  {error: "User already exists"}
      }
      
       await db.user.create({

        data: {
          name: firstname + lastname,
          email: email,
          password: hashpassword,
          role:"EMPLOYER"
          
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