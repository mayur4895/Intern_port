 
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
import { register } from "@/actions/register";
 
 
import RegisterSchema from "@/schemas/RegisterSchema"; 
 
 
import { login } from "@/actions/login";
import LoginSchema from "@/schemas/LoginSchema";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { Separator } from "../ui/separator";
 
 
import { signIn } from "next-auth/react";  
import { FaSpinner } from "react-icons/fa"; 
 
 
const Signup = () => {
  const [isLoading,setisLoading] = useState(false);
  const SearchParams = useSearchParams();
  const urlError = SearchParams?.get("error") === "OAuthAccountNotLinked";
  const {toast} = useToast(); 
   const router = useRouter();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const isloding = form.formState.isSubmitting;
  async function onSubmit(values: z.infer<typeof RegisterSchema>) {
    setisLoading(true);
    try {
      const res =  await  register(values)
       
      form.reset();
      if(res?.success){
        setisLoading(false)
        toast({
          variant:"success",
          title: res?.success,
       
        })   
         router.push("/login");
      }


      if(res?.error){
        setisLoading(false)
        toast({
          variant:"destructive",
          title:res.error,  
        })   
         
      }
      form.reset();
   
      router.refresh(); 
    } catch (error) {
      setisLoading(false)
      toast({
        variant:"destructive",
        title: "Something went wrong",
        description: "user already exists",
      })
      console.log(error);
    }
  }



  
const onclick = async( provider:string)=>{
  setisLoading(true)
  const res =  await signIn(provider,{
      callbackUrl:"/"
    });
    if(urlError){
      setisLoading(false)
     toast({
       variant:"destructive",
       title: "Email alerday in used", 
     })
    }
    if(res?.error){
      setisLoading(false)
     toast({
       variant:"destructive",
       title:res?.error, 
      })
 
     
 
     form.reset();
     router.refresh();  
 } 
 }
 
 
  return (
    <>
       {isLoading && (
         <div className=" fixed h-full w-full bg-white top-0 left-0 items-center justify-center"> 
         <div className=" flex items-center justify-center h-full w-full">
         <Loader2 size={25} className=" animate-spin"/>
         </div>
         </div>
      )}
      <div className=" flex h-[100vh] w-full justify-center items-center">
      <Card className="px-8 py-5 max-w-md w-full">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-2xl">Signup</CardTitle>
            <CardDescription>Sign up to get started</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                disabled={isloding}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                disabled={isloding}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter Email"
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
                <Button type="submit" className="h-10 w-full">
                  {isloding ? <Loader2 className=" animate-spin" /> : "Signup"}
                </Button>

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
                  You have already singup?
                  <Link href="/auth/login" className="text-zinc-800 font-semibold">
                    {" "}
                    login
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

export default Signup;
