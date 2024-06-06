'use server'   
 
import { db } from "@/lib/db"; 
import { zodResolver } from "@hookform/resolvers/zod";
 
import z from "zod"
   
 
import { companySchema } from "@/schemas";
import { currentUser } from "@/lib/auth";
 
export const  CompanyRegister = async (values :z.infer <typeof companySchema>, userId:string)=>{
      const LoginUser = await currentUser();
      console.log(LoginUser);
    try {
        const validatedFields =  companySchema.safeParse(values);

         if(!validatedFields.success){
            return   {error: "Invlaid Fields"}
         };

const { name , isIndependentHire, city , description , imageUrl , industry , no_employees} = validatedFields.data;
  
         
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
  
   
      
       await db.compnayDetails.create({ 
   
    data: { 
        userId:userId,
       name,
       description,
       isIndependentHire,
       imageUrl,
       city,
       industry,
       no_employees,    
        }
      })
      
          

      return {success:" saved in db"} 
    }   
      } catch (error) {
        console.log(error); 
  
      }
}