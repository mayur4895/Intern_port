'use server';

import { db } from "@/lib/db";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import parsePhoneNumberFromString from "libphonenumber-js";
import StudentProfileSchema from "@/schemas/student/profileSchema";
import { UserType } from "@prisma/client";

export const UpdatestudentProfile = async (values: z.infer<typeof StudentProfileSchema>, studentId: string) => {
  try {
    // Validate the input fields using Zod schema
    const validatedFields = StudentProfileSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid Fields" };
    }

    // Destructure the validated data
    const { firstname, lastname, email, phone, about, profilePicture, resumeUrl, urls } = validatedFields.data;

    // Parse and validate the phone number
    const parsedPhoneNumber = parsePhoneNumberFromString(phone, 'IN');
    if (!parsedPhoneNumber || !parsedPhoneNumber.isValid()) {
      return { error: "Invalid Phone number" };
    }

    const formattedPhoneNumber = parsedPhoneNumber.format('E.164');

    // Check if the user exists
    const userExist = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    // Check if the student profile exists
    const profileExist = await db.studentProfileDetails.findUnique({
      where: {
        userId: studentId,
      },
    });

    if (userExist && profileExist) {
      if (userExist.role == UserType.EMPLOYER) {
        return { error: "This email is already registered as an employer." };
      }

      // Update the student profile details
      await db.studentProfileDetails.update({
        where: {
          userId: studentId,
        },
        data: {
          firstname,
          lastname,
          description: about,
          profile: profilePicture,
          email: email,
          url: urls,
          resume: resumeUrl,
          phone: formattedPhoneNumber,
        },
      });

      return { success: "Profile updated successfully" };
    } else {
      return { error: "Error while updating profile. User or Profile not found." };
    }
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
