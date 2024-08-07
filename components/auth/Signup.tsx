 
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
import { register } from "@/actions/student/register";
 
 
import RegisterSchema from "@/schemas/RegisterSchema"; 
 
 
import { login } from "@/actions/student/login";
import LoginSchema from "@/schemas/LoginSchema";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { Separator } from "../ui/separator";
 
 
import { signIn } from "next-auth/react";  
import { FaSpinner } from "react-icons/fa"; 
import { RiUser3Line } from "react-icons/ri";
import { CiAt } from "react-icons/ci";
import { PiLockKeyLight, PiUserThin } from "react-icons/pi";
 
 
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
         <div className=" fixed h-full w-full z-50 bg-white top-0 left-0 items-center justify-center"> 
         <div className=" flex items-center justify-center h-full w-full">
         <Loader2 size={25} className=" animate-spin"/>
         </div>
         </div>
      )}
     
      <Card className="px-8 py-5  w-full border-2 border-white rounded-none shadow-none border-none">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-2xl">Signup</CardTitle>
            <CardDescription>Sign up to get started</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 z-10">
              <FormField
                control={form.control}
                name="name"
                disabled={isloding}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl> 
                      <div className=" relative">
                      <Input placeholder="Enter Name" {...field} className="pl-8" />
                     <PiUserThin    className=" absolute top-[9px] left-2"/>
                     </div>
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
                    <div className=" relative">
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
                disabled={isloding}
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
     
    </>
  );
};

export default Signup;
