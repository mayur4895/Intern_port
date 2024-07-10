'use server';

import { db } from "@/lib/db";
 
import { currentUser } from "@/lib/auth";

export const DeleteCompanyPost = async (postId: string) => {
  const loginUser = await currentUser();

  if (!loginUser) {
    return { error: "User not authenticated" };
  }

  try {
  

    const userExist = await db.user.findUnique({
      where: {
        id: loginUser.id
      }
    });

    if (!userExist) {
      return { error: "User does not exist" };
    }

    if (userExist.role !== "EMPLOYER") {
      return { error: "Only employers can Delete posts" };
    }

         
   
    

    await db.post.delete({
       where:{
       id: postId
       }
    });
    return { success: "Post Deleted" };
 
 
  } catch (error) {
 
    return { error: "Error occurred while Deleting post" };
  }
};
