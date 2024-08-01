'use server' 
 
 
import { db } from "@/lib/db"; 
import { zodResolver } from "@hookform/resolvers/zod";
import { error } from "console";
import bcryptjs from "bcryptjs"
import z from "zod"
import { generateVerificationToken } from "@/lib/Tokens";
import { SendVerificationEmail } from "@/lib/mail";
 
import parsePhoneNumberFromString from "libphonenumber-js";
import { formSchema } from "@/components/main/contactUs";
 
export const  GetInTouch = async (values :z.infer <typeof formSchema>, )=>{
      
    try {
     
        
 
    
        

const {firstname,lastname,email,phone,jobtitle} = values;
 
const parsedPhoneNumber = parsePhoneNumberFromString(phone, 'IN') 


if (!parsedPhoneNumber || !parsedPhoneNumber.isValid()) {
  return {error:"Invalid Phone IN phone required"}
}

const formattedPhoneNumber = parsedPhoneNumber.format('E.164')  
 
    const detailsExist = await db.getIntouch.findUnique({
        where:{
        email
        }
    });

      if(detailsExist){ 
        return  {error: "Details alerady exists"}
      }
 
     const res =  await db.getIntouch.create({

        data: {
          firstname ,
          lastname,
          email,
          jobtitle,
          phone: formattedPhoneNumber, 
        }
      })
     
    //    const verificationToken = await generateVerificationToken(email); 
    //    if(verificationToken.email && verificationToken.token) {
    //    await SendVerificationEmail(verificationToken.email,verificationToken.token); 
    //    return {success:"Confirmation Email Sent"} 
    //     }

 
    
return {success:"Details Saved Succesfuly"}

      } catch (error) {
        console.log(error);
        
        return {error:"Something went wrong"}
  
      }
}