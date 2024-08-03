'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
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
import { studentProfile } from "@/actions/student/studentProfile";

type StudentProfileFormValues = z.infer<typeof StudentProfileSchema>;

const StudentProfilePage: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<StudentProfileFormValues>({
    resolver: zodResolver(StudentProfileSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      about:"",
      profilePicture: "",
      resumeUrl: "",
      urls: [""],  
    },
  });
  
  const { fields, append, remove } = useFieldArray({
    control: form.control as any,
    name: "urls" as any, 
  });


  async function onSubmit(values: StudentProfileFormValues) {
        try{
          const res = await studentProfile(values);
                        
          if(res?.success){
            toast({
              title:"Details Saved",
              variant:"success"
            });
            router.push("/student/dashboard");
          }else{
            toast({
              title:res?.error,
              variant:"destructive"
            });
          }
        }catch{
         console.log("error")
        }
  }

  return (
    <div className="flex items-center justify-center h-full w-full">
      <Card className="w-[600px]">
        <CardContent className="h-full scroll-auto overflow-auto scrollbar-thin">
          <CardHeader className=" px-0">
            <CardTitle className="text-xl text-start font-normal">
              Update Profile
            </CardTitle>
            <CardDescription></CardDescription>
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
                    <FormItem >
                        <FormLabel>First Name</FormLabel> 
                      <FormControl>
                        <div>
                          <Input placeholder="Enter your FirstName" className="peer" {...field} /> 
                           
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem >
                        <FormLabel>Last Name</FormLabel> 
                      <FormControl>
                        <div>
                          <Input placeholder="Enter Your LastName" className="peer" {...field} /> 
                        
                        </div>
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
                  <FormItem >
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div>
                        <Input placeholder="e.g example@gmail.com" className="peer" {...field} /> 
                      
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem >
                    <FormLabel>Phone</FormLabel>
                    <FormControl> 
                        <Input placeholder="Enter your phone"   {...field} />  
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem >
                    <FormLabel>About you</FormLabel>
                    <FormControl>
                      <div>
                      <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />    
                      </div>
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
              <div className="flex flex-col gap-2 ">
                
              {fields?.map((field:any, index:any) => (
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
              <Button type="button"  className=" w-28"  variant={"outline"} onClick={() => append('')}>
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
}

export default StudentProfilePage;
