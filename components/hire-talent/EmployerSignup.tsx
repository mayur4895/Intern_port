 'use client'
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

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

import { CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
 
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { useToast } from "../ui/use-toast"; 
 
  
 
 
import { login } from "@/actions/login";
import LoginSchema from "@/schemas/LoginSchema";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { Separator } from "../ui/separator";
 
 
import { signIn } from "next-auth/react";  
import HireRegisterSchema from "@/schemas/hire-talent/HireRegisterSchema";
import { register } from "@/actions/hire-talent/register";
import { useLoginType } from "@/hooks/use-logintype";
 
  
 
 
const EmployerSignup = () => {
  
  const SearchParams = useSearchParams();
  const urlError = SearchParams.get("error") === "OAuthAccountNotLinked";
  const {toast} = useToast();
 
   const router = useRouter();
  const form = useForm<z.infer<typeof HireRegisterSchema>>({
    resolver: zodResolver(HireRegisterSchema),
    defaultValues: {
      firstname: "",
      lastname:"",
      email: "",
      password: "",
      phone:""
    },
  });

  const isloding = form.formState.isSubmitting;
  async function onSubmit(values: z.infer<typeof HireRegisterSchema>) {
 
    try {
      const res =  await  register(values)
       
      form.reset();
      if(res?.success){
        toast({
          variant:"success",
          title: res?.success, 
        })   
         router.push("/login");
      }


      if(res?.error){
        toast({
          variant:"destructive",
          title:res.error,  
        })   
         
      }
      form.reset();
   
      router.refresh(); 
    } catch (error) {
      toast({
        variant:"destructive",
        title: "Something went wrong",
        description: "user already exists",
      })
      console.log(error);
    }
  }



   
 const { onSetType} = useLoginType()

 
  return (
    <> 
      <Card className="px-8 py-5 max-w-md w-full"> 
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                
              <FormField
                control={form.control}
                name="email"
                disabled={isloding}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-800"> Official Email id</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="name@comany.com"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />



<FormField
                control={form.control}
                name="password"
                disabled={isloding}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-800">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="minimum 8 charcters"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
               <div className=" grid grid-cols-2 gap-2">
               <FormField
                control={form.control}
                name="firstname"
                disabled={isloding}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-800">FirstName</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter FirstName" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                disabled={isloding}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-800">LastName</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter LastName" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
               </div>

<FormField
                control={form.control}
                name="phone"
                disabled={isloding}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-800">Mobile Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Mobile Number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
  

<CardFooter className=" justify-between gap-3 flex-col w-full p-0">
                <Button type="submit" className="h-10 w-full">
                  {isloding ? <Loader2 className=" animate-spin" /> : "Post For Free"}
                </Button>
 
                <span className="text-sm text-zinc-500">
                  {" "}
                  You have already singup?
                  <Link href="/auth/login" onClick={()=>{onSetType("employer")}}   className="text-zinc-800 font-semibold">
                    {" "}
                    login
                  </Link>
                </span>
              </CardFooter>
            </form>
          </Form>
        </Card>
    
    </>
  );
};

export default EmployerSignup;
