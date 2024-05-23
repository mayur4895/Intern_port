import { db } from "@/lib/db";







export const getTwoFactorTokenbyToken = async(token:string)=>{
  
    try {
        const TwoFactorToken = await db.twoFactorToken.findUnique({
            where: {token},
        }); 
           
           
       
     return TwoFactorToken;
    } catch (error) {
        return null;
           
    }
}


export const getTwoFactorTokenbyEmail = async(email:string)=>{
  
    try {
        const TwoFactorToken = await db.twoFactorToken.findFirst({
            where: {
                email: email,
            },
        });
      
         
     return TwoFactorToken;
 
    } catch (error) {
        return null;
    }
}




