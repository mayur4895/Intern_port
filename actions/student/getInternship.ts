'use server';

import { db } from "@/lib/db";    
import { Post } from '@prisma/client';

export const getInternship = async (postId: string): Promise<Post | null | undefined> => {
  
    const data = await db.post.findUnique({
      where: {
        id: postId
      }
    });
    return data;
  
};
