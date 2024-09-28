"use client";

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
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Card, CardFooter } from "../ui/card";
import Link from "next/link";
import { useToast } from "../ui/use-toast";
import LoginSchema from "@/schemas/LoginSchema";
import { login } from "@/actions/hire-talent/login";
import { CiAt } from "react-icons/ci";
import { PiLockKeyLight } from "react-icons/pi";

const EmployerLogin = () => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    try {
      const res = await login(values);

      if (res?.error) {
        toast({
          variant: "destructive",
          title: res.error,
        });
      } else if (res?.success) {
        toast({
          variant: "success",
          title: res.success,
        });
        form.reset();
        router.push("/hire-talent/dashboard");
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Invalid User",
      });
      form.reset();
    }
  };

  return (
    <Card className="px-8 py-5 max-w-md w-full shadow-none border-none">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="example@gmail.com" {...field} className="pl-8" />
                    <CiAt className="absolute top-[9px] left-2" />
                  </div>
                </FormControl>
                <FormMessage />
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
                  <div className="relative">
                    <Input type="password" placeholder="Enter Password" {...field} className="pl-8" />
                    <PiLockKeyLight className="absolute top-[9px] left-2" />
                  </div>
                </FormControl>
                <FormMessage />
                <Button variant="link" asChild>
                  <Link href="/auth/reset" className="pl-0 font-normal text-xs">
                    Forgot your password?
                  </Link>
                </Button>
              </FormItem>
            )}
          />

          <CardFooter className="justify-between gap-3 flex-col w-full p-0">
            <Button type="submit" className="h-10 w-full">
              {isLoading ? <Loader2 className="animate-spin" /> : "Login"}
            </Button>

            <span className="text-sm text-zinc-500">
              Don’t have an account?
              <Link href="/hire-talent" className="font-semibold text-zinc-900">
                signup
              </Link>
            </span>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default EmployerLogin;
