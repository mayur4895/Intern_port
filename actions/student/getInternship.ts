'use server';

import { db } from "@/lib/db";    

export const getInternship = async (postId: string) => {
  try {   
    const data = await db.post.findUnique({ 
      where: {
        id: postId
      }
    });

    if (!data) {
      throw new Error("Post not found");
    }

    return data; 
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching post");
  }
}
