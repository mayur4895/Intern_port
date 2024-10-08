// utils/schemas.ts
import { isValid, parseISO } from 'date-fns';
import { z } from 'zod';
const parseDate = (val: unknown): Date | undefined => {
  if (val === null || val === undefined || val === '') {
    return undefined;
  }
  const parsedDate = parseISO(val as string);
  if (!isValid(parsedDate)) {  
    return undefined;
  }
  return parsedDate;
};
const phoneRegex =  /^\+?[1-9]\d{1,14}$/;

export const profileSchema = z.object({
  firstname: z.string().min(1, 'This field is required'),
  lastname: z.string().min(1, 'This field is required'),
  email: z.string().email('Invalid email address'),
  designation: z.string().min(1, 'This field is required'),
  phone: z.string().refine((phone) => phoneRegex.test(phone), {
    message: 'Invalid phone number format.',
  }),
  role: z.optional(z.string())
});

export const companySchema = z.object({
  name: z.string(),
  description: z.string().min(30, {
    message: " company details must be at least 30 characters.",
  }) ,
  isIndependentHire: z.boolean().default(false),
  city: z.string().min(1, 'This field is required'),
  departmentId: z.string().optional(), 
  industry: z.string({
    required_error: "Please select an industry.",
  }),
  employees: z.string({
    required_error: "Please select number of employees",
  }),
  imageUrl: z.string({
    required_error: "Please select a logo"
  })
});

export const postFormSchema = z.object({
  internshipProfile: z.string().min(1, "This field is required"),
  requiredSkills: z.array(z.string().min(1, 'Skill cannot be empty')).min(1, 'At least one skill is required'),
  internshipType: z.enum(["in office", "Hybrid", "remote"]),
  noOfDaysInOfficeInWeek: z.string().optional(),
  partOrFullTime: z.enum(["part-time", "full-time"]),
  cities: z.array(z.string().min(1, 'City cannot be empty')),
  ISnearCity: z.boolean().default(false).optional(),
  noOfOpenings: z.string().regex(/^[1-9]\d*$/, {
    message: "Number of openings must be a positive integer",
  }),  
  fromStart:  z.date().optional(),
  toEnd: z.date().optional(),
  internshipStartDate: z.enum(["Immediately", "Later"]),
  internshipDuration: z.string({
    required_error: "Please select a duration.",
  }),
  MonthOrWeeks: z.enum(["Months", "Weeks"]),
  InternResponsibilities: z.string().min(100, {
    message: "Please enter at least 100 characters.",
  }),
  whoCanApply: z.string().min(30, {
    message: "Please enter at least 30 characters.",
  }),
  additionalPreferences: z.string().min(60, {
    message: "Please enter at least 60 characters.",
  }) 
}).refine((data) => {
  if (data.internshipType === 'Hybrid') {
    return data.noOfDaysInOfficeInWeek && data.noOfDaysInOfficeInWeek.trim().length > 0;
  }
  return true;
}, {
  message: "Please select a number of days.",
  path: ['noOfDaysInOfficeInWeek']
}).refine((data) => {
  if (data.internshipType !== 'remote') {
    return data.cities && data.cities.length > 0;
  }
  return true;
}, {
  message: "Please specify at least one city.",
  path: ['cities']
}).refine((data)=>{
  if(data.internshipStartDate ===  "Later"){
    return  data.fromStart && data.fromStart !== undefined; 
  }
  return true
},{
  message:"required",
  path:['fromStart' ,]
}).refine((data)=>{
  if(data.internshipStartDate ===  "Later"){
    return  data.toEnd && data.toEnd !== undefined; 
  }
  return true
},{
  message:"required",
  path:['toEnd' ,]
})

export type ProfileData = z.infer<typeof profileSchema>;
export type CompanyData = z.infer<typeof companySchema>;
export type SubmitData = z.infer<typeof postFormSchema>;
