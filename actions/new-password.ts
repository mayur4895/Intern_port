'use server'

import { getPasswordResetTokenbyToken } from "@/data/password-reset-token"
import { getUserByEmail } from "@/data/user"
 import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import NewPasswordSchema from "@/schemas/NewPasswordSchema"
import  * as  z  from "zod"

  

export const NewPssword = async(
    values:z.infer<typeof  NewPasswordSchema>,
    token?:string | null
) => {
    if(!token){
        return {error:"missing Token"}
    }


    const validateFields = NewPasswordSchema.safeParse(values);


    if(!validateFields.success){
        return   {error: "Invlaid Fields"}
    }

    const {password} = validateFields.data;
    const ExistingToken =    await getPasswordResetTokenbyToken(token)
 

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
     
     

    const hashPassword = await  bcrypt.hash(password,10)
    
    await db.user.updateMany({ 
        where:{
       id: ExistingUser.id   
        },
        data:{  
            password:hashPassword,
         
        }
    })
     
    
    await db.passwordResetToken.delete({
        where:{id:ExistingToken.id}
    })
 

    return {success:"Password reset successfully"}
}