"use client";

import React, { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { useRouter, usePathname } from "next/navigation";
import { companySchema } from "@/schemas";
import { CurrentUser } from "@/hooks/use-current-user";
 
 import { useCompanyStore } from "@/hooks/use-companydata";
import { CompanyRegister } from "@/actions/hire-talent/companyRegister";
 

 
const IndustrySelect = dynamic(() =>   import("@/components/hire-talent/selectIndustry"));
const FileUpload = dynamic(() =>  import("@/components/FileUpload"));
const NoEmployeesSelect = dynamic(() =>import("@/components/hire-talent/selectNoEmployees") );

const Companypage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentUser = CurrentUser();
  const [isLoading, setIsLoading] = useState(false);
 const {companyDetails:CompanyData} = useCompanyStore();
  
  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      description: "",
      isIndependentHire: false,
      city: "",
      industry: "",
      employees: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof companySchema>) => {
    console.log(data);
    const res = await CompanyRegister(data, currentUser.id);
    if (res?.success) {
      toast({ title: res.success, variant: "success" });
      router.push("/hire-talent/dashboard");
    }
    if (res?.error) {
      toast({ title: res.error, variant: "destructive" });
    }
  };

 
  

  return (
    <>
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
                    <FormLabel>{form.getValues('isIndependentHire') ? "Name" : "Organization name"}</FormLabel>
                    <FormControl>
                      <Input disabled={!!CompanyData} placeholder={form.getValues('isIndependentHire') ? "Name" : "Organization name"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isIndependentHire"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                    <FormControl>
                      <Checkbox checked={field.value} disabled={!!CompanyData} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-gray-600">I am an independent practitioner (freelancer, architect, lawyer etc.)</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{form.getValues('isIndependentHire') ? "About yourself and what you do" : "Organization Description"}</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell us in between 30 - 160 characters" className="resize-none" {...field} />
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
                    <FormLabel>{form.getValues('isIndependentHire') ? "City" : "Organization city"}</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Pune" {...field} />
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
                    <FormLabel>Industry</FormLabel>
                    <FormControl>
                      <IndustrySelect onChange={field.onChange} value={field.value} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="employees"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No. of employees</FormLabel>
                    <FormControl>
                      <NoEmployeesSelect onChange={field.onChange} value={field.value} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!form.getValues('isIndependentHire') && (
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload endpoint="imageUploader" value={field.value} onChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
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
    </>
  );
};

export default Companypage;
