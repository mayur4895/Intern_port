"use client";
 

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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

 
import axios from "axios";
import { redirect, useRouter, useSearchParams } from "next/navigation";

import { Loader2 } from "lucide-react";
 
 
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { useToast } from "../ui/use-toast";
 
 
import { login } from "@/actions/student/login";
import LoginSchema from "@/schemas/LoginSchema";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { Separator } from "../ui/separator";
 
 
import { signIn } from "next-auth/react";  
import SocialProvider from "./SocialProvider";
import { useEffect, useState } from "react";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { FaSpinner } from "react-icons/fa";
import { PiLockKeyLight } from "react-icons/pi";
import { CiAt } from "react-icons/ci";

 
const Login = () => {
  const SearchParams = useSearchParams();
  const urlError = SearchParams?.get("error") === "OAuthAccountNotLinked";
   
  const [showTwoFactor,setshowTwoFactor]  = useState(false);
  const [isLoading,setisLoading] = useState(false);
  const {toast} = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "", 
      password: "",
    
    },
  });

  const isLoding = form.formState.isSubmitting;
  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    try {
      setisLoading(true);
      const res =  await  login(values);
       if(urlError){
        setisLoading(false);
        toast({
          variant:"destructive",
          title: "Email alerday in used", 
        })
        router.refresh();
        form.reset();
        router.push("/student/dashboard");
       }
  
       
         
       if(res?.error){
         toast({
          variant:"destructive",
          title:res?.error, 
         })
         form.reset()
          router.refresh();
         }
     
         router.refresh();
         form.reset();
         router.push("/student/dashboard");
         window.location.reload();

  
        
    } catch (error) { 
      setisLoading(false);
      toast({
        variant:"destructive",
        title: "Something went Wrong", 
       })
       form.reset();

    }
  }

 
  return (
    <>
     {isLoading && (
         <div className=" fixed h-full z-50 w-full bg-white top-0 left-0 items-center justify-center"> 
         <div className=" flex items-center justify-center h-full w-full">
         <Loader2 size={25} className=" animate-spin"/>
         </div>
         </div>
      )}
        <Card className="px-8 py-5 max-w-md w-full    shadow-none border-none">
        
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

              
           
             { !showTwoFactor && (  <>  <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl> 
                      <div className=" relative z-10">
                     <Input placeholder="example@gmail.com" {...field}  className="pl-8"/>
                     <CiAt  className=" absolute top-[9px] left-2"/>
                     </div>
                    </FormControl>
                  </FormItem>
                )}
              /> 
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                    <div className=" relative">
                       <Input
                        type="password"
                        placeholder="Enter Password"
                        className="pl-8"
                        {...field}
                      />
                     <PiLockKeyLight   className=" absolute top-[9px] left-2"/>
                     </div>
                    </FormControl>
                    <Button variant={"link"} asChild><Link href="/auth/reset" className="pl-0 font-normal text-xs">Forgot your password ?</Link></Button>
                  </FormItem>
                )}
              />  
              
              </>
              )


              }

              <CardFooter className=" justify-between gap-3 flex-col w-full p-0">
                
              <Button type="submit" variant={"theme"} className=" h-10 w-full">
                  {isLoding ? <Loader2 className=" animate-spin" /> : showTwoFactor ? "Confirm" :"Login"}
                </Button>
                {!showTwoFactor && 
              <SocialProvider/> 
              
              }
                  

              <span className="text-sm text-zinc-500">
                  {" "}
                   Dont have an account?
                  <Link href="/auth/signup" className=" font-semibold text-zinc-900">
                    {" "}
                    signup
                  </Link>
                </span>
              </CardFooter>
            </form>
          </Form>
        </Card>
 
    </>
  );
};

export default Login;
