'use server';

import { db } from "@/lib/db";
import { Post, StudentProfileDetails, User } from '@prisma/client';

 
const isValidObjectId = (id: string): boolean => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

export const getStudentProfile = async (studentId: string): Promise<{ data?: StudentProfileDetails, error?: string }> => {
  if (!isValidObjectId(studentId)) {
    return { error: 'Invalid ObjectId: Must be a 24-character hex string' };
  }

  try {
    const data = await db.studentProfileDetails.findUnique({
        where: { userId: studentId },
        include: { user: true },
  
    });

    if (!data) {
      return { error: 'studentProfile not found' };
    }
       
      return {data}
  } catch (error) {
    console.error('Failed to retrieve student:', error);
    return { error: 'Failed to retrieve student' };
  }
};