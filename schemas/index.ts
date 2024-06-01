// utils/schemas.ts
import { z } from 'zod';
const phoneRegex =  /^\+?[1-9]\d{1,14}$/;
export const profileSchema = z.object({
   firstname: z.string().min(1, 'First name is required'),
  lastname: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  designation : z.string().min(1, 'Designation required'),
   phone: z.string().refine((phone) => phoneRegex.test(phone), {
    message: 'Invalid phone number format.',
}),
role:z.optional(z.string())
});

export const companySchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  position: z.string().min(1, 'Position is required'),
});

export const submitSchema = z.object({
  terms: z.boolean().refine(val => val === true, 'You must accept the terms and conditions'),
});

export type ProfileData = z.infer<typeof profileSchema>;
export type CompanyData = z.infer<typeof companySchema>;
export type SubmitData = z.infer<typeof submitSchema>;
