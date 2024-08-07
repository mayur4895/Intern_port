'use server';

import { db } from "@/lib/db";
import z from "zod";
import { postFormSchema } from "@/schemas";
import { currentUser } from "@/lib/auth";
import type { Application } from "@prisma/client";
 
export const CreateInternshipPost = async (values: z.infer<typeof postFormSchema>, userId: string) => {
  const loginUser = await currentUser();

  if (!loginUser) {
    return { error: "User not authenticated" };
  } 
  try {
    const validatedFields = postFormSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid Fields" };
    }

    const { 
      internshipProfile,
      internshipDuration,
      internshipType,
      internshipStartDate,
      cities,
      ISnearCity,
      requiredSkills,
      noOfOpenings,
      noOfDaysInOfficeInWeek,
      MonthOrWeeks,
      partOrFullTime,
      InternResponsibilities,
      whoCanApply,
      additionalPreferences
    } = validatedFields.data;

    const userExist = await db.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!userExist) {
      return { error: "User does not exist" };
    }

    if (userExist.role !== "EMPLOYER") {
      return { error: "Only employers can create posts" };
    }

    const companyDetails = await db.companyDetails.findUnique({
      where: {
        userId: userId
      }
    });
      
    if (!companyDetails) {
      return { error: "Company details not found for this user" };
    }

     const existingPost = await db.post.findUnique({
      where: {
        userId_internshipProfile: {
          userId: userId,
          internshipProfile: internshipProfile,
        },
      },
    });

    if (existingPost) {
      return { error: "A post with the same userId and internshipProfile already exists." };
    }

 

    await db.post.create({
      data: {  
        userId: userId,
        companyId: companyDetails.id,
        companyName: companyDetails.name,
        companyLogo: companyDetails.imageUrl,
        internshipProfile,
        internshipDuration,
        internshipType,
        internshipStartDate,
        cities,
         isNearCity:ISnearCity,
        requiredSkills,
        noOfOpenings,
        noOfDaysInOfficeInWeek,
        monthOrWeeks:MonthOrWeeks,
        partOrFullTime,
         internResponsibilities:InternResponsibilities,
        whoCanApply,
        additionalPreferences,    
      }
    });

    return { success: "Post Created" };
  } catch (error) {
    console.error(error);
    return { error: "Error occurred while creating post" };
  }
};
