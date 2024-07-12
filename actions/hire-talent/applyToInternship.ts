'use server'
import { db } from "@/lib/db";

export const applyToInternship = async (postId: string, studentId: string) => {
 

 console.log(studentId);
 

  if (!studentId) {
    return { error: 'Student ID is required' };
  }

  try {
    const existingApplication = await db.application.findFirst({
      where: {
        postId,
        studentId,
        status: 'Pending',  
      },
    });

    if (existingApplication) {
      return { error: 'You have already applied to this post' };
    }

    await db.application.create({
      data: {
        postId,
        studentId,
        status: 'Pending',
        createdAt: new Date(),
      },
    });

    return { success: 'Application submitted successfully' };

  } catch (error) {
    console.log(error);
    return { error: 'Failed to submit application' };
  }
};

export const getApplicationsByStudent = async (studentId: string) => {
  return await db.application.findMany({
    where: {
      studentId,
    },
    include: {
      post: true,
    },
  });
};
