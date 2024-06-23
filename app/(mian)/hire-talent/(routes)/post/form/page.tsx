'use client';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { addDays, format } from 'date-fns';

import React, { useEffect, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { ZodAny, date, z } from 'zod';

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
import { AlertCircle, CalendarIcon, Loader2 } from "lucide-react";
import { getCompnayDetails } from "@/actions/hire-talent/getcompnayDetails";
import { UserType } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";
import { CreateInternshipPost } from "@/actions/hire-talent/createInternshipPost";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const PostFormpage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentUser = CurrentUser();
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
      additioalPreferences:'',
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
      toast({ title: res.success, variant: "success" }); 
      setIsLoading(false) 
    }else {
      toast({ title: res?.error, variant: "destructive" });
      setIsLoading(false)
    }
  } catch (error) {
    console.log(error);
    setIsLoading(false)
    form.reset();
    
  }finally{
    setIsLoading(false)
  }
  }

  const getCompnayData = async () => {
    try {
 
      const res = await getCompnayDetails();
        if(res?.data?.compnayDetails){
           if(res.data.compnayDetails.length <= 0){
            toast({
              title: "Please fill the company details",
              variant: "destructive",
            });
            router.push("/hire-talent/company")
           }
        }
   
    } catch (error) {
      console.error(error);
    }  
  };
 
   

  const [newSkill, setNewSkill] = useState('');
  const requiredSkills = form.watch('requiredSkills');
  const [newCity, setNewCity] = useState('');
  const Cities = form.watch('cities');
  const addSkill = () => {
    if (newSkill && !requiredSkills.includes(newSkill)) {
      form.setValue('requiredSkills', [...requiredSkills, newSkill]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    form.setValue('requiredSkills', requiredSkills.filter(skill => skill !== skillToRemove));
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






  useEffect(()=>{
     const InternType = form.getValues('internshipType');
     const partOrFullTime = form.getValues('partOrFullTime');
     const internshipStartDate = form.getValues('internshipStartDate');
     const internshipDuration = form.getValues('internshipDuration');
     const MonthOrWeeks = form.getValues('MonthOrWeeks');
    const fromStart  = form.getValues('fromStart');
    const toEnd = form.getValues('toEnd');

     const currentDate = new Date(); 
     const futureDate = addDays(currentDate,15) 
     const formattedFutureDate = format(futureDate, "do MMM yyyy"); 
     const formattedCurrentDate = format(currentDate, "do MMM yyyy");
     
     if( form.getValues('internshipStartDate') === "Immediately"){
      form.setValue('fromStart', undefined)
      form.setValue('toEnd', undefined)
     }  
let formatedFrom ;
let formatedTo;
     if(form.getValues('internshipStartDate') === "Later" && fromStart !==undefined  &&  toEnd !== undefined){
      formatedFrom   = format(fromStart,"do MMM yyyy") 
      formatedTo = format( toEnd,"do MMM yyyy")
     }
     

     const formatedScript = `  
      Only those candidates can apply who:
      • have relevant skills and interests
      • are available for ${partOrFullTime === 'part-time' ? 'part time' : 'full time'} ${InternType === 'in office' || InternType === "Hybrid" ? '(in-office)' : 'work from home/'} internship
      ${(internshipDuration ) &&  (`${ (internshipStartDate === "Immediately"  )  ? `• can start the internship between ${formattedFutureDate} and  ${formattedCurrentDate}`: `${ formatedFrom !== undefined && formatedTo !== undefined   ?`• can start the internship between ${formatedFrom} and ${formatedTo}` : ''}` }`)}
      ${(internshipDuration && MonthOrWeeks) &&(`• are available for duration of ${internshipDuration} ${MonthOrWeeks}`)}
       `;

 
    form.setValue('whoCanApply', formatedScript.trim());

  },[ form, form.getValues('internshipStartDate') ,form.getValues("toEnd") ,form.getValues("fromStart") ,form.getValues('internshipDuration'), form.getValues('MonthOrWeeks') , form.getValues('internshipType') ,form.getValues('partOrFullTime'),form.getValues('internshipStartDate')])
  return (
    <> 
    {IsLoading && (
       <div className="h-full z-50 w-full fixed  flex top-0 left-0 items-center bg-white justify-center">
       <Loader2 className=" animate-spin" size={24}/>
    </div>
    )}
    <div className="flex items-center justify-center h-full w-full">
      <div className="w-full flex flex-col items-center justify-center">
        <h2 className="text-3xl">Post internship.</h2>
        <br />
        <Form {...form}>
          <h2 className="flex items-start mb-4 font-semibold lg:w-2/4 w-full">Internship Details</h2>

          <form onSubmit={form.handleSubmit(onSubmit)} className="lg:w-2/4 w-full space-y-6 border p-4">
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
 
    <div className=' gap-4 flex flex-col  w-full'>  
           <FormField
              control={form.control}
              
              name="requiredSkills"
              render={() => (
                <FormItem  className='w-full  ' > 
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
               <div className="  ">
               <Button type="button" onClick={addSkill}>Add</Button>
               </div> 
              
          </div>
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

<div className=' gap-4 flex flex-col  w-full'>        
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
                       date > new Date() || date < new Date("1900-01-01")
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
                       date > new Date() || date < new Date("1900-01-01")
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
                  <FormItem>
                    <FormLabel> Intern's responsibilities</FormLabel>
                    <FormControl >
                      <Textarea  
                      className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />




<FormField
                control={form.control}
                name="whoCanApply"
       
                render={({ field }) => (
                  <FormItem  >
                    <FormLabel>Who can apply (prefilled as per earlier inputs):</FormLabel>
                    <FormControl  >
                      <Textarea
                      readOnly  
                      className="resize-none  pointer-events-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              

        <FormField
                control={form.control}
                name="additioalPreferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Additional candidate preferences:</FormLabel>
                    <FormControl >
                      <Textarea  
                      placeholder="e.g Candidate pursuing Computer Science Enginneering prefered."
                      className="resize-none" {...field} />
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
    </>
  );
};

export default PostFormpage;
