'use client';

import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { postFormSchema } from '@/schemas';
import { Badge } from '@/components/ui/badge';
import { CurrentUser } from '@/hooks/use-current-user';

const PostFormpage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentUser = CurrentUser();

  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      internship_profile: '',
      required_skills: [],
    },
  });

  async function onSubmit(data: z.infer<typeof postFormSchema>) {
    console.log(data);
  }

  useEffect(() => {
    if (!currentUser) {
      redirect('/auth/login');
    }
  }, [currentUser]);

  const [newSkill, setNewSkill] = useState('');
  const requiredSkills = form.watch('required_skills');
console.log(form.getValues('required_skills'));

  const addSkill = () => {
    if (newSkill && !requiredSkills.includes(newSkill)) {
      form.setValue('required_skills', [...requiredSkills, newSkill]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    form.setValue('required_skills', requiredSkills.filter(skill => skill !== skillToRemove));
  };

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
       
           <div className='flex  items-center gap-2'>
            
           <Input
                id="newSkill"
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Enter a skill"
              />
              <Button type="button" onClick={addSkill}>Add</Button>
           </div>
            {/* <FormField
              control={form.control}
              name="required_skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Required Skills</FormLabel>
                  <FormControl>
                  <Input
                id="newSkill"
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Enter a skill"
              />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <div>
              {requiredSkills.length > 0 && (
                <ul className="flex flex-wrap gap-2">
                  {requiredSkills.map((skill, index) => (
                    <Badge   key={index} className=" flex justify-between items-center">
                      {skill}
                      <Button
                      className=' bg-transparent hover:bg-transparent'
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
