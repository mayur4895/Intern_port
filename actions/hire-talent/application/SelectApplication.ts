  
'use server';

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export const selectApplicationForPost = async (applicationId: string) => {
  const loginUser = await currentUser();

  if (!loginUser) {
    return { error: "User not authenticated" };
  }

  try {
    const userId = loginUser.id;
    const userExist = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userExist) {
      return { error: "User does not exist" };
    }

    if (userExist.role !== "EMPLOYER") {
      return { error: "Only employers can save applications" };
    }

    if (userId && applicationId) {
    
      const alreadySelect = await db.application.findFirst({
        where:{
          id: applicationId,
          selected: true,
        
        }
      })

      if (alreadySelect) {
        return { error: "Application is already Select" };
      }
 
      await db.application.update({
        where: { id: applicationId },
        data: { selected: true , status:"selected" },
      });

      return { success: "Application Selected" };
    } else {
      return { error: "Application not found" };
    }
  } catch (error) {
    return { error: "Error occurred while Selecting application" };
  }
};
