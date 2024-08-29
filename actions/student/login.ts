"use server";

import { signIn } from "@/auth";
 
import { getUserByEmail } from "@/data/user";
import { generateTowFactorToken, generateVerificationToken } from "@/lib/Tokens";
import { db } from "@/lib/db";
import { SendTwoFactorTokenEmail, SendVerificationEmail } from "@/lib/mail";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import LoginSchema from "@/schemas/LoginSchema";
import { AuthError } from "next-auth";
import z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }
  const { email, password, code} = validatedFields.data;

  const ExistUser = await getUserByEmail(email);

  if (!ExistUser || !ExistUser.email || !ExistUser.password) {
    return { error: "User does not exist" };
  }

 
  if (ExistUser.role !== "STUDENT") {
    return { error: `Invalid User` };
  }

  if (!ExistUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email);
    if (verificationToken.email && verificationToken.token) {
      await SendVerificationEmail(verificationToken.email, verificationToken.token);
    }
    return { success: "Confirmation Email Sent" };
  }

   

  try {
  await signIn("credentials", {
      email: email,
      password: password, 
    });

  

    return { success: "Logged In" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "OAuthAccountNotLinked":
          return { OAuthAccountNotLinked: "Invalid credentials", status: "error" };
        case "CredentialsSignin":
          throw error;
        default:
          return { error: "Something went wrong", status: "error" };
      }
    }
  }
};
