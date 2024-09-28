"use client";
 

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
 
  FormField,
  FormItem,
  FormLabel,
 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
 
 
 
import { useRouter, useSearchParams } from "next/navigation";

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
 
  
 
 
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import NewPasswordSchema from "@/schemas/NewPasswordSchema";
import { reset } from "@/actions/reset";
import { NewPssword } from "@/actions/new-password";
 

 
const ResetPasswordForm = () => {
  const SearchParams = useSearchParams();
  const token = SearchParams?.get("token");
  const urlError = SearchParams?.get("error") === "OAuthAccountNotLinked";
  
  
  const {toast} = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "", 
 
    },
  });

  const isloding = form.formState.isSubmitting;
  async function onSubmit(values: z.infer<typeof NewPasswordSchema>) {
    try {
      const res =  await  NewPssword(values,token);
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
 
  return (
    <>
   
        <Card className="px-8 py-5 max-w-md w-full mt-10">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-xl">Forgot Password</CardTitle>
            <CardDescription>forgot your password</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
             

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
                        placeholder="password minimum 8 charcters"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
             
              <CardFooter className=" justify-between gap-3 flex-col w-full p-0">
                
              <Button type="submit" className=" h-10 w-full">
                  {isloding ? <Loader2 className=" animate-spin" /> : "reset password"}
                </Button>  
              <Button  variant={"link"} className=" text-sm text-zinc-500">
                  {" "}
           
                  <Link href="/auth/login" className="  text-zinc-900">
                    {" "}
                    Back to login
                  </Link>
                </Button >
              </CardFooter>
            </form>
          </Form>
        </Card>
 
    </>
  );
};

export default ResetPasswordForm;
