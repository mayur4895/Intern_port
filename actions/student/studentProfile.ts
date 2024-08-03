'use server' 
 
 
import { db } from "@/lib/db"; 
import { zodResolver } from "@hookform/resolvers/zod";
import { error } from "console";
import bcryptjs from "bcryptjs"
import z from "zod"
import { generateVerificationToken } from "@/lib/Tokens";
import { SendVerificationEmail } from "@/lib/mail";
import HireRegisterSchema from "@/schemas/hire-talent/HireRegisterSchema";
import parsePhoneNumberFromString from "libphonenumber-js";
import StudentProfileSchema from "@/schemas/student/profileSchema";
import { UserType } from "@prisma/client";
 
export const  studentProfile = async (values :z.infer <typeof StudentProfileSchema>, )=>{
      
    try {
        const validatedFields =  StudentProfileSchema.safeParse(values);

         if(!validatedFields.success){
            return   {error: "Invlaid Fields"}
         };

const {   firstname,
    lastname,
    email,
    phone,
    about,
    profilePicture,
    resumeUrl,
    urls,  } = validatedFields.data;
    
const parsedPhoneNumber = parsePhoneNumberFromString(phone, 'IN') 
if (!parsedPhoneNumber || !parsedPhoneNumber.isValid()) {
  return {error:"Invalid Phone IN phone required"}
}

const formattedPhoneNumber = parsedPhoneNumber.format('E.164')
 
 
    const userExist = await db.user.findUnique({
        where: {
          email: email,   
        }
      });
      
      if(userExist){

        if(userExist.role == UserType.EMPLOYER){
          return  {error: "This email is already registered as a employer. "}
        }
          
       await db.studentProfileDetails.create({

        data: {
            userId: userExist.id,
           firstname,
           lastname,
           description:about,
          profile:profilePicture,
          email: email, 
          url:urls,
          resume:resumeUrl,
          phone: formattedPhoneNumber,  
        }
      })
      
      return {success:"profile updated"} 
        }
      } catch (error) {
        console.log(error); 
  
      }
}