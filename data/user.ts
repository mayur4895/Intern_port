import { db } from "@/lib/db";

export const getUserByPhone = async (phone: string) => {
  try {
    const user = await db.user.findUnique({ where: {  
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
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};


export const getPhoneStatus = async (phone: string) => {
  try {
    const user = await db.user.findUnique({ where: { 
      phone,
      role:"EMPLOYER" 
    },select:{
      isphoneVerified:true
    }
   
  });
        console.log(user);
        
    return user;
  } catch {
    return null;
  }
};
