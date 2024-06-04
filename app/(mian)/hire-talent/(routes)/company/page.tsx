"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { redirect, usePathname, useRouter } from "next/navigation";
import { companySchema } from "@/schemas";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import IndustrySelect from "@/components/selectIndustry";
import { UploadButton } from "@/lib/uploadthing";
 
 
 
 
 
 
 
 

const ProfileForm = () => {
 
  const router = useRouter();
  const pathname = usePathname();
  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      description: "",
      isCompanyHire: false,
      city: "",
      industry: "",
      no_employees:"",
      imageUrl:""
    },
  });

  function onSubmit(data: z.infer<typeof companySchema>) {
    console.log(data);
    toast({
      title: "Profile details saved",
    }); 
 
  }


 
  
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="w-full flex flex-col items-center justify-center">
        <h2 className="text-3xl">Company Details</h2> 
        <br />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="lg:w-2/4 w-full space-y-6 border p-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your firstName" {...field}  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isCompanyHire"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-gray-600">
                      I am an independent practitioner (freelancer, architect, lawyer etc.)
                    </FormLabel>
                    <FormDescription>
                      hiring for myself and I am NOT hiring on behalf of a company.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization city</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g Pune" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />     
     <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>industry</FormLabel>
                  <FormControl>
                  <IndustrySelect  onChange={field.onChange}  value={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />  

<FormField
          control={form.control}
          name="no_employees"
          render={({ field }) => (
            <FormItem>
              <FormLabel>No. of employees</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select no of employees" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0 - 50">0 - 50</SelectItem>
                  <SelectItem value=" 51 - 200">51 - 200</SelectItem>
                  <SelectItem value="201 - 500  ">201 - 500  </SelectItem>
                  <SelectItem value=" 501 - 1000">501 - 1000</SelectItem>
                  <SelectItem value="1000+ ">1000+ </SelectItem>
                </SelectContent>
              </Select> 
              <FormMessage />
            </FormItem>
          )}
        />
 <div suppressContentEditableWarning>
 <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
 {/* <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
     
              <FormControl>
                <FileUpload 
                endpoint="imageUploader"
                value={field.value}
                onChange={field.onChange}
                 
                />
              </FormControl> 
 
            </FormItem>
          )}
        /> */}
 </div>

            <div className="flex items-center justify-between">
              {(pathname === "/hire-talent/company" || pathname === "/hire-talent/postjob") && (
                <Button
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault(); 
                    return window.location.replace("/hire-talent/profile");
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

export default ProfileForm;
