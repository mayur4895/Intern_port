'use server'
import { db } from "@/lib/db";
import { error } from "console";

 

export const checkPhoneStatus = async (userId: string,phone:string) => { 
  try {
 
 

 const user = await db.user.findUnique({
  where:{
    id:userId,
    role:"EMPLOYER",
    phone:phone,
     isPhoneVerified:true
  }
 })



 
if(!user){
  return {error:"phone not verify or user not exist"}
}
 if(user){
  return {success:"Phone is verify"}
 } 

 
 
  
  } catch (error) {
    console.error('Error checking phone status:', error);
    return { error:"something went wrong" };
  }
};
