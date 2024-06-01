import { db } from "@/lib/db";








export const getValidateOtpbyOtp = async(otp:string)=>{
  
    try {
        const verificationOtp = await db.phoneVerificationOtp.findUnique({
            where: {otp},
        }); 
           
     return verificationOtp;
    } catch (error) {
        return null;
           
    }
}

 






// get validate token by email and token 


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
      
         
     return verificationToken;
 
    } catch (error) {
        return null;
    }
}