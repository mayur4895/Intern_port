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
 
 
import { login } from "@/actions/login";
import LoginSchema from "@/schemas/LoginSchema";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { Separator } from "../ui/separator";
 
 
import { signIn } from "next-auth/react";  
import SocialProvider from "./SocialProvider";
import { useEffect, useState } from "react";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";

 
const Login = () => {
  const SearchParams = useSearchParams();
  const urlError = SearchParams.get("error") === "OAuthAccountNotLinked";
  const [showTwoFactor,setshowTwoFactor]  = useState(false);
  
  const {toast} = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "", 
      password: "",
    },
  });

  const isloding = form.formState.isSubmitting;
  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    try {
      const res =  await  login(values);
       if(urlError){
        toast({
          variant:"destructive",
          title: "Email alerday in used", 
        })
        form.reset();
        window.location.reload();
        router.refresh();
       }

        
   

       if(res?.error){
         
        toast({
          variant:"destructive",
          title:res?.error, 
         })
         form.reset()
          router.refresh();
         }

         if(res?.success){
          toast({
            variant:"success",
            title: res?.success,
         
          })   
       
          form.reset(); 
          router.push("/student/dashboard")
          router.refresh();
        }


        if(res?.twoFactor){
          setshowTwoFactor(true); 
        }
       
 
  
    } catch (error) { 
      toast({
        variant:"destructive",
        title: "Something went Wrong", 
       })
       form.reset();

    }
  }
 
  return (
    <>
   
        <Card className="px-8 py-5 max-w-md w-full">
        
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

              {showTwoFactor && (<>
                <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your phone.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
              </>)}
             { !showTwoFactor && (  <>  <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@gmail.com" {...field} />
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
                      <Input
                        type="password"
                        placeholder="Enter Password"
                        {...field}
                      />
                    </FormControl>
                    <Button variant={"link"} asChild><Link href="/auth/reset" className="pl-0 font-normal text-xs">Forgot your password ?</Link></Button>
                  </FormItem>
                )}
              />  
              
              </>
              )


              }

              <CardFooter className=" justify-between gap-3 flex-col w-full p-0">
                
              <Button type="submit" className=" h-10 w-full">
                  {isloding ? <Loader2 className=" animate-spin" /> : showTwoFactor ? "Confirm" :"Login"}
                </Button>
                {!showTwoFactor && 
              <SocialProvider/> 
              
              }
                  

              <span className="text-sm text-zinc-500">
                  {" "}
                   Don't have an account?
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
