'use server';

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export const SaveApplicationOfPost = async (applicationId: string) => {
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

    if (userExist.role !== "EMPLOYER") {
      return { error: "Only employers can save applications" };
    }

    if (userId && applicationId) {
      // Check if the application is already saved
      const alreadySaved = await db.savedApplication.findUnique({
        where: {
          userId_applicationId: {
            userId,
            applicationId,
          },
        },
      });

      if (alreadySaved) {
        return { error: "Application is already saved" };
      }

      // Save the application
      await db.savedApplication.create({
        data: {
          userId,
          applicationId,
        },
      });

      return { success: "Application saved" };
    } else {
      return { error: "Application not found" };
    }
  } catch (error) {
    return { error: "Error occurred while saving application" };
  }
};
