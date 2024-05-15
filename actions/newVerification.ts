'use server'
import { getValidateTokenbyEmail, getValidateTokenbyToken } from "@/data/validateToken"
import { db } from "@/lib/db";



export const NewVerification = async(token:string)=>{



console.log(token);

    
const ExistingToken =    await  getValidateTokenbyToken(token)
 

if(!ExistingToken){
    return {error:"Token does not exist"}
}
 
 if(!ExistingToken.expires || !ExistingToken.email || !ExistingToken.token)     return {error:"Token does not exist"}

const hasExpired = new Date(ExistingToken.expires) < new Date();
if(hasExpired){
    return {error:"Token has expired"}
}
 


const ExistingUser = await getValidateTokenbyEmail(ExistingToken.email);

 

if(!ExistingUser){
    return {error:"Email does not exist"}
}
 
console.log(ExistingUser.id + ExistingUser.email);

await db.user.updateMany({ 
    where:{
   id : "66445815d3e25784b3cb704d"   // here is the error occur to id matching afte r i solve it
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