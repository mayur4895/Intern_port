'use server';

import { db } from "@/lib/db";
import { Application, Post } from '@prisma/client';

const isValidObjectId = (id: string): boolean => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

export const getAppliedPost = async (studentId: string): Promise<{ appliedPosts?: (Application & { post: Post })[]; error?: string }> => {
  if (!isValidObjectId(studentId)) {
    return { error: 'Invalid ObjectId: Must be a 24-character hex string' };
  }

  try {
    if (!studentId) {
      return { error: 'Invalid studentId' };
    }

    const appliedPosts = await db.application.findMany({
      where: { studentId },
      include: {
        post: true,
      },
    });

    return { appliedPosts };
  } catch (error) {
    console.error('Failed to retrieve Applied Posts:', error);
    return { error: 'Failed to retrieve Applied Posts' };
  }
};
