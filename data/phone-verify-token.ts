import { db } from "@/lib/db"; 
 
export const getPhoneVerifyOtpbyPhone = async(phone:string)=>{
  
    try {
        const PhoneVerifyOtp = await db.phoneVerificationOtp.findUnique({
            where: {phone},
        }); 
             
       
     return PhoneVerifyOtp;
    } catch (error) {
        return null;
           
    }
}


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




