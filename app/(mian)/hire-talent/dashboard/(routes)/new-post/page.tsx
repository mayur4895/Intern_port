'use client';
 
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { addDays, format } from 'date-fns';

import React, { useEffect, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import {  z } from 'zod';

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
 
 
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, CalendarIcon, Loader2 } from "lucide-react";
 
 
import { CreateInternshipPost } from "@/actions/hire-talent/createInternshipPost";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
 
import RichTextEditor from "@/components/hire-talent/ReactQuill";
import dynamic from "next/dynamic";
import { CurrentUser } from "@/hooks/use-current-user";
 
 
 
 
 
const WhoCanApply = dynamic(() =>   import("@/components/hire-talent/new-post/WhoCanApply"));
const SelectCitties = dynamic(() =>  import("@/components/hire-talent/new-post/CitiesComponent"));
const SelectSkillSet = dynamic(() =>import("@/components/hire-talent/new-post/SelectSkills") );

 
 

const  NewPostPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const  currentUser  =   CurrentUser();
  const [IsLoading,setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      internshipProfile: '',
      requiredSkills: [],
      internshipType:'in office',
      partOrFullTime:'full-time' ,
      cities:[],
      ISnearCity:false,
      noOfOpenings:'',
      internshipStartDate: 'Immediately',   
      internshipDuration:'',
      MonthOrWeeks:'Months',
      InternResponsibilities: ' Selected interns day-to-day responsibilities include:  ',
      whoCanApply: '',
      additionalPreferences:'',
      noOfDaysInOfficeInWeek:'',
      fromStart:undefined,
      toEnd: undefined
    },
  });

  async function onSubmit(data: z.infer<typeof postFormSchema>) {
  console.log(data)
  try {
    setIsLoading(true);
    const res =  await CreateInternshipPost(data, currentUser.id);
    if (res?.success) {
      setIsLoading(false);
      toast({ title: res.success, variant: "success" });  
      router.push("/hire-talent/dashboard/posts");
    
    }else {
      toast({ title: res?.error, variant: "destructive" });
      setIsLoading(false)
    }
  } catch (error) {
    console.log(error);
    setIsLoading(false)
    form.reset();
    
  }finally{
    setIsLoading(false);
  }
  }
 
 
 
  useEffect(() => {
    if (!currentUser) {
      redirect('/auth/login');
    }
     
  }, [currentUser]);
 
 
  return (
    <> 
    {IsLoading && (
       <div className="h-full z-50 w-full fixed  flex top-0 left-0 items-center bg-white justify-center">
       <Loader2 className=" animate-spin" size={24}/>
    </div>
    )}
    <div className="flex items-center justify-center h-full w-full">
      <div className="w-full flex flex-col items-center justify-center">
 
        <br />
        <Form {...form}>
          <h2 className="flex items-start mb-4 font-semibold lg:w-3/4 w-full">Internship Details</h2>

          <form onSubmit={form.handleSubmit(onSubmit)} className="lg:w-3/4 w-full space-y-6 border p-4">
            <FormField
              control={form.control}
              name="internshipProfile"
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
 
           <FormField
          control={form.control}
          name="internshipType"
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
     name="requiredSkills"
     render={({ field }) => (
       <FormItem>
         <FormLabel>Required Skills</FormLabel>
         <FormControl>
              <SelectSkillSet value={field.value} onChange={field.onChange}/>
         </FormControl>
         <FormMessage />
       </FormItem>
     )}
   />
 

        { form.getValues('internshipType') === "Hybrid" && (
          <FormField
          control={form.control}
          name="noOfDaysInOfficeInWeek"
          render={({ field }) => (
            <FormItem className=" w-auto" >
              <FormLabel >No. of in-office days in a week: </FormLabel>   
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Days" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem> 
                </SelectContent>
                </Select> 
              <FormMessage />
            </FormItem>
          )}
        />
        )}








             <FormField
          control={form.control}
          name="partOrFullTime"
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

        
 { form.getValues('internshipType') !== 'remote' && (
     <FormField
     control={form.control}
     name="cities"
     render={({ field }) => (
       <FormItem>
         <FormLabel>Cities</FormLabel>
         <FormControl>
               <SelectCitties value={field.value} onChange={field.onChange}/>
         </FormControl>
         <FormMessage />
       </FormItem>
     )}
   />
 )}

          <div className=" border text-xs text-gray-600 flex items-center gap-3 p-2">
                       <AlertCircle size={18} />   
We will allow candidates who are from or willing to relocate to the given location(s) to apply.
                       </div>

          <FormField
              control={form.control}
              name="ISnearCity"
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
                   form.getValues('ISnearCity') == true &&    (<div className="flex items-center gap-2 text-xs mt-1 text-gray-600 bg-yellow-50 border border-yellow-500 p-4"> 
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
              name="noOfOpenings"
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

<FormField
          control={form.control}
          name="internshipStartDate"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Internship start date</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange} 
                  defaultValue="Immediately"
                  className="flex flex-row  space-x-2"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Immediately" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Immediately (within next 30 days)
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Later" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Later
                    </FormLabel>
                  </FormItem> 
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

  
  {form.getValues('internshipStartDate') === 'Later' && 
  <div>
  <FormField
           control={form.control}
           name="fromStart"
           render={({ field }) => (
             <FormItem className="flex flex-col">
               <FormLabel>From</FormLabel>
               <Popover>
                 <PopoverTrigger asChild>
                   <FormControl>
                     <Button
                       variant={"outline"}
                       className={cn(
                         "w-[300px] pl-3 text-left font-normal",
                         !field.value && "text-muted-foreground"
                       )}
                     >
                       {field.value ? (
                         format(field.value, "PPP")
                       ) : (
                         <span>Pick a date</span>
                       )}
                       <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                     </Button>
                   </FormControl>
                 </PopoverTrigger>
                 <PopoverContent className="w-auto p-0" align="start">
                   <Calendar
                     mode="single"
                     selected={field.value}
                     onSelect={field.onChange}
                     disabled={(date) =>
                       date < new Date() || date < new Date("1900-01-01")
                     }
                     initialFocus
                   />
                 </PopoverContent>
               </Popover> 
               <FormMessage />
             </FormItem>
           )}
         />
 
 <FormField
           control={form.control}
           name="toEnd"
           render={({ field }) => (
             <FormItem className="flex flex-col">
               <FormLabel>To</FormLabel>
               <Popover>
                 <PopoverTrigger asChild>
                   <FormControl>
                     <Button
                       variant={"outline"}
                       className={cn(
                         "w-[300px] pl-3 text-left font-normal",
                         !field.value && "text-muted-foreground"
                       )}
                     >
                       {field.value ? (
                         format(field.value, "PPP")
                       ) : (
                         <span>Pick a date</span>
                       )}
                       <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                     </Button>
                   </FormControl>
                 </PopoverTrigger>
                 <PopoverContent className="w-auto p-0" align="start">
                   <Calendar
                     mode="single"
                     selected={field.value}
                     onSelect={field.onChange}
                     disabled={(date) =>
                       date < new Date() || date < new Date("1900-01-01")
                     }
                     initialFocus
                   />
                 </PopoverContent>
               </Popover> 
               <FormMessage />
             </FormItem>
           )}
         />
       
  </div>
  }
  <div className="  flex items-end w-full   gap-5 ">   
    <div className="  w-full  "> 
 <FormField
          control={form.control}
          name="internshipDuration"
          render={({ field }) => (
            <FormItem className=" w-full" >
              <FormLabel >Internship duration </FormLabel>
              <FormDescription> Shorter the duration, more the applications</FormDescription>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Duration" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                </SelectContent>
              </Select>
            
              <FormMessage />
            </FormItem>
          )}
        />

 
</div>
  <div className="  w-[250px]">
    
  <FormField
          control={form.control}
          name="MonthOrWeeks"
          render={({ field }) => (
            <FormItem> 
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue className="" placeholder="Select a Duration" defaultValue={"Months"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Months">Months</SelectItem>
                  <SelectItem value="Weeks">Weeks</SelectItem>
               
                </SelectContent>
              </Select>
            
              <FormMessage />
            </FormItem>
          )}
        />
  </div>

</div>
         

<FormField
                control={form.control}
                name="InternResponsibilities"
                render={({ field }) => (
                  <FormItem className=" ">
                    <FormLabel> Intern responsibilities</FormLabel>
                    <FormControl >
                    <RichTextEditor value={field.value} onChange={field.onChange}  />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />



<br /><br />
 


        <WhoCanApply form={form}/>      

        <FormField
                control={form.control}
                name="additionalPreferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Additional candidate preferences:</FormLabel>
                    <FormControl >
                    <RichTextEditor value={field.value} onChange={field.onChange}  />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />



 <br /><br />

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
                Create Post
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
    </>
  );
};

export default  NewPostPage;
