'use server';

import { db } from "@/lib/db";
 
import { currentUser } from "@/lib/auth";
import { Application } from "@prisma/client";

export const DeleteApplicationOfPost = async (data:any) => {
  const loginUser = await currentUser();

  if (!loginUser) {
    return { error: "User not authenticated" };
  }

  try {
   console.log("delete form actions"); 
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
   

    if(data && data?.Application){
         
    await db.application.delete({
       where:{
       id: data?.Application?.id,
       postId: data?.Application?.postId,
       studentId: data?.Application?.studentId,

       }
    });
    return { success: "Application Deleted" };
} else{
    return { error: "Application is not found" };
}
 
  } catch (error) {
 
    return { error: "Error occurred while Deleting Application" };
  }
};
