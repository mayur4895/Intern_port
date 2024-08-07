'use server'   
 
import { db } from "@/lib/db"; 
import { zodResolver } from "@hookform/resolvers/zod";
 
import z from "zod"
   
 
import { companySchema } from "@/schemas";
import { currentUser } from "@/lib/auth";
 
export const  CompanyRegister = async (values :z.infer <typeof companySchema>, userId:string)=>{
      const LoginUser = await currentUser();
 
    try {
        const validatedFields =  companySchema.safeParse(values);

         if(!validatedFields.success){
            return   {error: "Invlaid Fields"}
         };

         if(!userId){
          return {error:"userId not provided"}
         }

const { name , isIndependentHire, city , description , imageUrl , industry , employees} = validatedFields.data;
  
         
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
  
   
       
  await db.companyDetails.upsert({
        where: { userId: userId },
        update: {
          userId:userId,
          name,
          description,
          isIndependentHire,
          imageUrl,
          city,
          industry,
          employees,  
        },
        create: {
          userId:userId,
          name,
          description,
          isIndependentHire,
          imageUrl,
          city,
          industry,
          employees,  
          
        }
      });
          

      return {success:" compnay Details Saved"} 
    }   
      } catch (error) {
      return {error:" error to saved detaild"
  
      }
    }

  }