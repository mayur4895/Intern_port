// utils/schemas.ts
import { z } from 'zod';
const phoneRegex =  /^\+?[1-9]\d{1,14}$/;
export const profileSchema = z.object({
   firstname: z.string().min(1, 'This field is required'),
  lastname: z.string().min(1, 'This field is required'),
  email: z.string().email('Invalid email address'),
  designation : z.string().min(1, 'This field is required'),
   phone: z.string().refine((phone) => phoneRegex.test(phone), {
    message: 'Invalid phone number format.',
}),
role:z.optional(z.string())
});

export const companySchema = z.object({
  name:z.optional(z.string().min(1,"required")),
  description: z
  .string()
  .min(10, {
    message: "Bio must be at least 10 characters.",
  })
  .max(160, {
    message: "Bio must not be longer than 30 characters.",
  }), 
  isCompanyHire: z.boolean().default(false).optional(),

  city:z.string().min(1, 'This field is required'),


  industry: z
  .string({
    required_error: "Please select an industry.",
  })
 
 
});

export const submitSchema = z.object({
  terms: z.boolean().refine(val => val === true, 'You must accept the terms and conditions'),
});

export type ProfileData = z.infer<typeof profileSchema>;
export type CompanyData = z.infer<typeof companySchema>;
export type SubmitData = z.infer<typeof submitSchema>;
