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
  name:z.string().min(1,"required"),
  description: z
  .string()
  .min(30, {
    message: "Bio must be at least 30 characters.",
  })
  .max(160, {
    message: "Bio must not be longer than 0 characters.",
  }), 
  isIndependentHire: z.boolean().default(false).optional(),

  city:z.string().min(1, 'This field is required'),


  industry: z
  .string({
    required_error: "Please select an industry.",
  }),
 
  no_employees: z
  .string({
    required_error: "Please select no of employees",
  }), 
  imageUrl: z.string({required_error:"Please select logo"}).optional().or(z.literal('')),
 
 
});

export const postFormSchema = z.object({
  internship_profile:z.string().min(1,"required"),
  required_skills:z.array(z.string().min(1, 'Skill cannot be empty')).min(1, 'Skill cannot be empty')  
 

  // city:z.string().min(1, 'This field is required'),


  // industry: z
  // .string({
  //   required_error: "Please select an industry.",
  // }),
 
  // no_employees: z
  // .string({
  //   required_error: "Please select no of employees",
  // }), 
  // imageUrl: z.string({required_error:"Please select logo"}).optional().or(z.literal('')),
 
 
});


export type ProfileData = z.infer<typeof profileSchema>;
export type CompanyData = z.infer<typeof companySchema>;
export type SubmitData = z.infer<typeof postFormSchema>;
