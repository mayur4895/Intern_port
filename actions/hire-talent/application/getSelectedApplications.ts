'use server';

import { db } from "@/lib/db";
import { UserType } from '@prisma/client';

const isValidObjectId = (id: string): boolean => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

export const getSelectedApplicationsofPosts = async (employerId: string): Promise<{ data?: any, error?: string }> => {
  if (!isValidObjectId(employerId)) {
    return { error: 'Invalid ObjectId: Must be a 24-character hex string' };
  }

  try {
    const data = await db.user.findMany({
      where: { 
        id: employerId,
        role: UserType.EMPLOYER
      },
      include: {
        posts: {
          include: {
            applications: {
              where: {
                selected: true,
                status:"selected"
              },
              include: {
                student: true,  
                post: true,    
              }
            }
          }
        }
      }
    });

    if (!data.length) {
      return { error: 'No applications found for this employer.' };
    }

    return { data };
  } catch (error) {
    console.error('Failed to retrieve selected applications:', error);
    return { error: 'Failed to retrieve selected applications.' };
  }
};
