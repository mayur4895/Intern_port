'use server';

import { db } from "@/lib/db";
import { Application, Post } from '@prisma/client';

 
const isValidObjectId = (id: string): boolean => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

export const getSavedApplicationsofPost = async (employerId: string): Promise<{ data?:any, error?: string }> => {
  if (!isValidObjectId(employerId)) {
    return { error: 'Invalid ObjectId: Must be a 24-character hex string' };
  }

  try {
     
    const data = await  db.savedApplication.findMany({
        where: {
            userId:employerId
         },
        include: {
          application: {
            include: {
              
              post: true,
            },
          },
        },
      });

    if (!data) {
      return { error: ' Application not found not found' };
    }
   
   
  return {data}
  } catch (error) {
    console.error('Failed to retrieve Candidates:', error);
    return { error: 'Failed to retrieve Candidates' };
  }
};