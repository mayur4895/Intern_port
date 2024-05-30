"use client"
import { useState } from "react"
import { ZodNumber, z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, usePathname, redirect } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { profileSchema } from "@/schemas"
import { InputOTPForm } from "@/components/auth/otpContainer"
import { FaSpinner } from "react-icons/fa"
import { UserType } from "@prisma/client"
import { CurrentUser } from "@/hooks/use-current-user"
import { InputOTP } from "@/components/ui/input-otp"
import axios from "axios"

const ProfileForm = () => {

  const currentUser = CurrentUser();
  if(currentUser.role !== UserType.EMPLOYER){
    return redirect("/auth/login")
  }

 const { name , phone ,email  } = currentUser;
 
  
  
  const router = useRouter()
  const pathname = usePathname()
  const [showOtp, setShowOtp] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isVerifed ,setisVerifed] = useState(false);
  const [isLoading ,setisLoading] = useState(false);
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstname: "" || name.split(" ")[0],
      lastname: "" || name.split(" ")[1],
      email: ""||email,
      designation: "",
      phone:""|| phone,
      role :""
    },
  })

  function onSubmit(data: z.infer<typeof profileSchema>) {
    setisLoading
    toast({
      title: "Profile details saved",
    })
    console.log(data)
    window.location.replace("/hire-talent/company")
  }

  const sendOtp = async () => {
    setPhoneNumber(form.getValues('phone'))
    if( form.getValues("phone")){
      setShowOtp(true)
    }else{
      setShowOtp(false)
    }   if (phoneNumber   &&   /^\+?[1-9]\d{1,14}$/.test(phoneNumber)) {
      try {
        const response = await axios.post('/api/send-otp', { phoneNumber });
        toast({
          title: 'OTP sent!',
          variant: "success"
        });
      } catch (error) {
        toast({
          title: 'OTP Not Sent!',
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: 'Phone number is required',
        variant: "destructive"
      });
    }
     
  };
  
  return (
    <div className="flex items-center justify-center h-screen w-full">
      {isLoading && (
         <div className=" fixed h-full w-full bg-white top-0 left-0 items-center justify-center"> 
         <div className=" flex items-center justify-center h-full w-full">
         <FaSpinner size={25} className=" animate-spin"/>
         </div>
         </div>
      )}
      <div className="w-full flex flex-col items-center justify-center">
        <h2 className="text-3xl">Personal Details</h2>
        <br />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full lg:w-2/4 space-y-6 border p-4">
            <div className="items-center w-full grid lg:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Your firstName" {...field}  value={name.split(" ")[0]}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Your lastName" {...field}   value={name.split(" ")[1]} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@gmail.com" {...field}  value={email} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="designation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Designation</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g HR Manager" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className=" flex  w-full gap-5 items-end">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Your Phone Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
             <div>
             <Button
                suppressHydrationWarning
                variant={"outline"}
                className="border-blue-400 border"
                type="button" 
                onClick={sendOtp}
          
              >
                Verify
              </Button>
             </div>
            </div>
 
           {showOtp && (<>
           <InputOTPForm phoneNumber={phone}/>
           </>)}

            <div className="flex items-center justify-between">
              {(pathname === "/hire-talent/company" || pathname === "/hire-talent/postjob") && (
                <Button type="submit">Prev</Button>
              )}
              <Button type="submit" className="ml-auto"  >
                Next
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default ProfileForm
