'use server';

import { db } from "@/lib/db";    
import { currentUser } from "@/lib/auth";

export const getCompanyDetails = async () => {
  const LoginUser = await currentUser();
   
  try { 
    const userExist = await db.user.findUnique({
      where: {
        id: LoginUser.id
      }
    });

    if (!userExist) {
      return { error: "something went wrong" };
    }

    if (userExist.role === "STUDENT") {
      return { error: "something went wrong" };
    }
    
    const data = await db.user.findUnique({
      where: {
        id: LoginUser.id,
      },
      include: {
        companyDetails: true,
      },
    });

    return { success: "company data", data };
  } catch (error) {
    console.log(error);
    return { error: "error fetching company details" };
  }
}
