'use client';

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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import StudentProfileSchema from "@/schemas/student/profileSchema";
import { useToast } from "@/components/ui/use-toast";
import FileUpload from "@/components/FileUpload";
import AvatarUpload from "@/components/student/ProfilePicture";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateStudentProfile } from "@/features/student/api/update-studentprofile";
import { useRouter } from 'next/navigation'; // Use useRouter for client-side navigation
import { signIn } from "next-auth/react";

export type StudentProfileFormValues = z.infer<typeof StudentProfileSchema>;

const StudentProfilePage: React.FC = () => {
  const router = useRouter(); // Get the router object
  const { toast } = useToast();
 

  const form = useForm<StudentProfileFormValues>({
    resolver: zodResolver(StudentProfileSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      about: "",
      profilePicture: "",
      resumeUrl: "",
      urls: [""],
    },
  }); 

  const { fields, append, remove } = useFieldArray({
    control: form.control as any,
    name: "urls" as any,
  });

  const UpdateStudentProfile = useUpdateStudentProfile();
  async function onSubmit(values: StudentProfileFormValues) {
    try {
      // Use the mutate function to send the update request
      const res = await UpdateStudentProfile.mutateAsync(values);
  
      // Check for errors
      if (res.error) {
        toast({
          variant: 'destructive',
          title: 'Error updating profile',
          description: res.error,
        });
        return; // Stop further execution if there's an error
      }
  
      // Success toast
      toast({
        variant: 'success',
        title: 'Profile Updated Successfully',
      });
  
      // Reset the form
      form.reset();
  
      // Re-fetch the session to ensure it's updated
      await signIn('credentials', { redirect: false });
  
      // Redirect to the dashboard
      window.location.href = '/student/dashboard';
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
      });
    }
  }

  return (
    <div className="flex items-center justify-center h-full w-full">
      <Card className="w-[600px]">
        <CardContent className="h-full scroll-auto overflow-auto scrollbar-thin">
          <CardHeader className="px-0">
            <CardTitle className="text-xl text-start font-normal">
              Update Profile
            </CardTitle>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full h-full">
              <FormField
                control={form.control}
                name="profilePicture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Picture</FormLabel>
                    <FormControl>
                      <AvatarUpload value={field.value} onChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 w-full items-center gap-2">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your First Name" className="peer" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Your Last Name" className="peer" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g example@gmail.com" className="peer" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
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
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="resumeUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Resume</FormLabel>
                    <FormControl>
                      <FileUpload value={field.value} onChange={field.onChange} endpoint="ResumePdf" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-2">
                {fields?.map((field: any, index: any) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`urls.${index}` as const}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL {index + 1}</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Input placeholder="Enter a URL" className="peer" {...field} />
                            <Button type="button" onClick={() => remove(index)} variant="destructive">
                              Remove
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                ))}
                <Button type="button" className="w-28" variant={"outline"} onClick={() => append('')}>
                  Add URL
                </Button>
              </div>
              <Button type="submit">Update Profile</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentProfilePage;
