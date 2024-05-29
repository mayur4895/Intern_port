 
'use client'
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaCheck } from 'react-icons/fa';
import { profileSchema, companySchema, submitSchema, ProfileData, CompanyData, SubmitData } from '@/schemas';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const StepperForm = () => {
  const router = useRouter();
  const pathname = usePathname(); 
  const steps = [
    {
      title: 'Profile',
      url: '/hire-talent/profile',
      schema: profileSchema,
     
   
    },
    {
      title: 'Company',
      url: '/hire-talent/company',
      schema: companySchema,
      
    },
    {
      title: 'Submit',
      url: '/hire-talent/submit',
      schema: submitSchema,
    
    },
  ];
 
  const initialStep = steps.findIndex(step => step.url === pathname);
  const [step, setStep] = useState(initialStep >= 0 ? initialStep : 0);

 
 

  useEffect(() => {
    if (steps[step]?.url) {
      router.push(steps[step].url); 
    }
  }, [step, router, steps]);


  return (

    <>
     
    
    </>
  )
 
}
 export default StepperForm
 