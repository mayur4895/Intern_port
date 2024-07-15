"use server";

import { signIn } from "@/auth";
import { getTwoFactorTokenbyEmail } from "@/data/two-facror-token";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
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

  if (code) {
    console.log(code);

    const TwoFactorToken = await getTwoFactorTokenbyEmail(ExistUser.email);

    if (!TwoFactorToken) {
      return { error: "Invalid Code" };
    }

    if (TwoFactorToken.token !== code) {
      return { error: "Invalid Code" };
    }
    if (TwoFactorToken.expires) {
      const hasExpired = new Date(TwoFactorToken.expires) < new Date();
      if (hasExpired) {
        return { error: "Token has expired" };
      }
    }

    await db.twoFactorToken.delete({
      where: { id: TwoFactorToken.id }
    });

    const existingConfirmation = await getTwoFactorConfirmationByUserId(ExistUser.id);

    if (existingConfirmation) {
      await db.twoFactorConfirmation.delete({
        where: { id: existingConfirmation.id }
      });
    }

    await db.twoFactorConfirmation.create({
      data: {
        userId: ExistUser.id
      }
    });
  } else {
    if (ExistUser.isTwoFactorEnabled && ExistUser.email) {
      const twoFactorToken = await generateTowFactorToken(ExistUser.email);
      if (twoFactorToken.email && twoFactorToken.token) {
        await SendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);
        return { twoFactor: true };
      }
    }
  }

  try {
  await signIn("credentials", {
      email: email,
      password: password,
      redirectTo: DEFAULT_LOGIN_REDIRECT
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
