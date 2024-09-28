'use server';

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export const SavePost = async (postId: string) => {
  const loginUser = await currentUser();

  if (!loginUser) {
    return { error: "User not authenticated" };
  }

  try {
    const userId = loginUser.id;
    const userExist = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userExist) {
      return { error: "User does not exist" };
    }

    if (userExist.role !== "STUDENT") {
      return { error: "Only STUDENT can save Post" };
    }

    if (userId && postId) {
      // Check if the application is already saved
      const alreadySaved = await db.savedPost.findUnique({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });

      if (alreadySaved) {
        return { error: "POst is already saved" };
      }

     
      await db.savedPost.create({
        data: {
          userId,
          postId,
        },
      });

      return { success: "Post saved" };
    } else {
      return { error: "Post not found" };
    }
  } catch (error) {
    return { error: "Error occurred while saving Post" };
  }
};
