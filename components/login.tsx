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
 
 
import axios from "axios";
import { redirect, useRouter, useSearchParams } from "next/navigation";

import { Loader2 } from "lucide-react";
 
 
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import { useToast } from "./ui/use-toast";
 
 
import { login } from "@/actions/login";
import LoginSchema from "@/schemas/LoginSchema";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { Separator } from "./ui/separator";
 
 
import { signIn } from "next-auth/react"; 
import { DEFAULT_LOGIN_REDIRECT } from "@/route";

 
const Login = () => {
  const SearchParams = useSearchParams();
  const urlError = SearchParams.get("error") === "OAuthAccountNotLinked";
  
  
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
       }

        


       if(res?.error){
         
        toast({
          variant:"destructive",
          title:res?.error, 
         })
  
         }

         if(res?.success){
          toast({
            variant:"success",
            title: res?.success,
         
          })   
       
          router.push(DEFAULT_LOGIN_REDIRECT)
        }
       

        form.reset();
        router.refresh();  
  
    } catch (error) {
      console.log(error);
      toast({
        variant:"destructive",
        title: "Invalid User", 
       })
       form.reset();

    }
  }

const onclick = async( provider:string)=>{
 const res =  await signIn(provider,{
     callbackUrl:"/"
   });
   if(urlError){
    toast({
      variant:"destructive",
      title: "Email alerday in used", 
    })
   }
   if(res?.error){
     
    toast({
      variant:"destructive",
      title:res?.error, 
     })

   
  
    router.push("/posts")

    form.reset();
    router.refresh();  
} 
}
  return (
    <>
      <div className=" flex h-[100vh] w-full justify-center items-center">
        <Card className="px-8 py-5 max-w-md w-full">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-3xl">Login</CardTitle>
            <CardDescription>Login to your account</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
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
                  </FormItem>
                )}
              />

              <CardFooter className=" justify-between gap-3 flex-col w-full p-0">
                
              <Button type="submit" className=" h-10 w-full">
                  {isloding ? <Loader2 className=" animate-spin" /> : "Login"}
                </Button>
                <span className="flex  whitespace-nowrap items-center justify-center text-sm gap-5 text-zinc-500"> <Separator/> Or Sign in with  <Separator/>  </span>
              <div className="flex  justify-center gap-3 w-full">
                <Button onClick={()=>{onclick('google')}} variant={"outline"} className="flex items-center gap-2 w-full text-gray-500 h-12">
                  <FcGoogle size={25}/>Google
                </Button>

                <Button onClick={()=>{onclick('github')}} variant={"outline"} className="flex items-center gap-2 w-full text-gray-500 h-12">
                  <AiFillGithub size={25}/>Github
                </Button>
 
              
              </div>
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
      </div>
    </>
  );
};

export default Login;
