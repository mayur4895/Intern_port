'use server'
import { db } from "@/lib/db";
import { companySchema } from "@/schemas";
import { z } from "zod";

export const CompanyRegister = async (values: z.infer<typeof companySchema>, userId: string) => {
  try {
    const validatedFields = companySchema.safeParse(values);

    if (!validatedFields.success) {
      console.error("Validation errors:", validatedFields.error.format());
      return { error: "Invalid Fields" };
    }

    const { name, isIndependentHire, city, description, imageUrl, industry, employees, departmentId } = validatedFields.data;

    const result = await db.companyDetails.upsert({
      where: { userId: userId },
      update: {
        name,
        description,
        isIndependentHire,
        imageUrl,
        city,
        industry,
        departmentId: departmentId || null,
        employees,
      },
      create: {
        userId: userId,
        name,
        description,
        isIndependentHire,
        imageUrl,
        city,
        industry,
        departmentId,
        employees,
      }
    });

    console.log("Upsert result:", result);
    return { success: "Company Details Saved" };
  } catch (error) {
    console.error("Error saving details:", error);
    return { error: "Error saving details" };
  }
};
