'use client';
import { CurrentUser } from '@/hooks/use-current-user';
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import StudentProfileSchema from "@/schemas/student/profileSchema";
import { Textarea } from "@/components/ui/textarea"; 
import { useGetStudentProfileInfo } from '@/features/student/api/get-studentprofileinfo';
import { useRouter } from 'next/navigation';
import { useUpdateStudentProfile } from '@/features/student/api/save-cahnges-studentprofile';
import { useToast } from '../ui/use-toast';
import Link from 'next/link';
import { FaEye } from 'react-icons/fa';
import { BsEye } from 'react-icons/bs';
import { PiTrashFill, PiTrashThin } from 'react-icons/pi';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { AiFillEdit } from 'react-icons/ai';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

export type StudentProfileFormValues = z.infer<typeof StudentProfileSchema>;
const FileUpload = dynamic(() => import('@/components/FileUpload'))
const AvatarUpload = dynamic(() => import('@/components/student/ProfilePicture'))


const StudentProfilePage = () => {
  const currentUser = CurrentUser();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
const {toast} = useToast();
   
  const { data: StudentProfile, isLoading } = useGetStudentProfileInfo(currentUser?.id);

  const form = useForm<StudentProfileFormValues>({
    resolver: zodResolver(StudentProfileSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      about: '',
      profilePicture: '',
      resumeUrl: '',
      urls: [''],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control as any,
    name: "urls" as any,
  });

  useEffect(() => {
    if (StudentProfile) {
      form.reset({
        firstname: StudentProfile.firstname || '',
        lastname: StudentProfile.lastname || '',
        email: StudentProfile.email || '',
        phone: StudentProfile.phone || '',
        about: StudentProfile.description || '',
        profilePicture: StudentProfile.profile || '',
        resumeUrl: StudentProfile.resume || '',
        urls: StudentProfile.url || [''],
      });
    }
  }, [StudentProfile, form]);



  const updateStudentProfile = useUpdateStudentProfile();
  async function onSubmit(values: StudentProfileFormValues) {
 
    updateStudentProfile.mutate({ values, userId: currentUser.id }, { 
        onSuccess: (response) => {
          if (response.success) {
        
            setIsEditing(false); 
            toast({
                variant: "success",
                title: response.success,
               })
       
          } else if (response.error) { 
           toast({
            variant: "destructive",
            title: response.error,
           })
          }
        },
        onError: (error) => {
          
        
          
          toast({
            variant: "destructive",
            title: "An unexpected error occurred. Please try again.",
           })
        }
      });
  
  }

 
  if (isLoading || !currentUser || !StudentProfile) {
    return <div className='  h-full left-0 top-0   lg:pl-14   flex items-center justify-center     w-full    '>
    <div className="   flex items-center justify-center  bottom-0 right-0 fixed   h-full lg:w-[85%]  w-full  "> 
       <Loader2 className=' animate-spin '/>
    </div>
    </div>
}
  return (
    <div className=''>
      <div className="flex items-center justify-center h-full w-full">
        <Card className="w-[800px] border-none">
          <CardContent className="h-full scroll-auto overflow-auto scrollbar-thin">
            <CardHeader className="px-0">
              <CardTitle className="text-md text-start  flex  justify-between font-medium">
                My Profile
                {!isEditing && (
                 
                     <Button type="button" onClick={() => setIsEditing(true)} className="w-28 flex items-center gap-2 text-sm" variant={"outline"}  >
                     <AiFillEdit   size={17}/>  Edit 
                     </Button>
                )}
              </CardTitle>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full h-full">
                {/* Profile Picture Editable */}
                <FormField
                  control={form.control}
                  name="profilePicture"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <AvatarUpload value={field.value} onChange={field.onChange}  disabled={!isEditing} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 w-full items-center gap-2">
                  {/* First Name (Non-Editable) */}
                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input {...field} disabled />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Last Name (Non-Editable) */}
                  <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} disabled />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Email (Non-Editable) */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Phone (Editable) */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={!isEditing} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* About (Editable) */}
                <FormField
                  control={form.control}
                  name="about"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>About you</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a little bit about yourself"
                          className="resize-none"
                          {...field}
                          disabled={!isEditing}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Resume (Editable) */}
                <FormField
                  control={form.control}
                  name="resumeUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Resume</FormLabel>
                      <FormControl>
                        <div className=' flex flex-col gap-2 '>
                        <FileUpload value={field.value}  onChange={field.onChange} endpoint="ResumePdf"  disabled={!isEditing} />
                       
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* URLs (Editable) */}
                <div className="flex flex-col gap-2">
                  {fields.map((field, index) => (
                    <FormField
                      key={field.id}
                      control={form.control}
                      name={`urls.${index}`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL {index + 1}</FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-2">
                              <Input {...field} disabled={!isEditing} />
                              {isEditing && (
                                <Button type="button"  className='text-xs flex items-center gap-2' onClick={() => remove(index)} variant="destructive">
                                 <PiTrashFill size={18}/> Remove
                                </Button>
                              )}
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ))}
                  {isEditing && (
                    <Button type="button" className="w-28 flex items-center gap-2 text-xs" variant={"outline"} onClick={() => append('')}>
                    <IoIosAddCircleOutline  size={18}/>  Add URL
                    </Button>
                  )}
                </div>

                {/* Submit Button */}
                {isEditing && (
                  <Button type="submit">Save Changes</Button>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentProfilePage;
