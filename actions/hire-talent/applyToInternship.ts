'use server'
 
import { db } from "@/lib/db";
import { ApplyFormSchema } from "@/schemas/applyformScehma";
import { z } from "zod";

export const applyToInternship = async (postId: string, studentId: string,values: z.infer<typeof ApplyFormSchema>,) => {
 

 

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
  
    const { resume} = validatedFields.data
  

    const existingApplication = await db.application.findFirst({
      where: {
        postId,
        studentId,  
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
        resumeUrl:resume
         
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
