'use server' 
 
 
import { db } from "@/lib/db"; 
 
import z from "zod"
 
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
    departmentId,
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
          departmentId
        }
      })
      
      return {success:"profile updated"} 
        }else{
          return { error: "error while profile update" };
        }
      } catch (error) {
        console.log(error); 
        return {error:"something went wrong"}
  
      }
}