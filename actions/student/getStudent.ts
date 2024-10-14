'use server';

import { db } from "@/lib/db";
import { Post, User } from '@prisma/client';

 
const isValidObjectId = (id: string): boolean => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

export const getStudent = async (studentId: string): Promise<{ data?: User, error?: string }> => {
  if (!isValidObjectId(studentId)) {
    return { error: 'Invalid ObjectId: Must be a 24-character hex string' };
  }

  try {
    const data = await db.user.findUnique({
      where: {
        id: studentId,
      },
    });

    if (!data) {
      return { error: 'student not found' };
    }

      return {data}
  } catch (error) {
    console.error('Failed to retrieve student:', error);
    return { error: 'Failed to retrieve student' };
  }
};