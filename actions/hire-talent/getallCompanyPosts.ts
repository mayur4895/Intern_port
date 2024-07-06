'use server';

import { db } from "@/lib/db";    
import { currentUser } from "@/lib/auth";

export const getAllPosts = async () => {
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
    
    const data = await db.post.findMany({
      where: {
         userId: LoginUser.id,
         
      },orderBy:{
        createdAt: "desc",
      }
    
    });
  
 console.log({"posts data are":data})
    return { success: "posts data", data };
  } catch (error) {
    console.log(error);
    return { error: "error fetching posts" };
  }
}
