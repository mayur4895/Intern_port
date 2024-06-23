'use server'   
 
import { db } from "@/lib/db"; 
  
import z from "zod"
   
 
import { postFormSchema } from "@/schemas";
import { currentUser } from "@/lib/auth";
 
export const  CreateInternshipPost = async (values :z.infer <typeof postFormSchema>, userId:string)=>{
      const LoginUser = await currentUser();
      console.log(LoginUser);
    try {
        const validatedFields =  postFormSchema.safeParse(values);

         if(!validatedFields.success){
            return   {error: "Invlaid Fields"}
         };

const {  internshipProfile,internshipDuration,internshipType,internshipStartDate,
    cities, ISnearCity, requiredSkills , noOfOpenings ,noOfDaysInOfficeInWeek , MonthOrWeeks,  partOrFullTime,
    InternResponsibilities,whoCanApply,additioalPreferences
} = validatedFields.data;
  
         
    const userExist = await db.user.findUnique({
        where: {
        id: userId
        }
      });

       if(!userExist){
        return  {error: "something went wrong"}
      }

      if(userExist){

        if(userExist.role == "STUDENT"){
          return  {error: "something went wrong"}
        }

          

        await db.post.upsert({
            where: { userId: userId },
            update: {
              userId:userId,
              internshipProfile,internshipDuration,internshipType,internshipStartDate,
              cities, ISnearCity, requiredSkills , noOfOpenings ,noOfDaysInOfficeInWeek , MonthOrWeeks,  partOrFullTime,
              InternResponsibilities,whoCanApply,additioalPreferences
            },
            create: {
              userId:userId,
              internshipProfile,internshipDuration,internshipType,internshipStartDate,
              cities, ISnearCity, requiredSkills , noOfOpenings ,noOfDaysInOfficeInWeek , MonthOrWeeks,  partOrFullTime,
              InternResponsibilities,whoCanApply,additioalPreferences
            }
          });
 
   
     
          return {success:"POst Cretaed"}

      }   
      } catch (error) {
        return {error:"error occured while creating post"}      
  
      }
}