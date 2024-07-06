import { db } from "@/lib/db";
import credentials from "next-auth/providers/credentials";

export const getUserByPhone = async (phone: string) => {
  try {
    const user = await db.user.findFirst({ where: {  
      phone:phone,
      role:"EMPLOYER"
    } });

    return user;
  } catch {
    return null;
  }
};
 

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique( {
      where:{
        id,  
      },select:{
        id:true,
        phone:true,
        name:true,
        role:true,
        isPhoneVerified:true,
        email:true,
        emailVerified:true,
        isTwoFactorEnabled:true,
        designation:true,
        companyDetails:true,
      }
    });

    return user;
  } catch {
    return null;
  }
};


export const getPhoneStatus = async (phone: string) => {
  try {
    const user = await db.user.findFirst({ where: { 
      phone,
      role:"EMPLOYER" 
    },select:{
       isPhoneVerified:true
    }
   
  });
        console.log(user);
        
    return user;
  } catch {
    return null;
  }
};
