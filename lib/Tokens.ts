import { v4 as uuid } from "uuid"
import { db } from "./db";
import { getValidateTokenbyEmail } from "@/data/validateToken";




export const generateVerificationToken= async(email:string)=>{


    const token = uuid();
    const expires = new Date (new Date().getTime() + 3600 *1000);
   
  
    
    const existingToken =  await getValidateTokenbyEmail(email);


    if(existingToken){
        await db.verificationToken.delete({
            where:{id:existingToken.id},
            
        })
    }
   

    const verificationToken = await db.verificationToken.create({
        data:{
            token,
            expires,
            email
        }
    }) 
  
    return verificationToken;

}