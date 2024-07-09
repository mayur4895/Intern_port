'use server';

import { db } from "@/lib/db";
import z from "zod";
 
import { currentUser } from "@/lib/auth";

export const ApplyToInternshipPost = async (values:any, postId: string) => {
  const loginUser = await currentUser();

  if (!loginUser) {
    return { error: "User not authenticated" };
  }

  try {
 

 

     

    const post = await db.post.findUnique({
      where: {
        id: postId
      },
      include: {
        applications: true
      }
    });

    if (!post) {
      return { error: "Post does not exist" };
    }

    
    const existingApplication = post.applications.find(app => app.studentId === loginUser.id);
    if (existingApplication) {
      return { error: "You have already applied to this post" };
    }

    await db.application.create({
      data: {
        studentId: loginUser.id,
        postId: post.id,  
      }
    });

 
    await db.post.update({
      where: { id: post.id },
      data: {
        applicationsCount: post.applicationsCount + 1,
 
      }
    });

    return { success: "Application submitted" };
  } catch (error) {
    console.error(error);
    return { error: "Error occurred while applying to the post" };
  }
};
