// actions/hire-talent/applyToPost.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const applyToInternship = async (postId: string, studentId: string) => {
  try {
    const existingApplication = await prisma.application.findFirst({
      where: {
        postId,
        studentId,
      },
    });

    if (existingApplication) {
      return { error: 'You have already applied to this post' };
    }

    await prisma.application.create({
      data: {
        postId,
        studentId,
      },
    });

    return { success: 'Application submitted successfully' };
  } catch (error) {
   
    return { error: 'Failed to submit application' };
  }
};

export const getApplicationsByStudent = async (studentId: string) => {
  return await prisma.application.findMany({
    where: {
      studentId,
    },
    include: {
      post: true,
    },
  });
};
