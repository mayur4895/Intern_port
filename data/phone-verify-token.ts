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


 


 



