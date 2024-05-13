import { db } from "@/lib/db";

export const getValidateTokenbyToken = async(token:string)=>{
  
    try {
        const verificationToken = db.verificationToken.findUnique({
            where: {
                token: token,
            },
        });

        return verificationToken
    } catch (error) {
        return null;
    }
}


export const getValidateTokenbyEmail = async(email:string)=>{
  
    try {
        const verificationToken = db.verificationToken.findFirst({
            where: {
                email: email,
            },
        });

        return verificationToken
    } catch (error) {
        return null;
    }
}