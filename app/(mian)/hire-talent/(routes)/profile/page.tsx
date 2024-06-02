"use client"
import { useEffect, useState } from "react"
import { ZodNumber, z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, usePathname, redirect } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { parsePhoneNumberFromString } from 'libphonenumber-js'
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
import { FaCheckCircle, FaSpinner } from "react-icons/fa"
import { UserType } from "@prisma/client"
import { CurrentUser } from "@/hooks/use-current-user"
 
import axios from "axios"
import { SendOtp } from "@/actions/hire-talent/send-otp"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { PhoneVerify } from "@/actions/hire-talent/verify-otp"
import { db } from "@/lib/db"
import { checkPhoneStatus } from "@/actions/hire-talent/checkPhoneVerify"
import { getPhoneStatus, getUserByPhone } from "@/data/user"
import { UpdateProfile } from "@/actions/hire-talent/update-profile"
 

 
 
 
const ProfileForm = () => {
  const [value, setValue] =  useState("")  
  
  const currentUser = CurrentUser();
  

 const { name , phone ,email  } = currentUser;
 
  
  
  const router = useRouter()
  const pathname = usePathname()
  const [showOtp, setShowOtp] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("");
  const [PhoneisVerifed ,setPhoneisVerifed] = useState(false);
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

  async function onSubmit (data: z.infer<typeof profileSchema>) {
    setisLoading(true);
 const res = await  UpdateProfile(data);
 if(res?.success){
  setisLoading(false)
    toast({
      title: res?.success,
      variant: "success",
    })
    console.log(data)
    window.location.replace("/hire-talent/company")
  }
  if(res?.error){
    setisLoading(false)
    toast({
      title: res?.error,
      variant: "destructive"
    })
  }
    
  }

  const sendOtp = async () => {
    const phoneValue = form.getValues('phone')
    setPhoneNumber(phoneValue)

    const parsedPhoneNumber = parsePhoneNumberFromString(phoneValue, 'IN') // Defaulting to US, you may change it
    if (!parsedPhoneNumber || !parsedPhoneNumber.isValid()) {
      toast({
        title: 'Invalid Phone Number!',
        variant: "destructive"
      });
      return;
    }

    const formattedPhoneNumber = parsedPhoneNumber.format('E.164')

    if(formattedPhoneNumber){
      setShowOtp(true) 
    } else {
      setShowOtp(false)
    }   

    try {
      const res = await  SendOtp(formattedPhoneNumber);

      if(res.success){ 
        toast({
          title: 'OTP sent!',
          variant: "success"
        });
      }
    } catch (error) {
      toast({
        title: 'OTP Not Sent!',
        variant: "destructive"
      });
    }
  } 
  

const submitOtp = async(e:any)=>{
  try {
    e.preventDefault();
     const res = await PhoneVerify(value);

     if(res.success){
      
      toast({
        title: 'phone Verify',
        variant: "success"
      })
     } 


     if(res.error){
      toast({
        variant:"destructive",
        title: res?.error, 
      })
     }
  } catch (error) {
    console.log(error);
    toast({
      variant:"destructive",
      title: "Something went wrong", 
    })
    
  }
}

const statusverify = async()=>{
  const res = await  checkPhoneStatus(currentUser.id, form.getValues('phone'));
  if(res?.success){
      setPhoneisVerifed(true); 
      setShowOtp(false) 
  }else {
    setPhoneisVerifed(false);
 
  } 
 
}
 

useEffect(()=>{
  if(currentUser?.role !== UserType.EMPLOYER && !currentUser){
    return redirect("/auth/login")
  }

   statusverify();
 
  
 
},[currentUser,form.getValues('phone')])
        
         
 console.log(PhoneisVerifed);
 

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
         {PhoneisVerifed  ? (
               <Button
          
               suppressHydrationWarning 
               className="text-green-600 bg-transparent hover:bg-transparent flex gap-2 shadow-none" 
               type="button"  
             >
              <FaCheckCircle size={18}/>  Verified
             </Button>
         ):( 
          <Button
          suppressHydrationWarning
          variant={"outline"}
          className="border-blue-400 border"
          type="button" 
          onClick={sendOtp} 
        >
          Verify
        </Button>
         )
         
         
         
         }
             </div>
            </div>
 
           {showOtp && (<> 
 
    <div className="space-y-2">
      <InputOTP
        maxLength={6}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div className=" text-sm">
        {value === "" ? (
          <>Enter your one-time password.</>
        ) : (
        <Button onClick={(e)=>{submitOtp(e)}}>Submit Otp</Button>
        )}
      </div>
    </div>
 
 

           </>)}

            <div className="flex items-center justify-between">
              {(pathname === "/hire-talent/company" || pathname === "/hire-talent/postjob") && (
                <Button type="submit">Prev</Button>
              )}
              <Button type="submit" className="ml-auto"  disabled={!PhoneisVerifed} >
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
