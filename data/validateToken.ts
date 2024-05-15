import { db } from "@/lib/db";

export const getValidateTokenbyToken = async(token:string)=>{
  
    try {
        const verificationToken = await db.verificationToken.findUnique({
            where: {token},
        });
          
           
       
     return verificationToken;
    } catch (error) {
        return null;
           
    }
}


export const getValidateTokenbyEmail = async(email:string)=>{
  
    try {
        const verificationToken = await db.verificationToken.findFirst({
            where: {
                email: email,
            },
        });
         console.log(verificationToken?.id);
         
     return verificationToken;
 
    } catch (error) {
        return null;
    }
}