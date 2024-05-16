'use server'
import { getUserByEmail } from "@/data/user";
import { getValidateTokenbyEmail, getValidateTokenbyToken } from "@/data/validateToken"
import { db } from "@/lib/db";



export const NewVerification = async(token:string)=>{



 

    
const ExistingToken =    await getValidateTokenbyToken(token)
 

if(!ExistingToken){
    return {error:"Token does not exist"}
}
 
 if(!ExistingToken.expires || !ExistingToken.email || !ExistingToken.token)     return {error:"Token does not exist"}

const hasExpired = new Date(ExistingToken.expires) < new Date();
if(hasExpired){
    return {error:"Token has expired"}
}
 


const ExistingUser = await getUserByEmail(ExistingToken.email); 

if(!ExistingUser){
    return {error:"Email does not exist"}
}
 
 

await db.user.updateMany({ 
    where:{
   id: ExistingUser.id   
    },
    data:{  
        emailVerified:  new Date(),
        email:ExistingToken.email
    }
})
 

await db.verificationToken.delete({
    where:{id:ExistingToken.id}
})
return {success:"Email Verified"}
 
 
}