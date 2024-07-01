'use server'
import { getUserByPhone } from "@/data/user";
import { getValidateOtpbyOtp } from "@/data/validateToken";
 
import { db } from "@/lib/db";



export const PhoneVerify = async(otp:string)=>{ 
   try {
    
const ExistingToken =    await   getValidateOtpbyOtp(otp)
 
 

if(!ExistingToken){
    return {error:"Invalid Otp"}
}
 
 if(!ExistingToken.expires || !ExistingToken.phone || !ExistingToken.otp)     return {error:"Token does not exist"}

const hasExpired = new Date(ExistingToken.expires) < new Date();
if(hasExpired){
    return {error:"Otp has expired"}
}
 


const ExistingUser = await getUserByPhone(ExistingToken.phone); 

if(!ExistingUser){
    return {error:"phone does not exist"}
}
 
 

await db.user.updateMany({ 
    where:{
   id: ExistingUser.id 
    },
    data:{  
         isPhoneVerified:  true,
        phone:ExistingToken.phone
    }
})
 

await db.phoneVerificationOtp.delete({
    where:{id:ExistingToken.id}
})
return {success:"phone Verified"}  
   } catch (error) {
    console.log(error);
    return {error:"Something went wrong"}
    
   }
}