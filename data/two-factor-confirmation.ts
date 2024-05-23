import { db } from "@/lib/db";





export const getTwoFactorConfirmationByUserId = async(id:string) =>{
try {
    const TwofactorConfirmation = await  db.twoFactorConfirmation.findUnique({
        where:{id}
    })

    return TwofactorConfirmation;
} catch (error) {
    return null;
}
}