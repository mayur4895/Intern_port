'use client';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
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
import { Select } from '@/components/ui/select';  // Assuming this is the select component from Shadcn UI
import { SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { postFormSchema } from '@/schemas';
import { Badge } from '@/components/ui/badge';
import { CurrentUser } from '@/hooks/use-current-user';
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle } from "lucide-react";
import { getCompnayDetails } from "@/actions/hire-talent/getcompnayDetails";
import { UserType } from "@prisma/client";

const PostFormpage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentUser = CurrentUser();

  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      internship_profile: '',
      required_skills: [],
      internship_type:'in office',
      part_or_full_time:'full-time' ,
      cities:[],
      near_city:false,
      no_of_openings:'',
      // internship_start_date:'Immediately (within next 30 days)'


    },
  });

  async function onSubmit(data: z.infer<typeof postFormSchema>) {
    console.log(data);
  }

  const getCompnayData = async () => {
    try {
 
      const res = await getCompnayDetails(currentUser?.id);
 
          if(!res?.data){
            toast({
              title: "Please fill the company details",
              variant: "destructive",
            });
            router.push("/hire-talent/company")
          }  
   
    } catch (error) {
      console.error(error);
    }  
  };
 

  const [newSkill, setNewSkill] = useState('');
  const requiredSkills = form.watch('required_skills');
  const [newCity, setNewCity] = useState('');
  const Cities = form.watch('cities');
  const addSkill = () => {
    if (newSkill && !requiredSkills.includes(newSkill)) {
      form.setValue('required_skills', [...requiredSkills, newSkill]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    form.setValue('required_skills', requiredSkills.filter(skill => skill !== skillToRemove));
  };


  const addCity = () => {
    if (newCity && !Cities.includes(newCity)) {
      form.setValue('cities', [...Cities, newCity]);
      setNewCity('');
    }
  };

  const removeCity = (CityToRemove: string) => {
    form.setValue('cities', Cities.filter(City => City !== CityToRemove));
  };

  useEffect(() => {
    if (!currentUser) {
      redirect('/auth/login');
    }
    if(currentUser &&  !currentUser.isphoneVerified && currentUser.role ==  UserType.EMPLOYER ) {
      router.push("/hire-talent/profile")
  }

   
    
    getCompnayData();
 
  }, [currentUser]);
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="w-full flex flex-col items-center justify-center">
        <h2 className="text-3xl">Post internship.</h2>
        <br />
        <Form {...form}>
          <h2 className="flex items-start mb-4 font-semibold lg:w-2/4 w-full">Internship Details</h2>

          <form onSubmit={form.handleSubmit(onSubmit)} className="lg:w-2/4 w-full space-y-6 border p-4">
            <FormField
              control={form.control}
              name="internship_profile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Internship Profile</FormLabel>
                  <FormControl>
                    <Input placeholder="internship profile" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
 
    <div className='flex  gap-4 w-full items-end'>  
           <FormField
              control={form.control}
              
              name="required_skills"
              render={() => (
                <FormItem  className='w-full' > 
                  <FormLabel>Required Skills</FormLabel>
                   
            <div>
              {requiredSkills.length > 0 && (
                <ul className="flex flex-wrap gap-2">
                  {requiredSkills.map((skill, index) => (
                    <Badge key={index} className="pl-5 py-0 flex justify-between items-center">
                      {skill}
                      <Button
                        className='bg-transparent hover:bg-transparent'
                        size="icon"
                        type="button"
                        onClick={() => removeSkill(skill)}
                        aria-label="Remove"
                      >
                        ✕
                      </Button>
                    </Badge>
                  ))}
                </ul>
              )}
            </div>
                  <FormControl>
                    <Select
                      
                      onValueChange={value => setNewSkill(value)}
                      value={newSkill}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a skill" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="JavaScript">JavaScript</SelectItem>
                        <SelectItem value="TypeScript">TypeScript</SelectItem>
                        <SelectItem value="React">React</SelectItem>
                        <SelectItem value="Node.js">Node.js</SelectItem>
                        <SelectItem value="Mongodb">Mongodb</SelectItem> 
                        <SelectItem value="Tailwind">Tailwind</SelectItem>
                        <SelectItem value="Redux">Redux</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
               <div>
               <Button type="button" onClick={addSkill}>Add</Button>
               </div>
          </div>
           <FormField
          control={form.control}
          name="internship_type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Internship Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange} 
                  defaultValue="in office"
                  className="flex flex-row  space-x-2"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="in office" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      In office
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Hybrid" />
                    </FormControl>
                    <FormLabel className="font-normal">
                        Hybrid
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="remote" />
                    </FormControl>
                    <FormLabel className="font-normal">Remote</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
             <FormField
          control={form.control}
          name="part_or_full_time"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Part-time/Full-time</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange} 
                  defaultValue="full-time"
                  className="flex flex-row  space-x-2"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="full-time" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Full-time
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="part-time" />
                    </FormControl>
                    <FormLabel className="font-normal">
                        Part-time
                    </FormLabel>
                  </FormItem> 
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        
    <div className='flex  gap-4 w-full items-end'>  
           <FormField
              control={form.control}
              
              name="cities"
              render={() => (
                <FormItem  className='w-full' > 
                  <FormLabel>City/Cities</FormLabel>
                   
            <div>
              {Cities.length > 0 && (
                <ul className="flex flex-wrap gap-2">
                  {Cities.map((city, index) => (
                    <Badge key={index} className="pl-5 py-0 flex justify-between items-center">
                      {city}
                      <Button
                        className='bg-transparent hover:bg-transparent'
                        size="icon"
                        type="button"
                        onClick={() => removeCity(city)}
                        aria-label="Remove"
                      >
                        ✕
                      </Button>
                    </Badge>
                  ))}
                </ul>
              )}
            </div>
                  <FormControl>
                    <Select
                      
                      onValueChange={value => setNewCity(value)}
                      value={newCity}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="e.g pune" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pune">Pune</SelectItem>
                        <SelectItem value="Mumbai">Mumbai</SelectItem>
                        <SelectItem value="Nashik">Nashik</SelectItem> 
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
               <div>
               <Button type="button" onClick={addCity}>Add</Button>
               </div>
          </div>
          <div className=" border text-xs text-gray-600 flex items-center gap-3 p-2">
                       <AlertCircle size={18} />   
We will allow candidates who are from or willing to relocate to the given location(s) to apply.
                       </div>

          <FormField
              control={form.control}
              name="near_city"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                  <FormControl>
                    <Checkbox
                      checked={field.value} 
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-2 leading-none">
              
                    <FormLabel className="text-gray-600 ">
                    Allow applications only from the above or neighboring cities
                    </FormLabel>
                    
              {
                   form.getValues('near_city') == true &&    (<div className="flex items-center gap-2 text-xs mt-1 text-gray-600 bg-yellow-50 border border-yellow-500 p-4"> 
                       <AlertCircle className=" text-yellow-600"/>
 Selecting this option may impact the visibility of your listing and result in fewer applications.
                     </div>)
              }
                  </div>
                </FormItem>
              )}
            />
    <FormField
              control={form.control}
              name="no_of_openings"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of openings</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g 4" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


          










            <div className="flex items-center justify-between">
              {(pathname === '/hire-talent/company' || pathname === '/hire-talent/postjob') && (
                <Button
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    return window.location.replace('/hire-talent/profile');
                  }}
                >
                  Prev
                </Button>
              )}
              <Button type="submit" className="ml-auto">
                Next
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PostFormpage;
