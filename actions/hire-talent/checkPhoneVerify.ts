import { db } from "@/lib/db";
import { error } from "console";

 

export const checkPhoneStatus = async (userId: string) => { 
  try {
 
 console.log(userId);
 
  
  } catch (error) {
    console.error('Error checking phone status:', error);
    return { error:"something went wrong" };
  }
};
