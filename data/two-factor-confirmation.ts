import { db } from "@/lib/db";





export const getTwoFactorConfirmationByUserId = async(userId:string) =>{
try {
    const TwofactorConfirmation = await  db.twoFactorConfirmation.findUnique({
        where:{userId}
    })

    return TwofactorConfirmation;
} catch (error) {
    return null;
}
}