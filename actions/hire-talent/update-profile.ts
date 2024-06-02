'use server' 
 
 
import { db } from "@/lib/db";  
import bcryptjs from "bcryptjs"
import z from "zod"
import { generateVerificationToken } from "@/lib/Tokens";
import { SendVerificationEmail } from "@/lib/mail";
 
import parsePhoneNumberFromString from "libphonenumber-js";
import EmployerProfileSchema from "@/schemas/hire-talent/profile-details-Schema";
 
export const  UpdateProfile = async (values :z.infer <typeof EmployerProfileSchema>, )=>{
      
    try {
        const validatedFields =  EmployerProfileSchema.safeParse(values);

         if(!validatedFields.success){
            return   {error: "Invlaid Fields"}
         }; 
const {firstname,lastname,email,designation,phone} = validatedFields.data;
const parsedPhoneNumber = parsePhoneNumberFromString(phone, 'IN') 
if (!parsedPhoneNumber || !parsedPhoneNumber.isValid()) {
  return {error:"Invalid Phone IN phone required"}
}

const formattedPhoneNumber = parsedPhoneNumber.format('E.164') 

    const userExist = await db.user.findUnique({
        where: {
          email: email
        }
      });

      if(userExist){

        if(userExist.role == "STUDENT"){
          return  {error: "This email is already registered as a student. "}
        }
    
  
      
       await db.user.updateMany({
        where:{
            id:userExist.id,
            email: userExist.email
        },
        data: {
          name: firstname + " " + lastname,
          email: email,  
          designation:designation,
          phone: formattedPhoneNumber,
          role:"EMPLOYER" 
        }
      })
     
 

      return {success:"Profile Details Saved"} 
    }
      } catch (error) {
        console.log(error); 
        return {error:"Something went wrong"} 
      }
}