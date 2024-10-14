'use server'

import { db } from "@/lib/db";
import { ApplyFormSchema } from "@/schemas/applyformScehma";
import { z } from "zod";

export const applyToInternship = async (postId: string, studentId: string, values: z.infer<typeof ApplyFormSchema>) => {
  if (!postId) {
    return { error: 'Post ID is required' };
  }

  if (!studentId) {
    return { error: 'Student ID is required' };
  }

  try {
    const validatedFields = ApplyFormSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid Fields" };
    }

    const { resume } = validatedFields.data;

    const existingApplication = await db.application.findFirst({
      where: {
        postId,
        studentId,
      },
    });

    if (existingApplication) {
      return { error: 'You have already applied to this post' };
    }

    const student = await db.user.findUnique({
      where: { id: studentId },
    });

    if (!student) {
      return { error: 'Student not found' };
    }

    await db.application.create({
      data: {
        postId,
        studentId,
        status: 'Pending',
        createdAt: new Date(),
        resumeUrl: resume,
        studentName: student.name ?? "", // Assuming 'name' is a field in the User model
        profileUrl: "https://github.com/shadcn.png" ?? "", // Assuming 'profileUrl' is a field in the User model
      },
    });

    return { success: 'Application submitted successfully' };
  } catch (error) {
    console.log(error);
    return { error: 'Failed to submit application' };
  }
};
