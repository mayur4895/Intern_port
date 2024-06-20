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
  name:z.string(),
  description: z.string().min(30, {
    message: "Bio must be at least 30 characters.",
  }).max(160, {
    message: "Bio must not be longer than 0 characters.",
  }), 
  isIndependentHire: z.boolean().default(false).optional(),

  city:z.string().min(1, 'This field is required'),


  industry: z
  .string({
    required_error: "Please select an industry.",
  }),
 
  employees:
  z.string({
    required_error: "Please select no of employees",
  }), 

  imageUrl: z.string({required_error:"Please select logo"}),
 
 
});

export const postFormSchema = z.object({
  internshipProfile:z.string().min(1,"required"),
  requiredSkills:z.array(z.string().min(1, 'Skill cannot be empty')).min(1, 'Skill cannot be empty')  ,
  internshipType: z.enum(["in office", "Hybrid", "remote"]  ),
  partOrFullTime: z.enum(["part-time", "full-time"]), 
   cities:z.array(z.string().min(1, 'city cannot be empty')).min(1, 'city cannot be empty')  ,

   ISnearCity: z.boolean().default(false).optional(),

   noOfOpenings: z.string().regex(/^[1-9]\d*$/, {
    message: "required",
  }),

  internshipStartDate: z.enum(["Immediately", "Later"]), 
    internshipDuration: z
   .string({
     required_error: "Please select an duration.",
   }),

   MonthOrWeeks: z.enum(["Months", "Weeks"]),
   InternResponsibilities: z.string().min(100, {
    message: "Please enter at least 100 characters.",
  }).max(500, {
    message: "less than 500 characters.",
  }), 
   whoCanApply: z.string().min(30, {
    message: "Please enter at least 30 characters",
  }), 
  additioalPreferences: z.string().min(60, {
    message: "Please enter at least 60 characters.",
  }).max(160, {
    message: "less than 160 characters",
  }), 

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
