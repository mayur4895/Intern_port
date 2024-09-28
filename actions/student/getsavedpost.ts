'use server';

import { db } from "@/lib/db";
import {   Post } from '@prisma/client';

 
const isValidObjectId = (id: string): boolean => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

export const getSavedPost = async (studentId: string): Promise<{ data?:any, error?: string }> => {
  if (!isValidObjectId(studentId)) {
    return { error: 'Invalid ObjectId: Must be a 24-character hex string' };
  }

  try {
     
    const data = await  db.savedPost.findMany({
        where: {
            userId:studentId
         },
        include: {
           post:true
        },
      });

    if (!data) {
      return { error: ' Post not found not found' };
    }
   
   
  return {data}
  } catch (error) {
    console.error('Failed to retrieve Candidates:', error);
    return { error: 'Failed to retrieve Candidates' };
  }
};