"use client"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
 
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { redirect, usePathname, useRouter } from "next/navigation"
import { profileSchema } from "@/schemas"
import { useState } from "react"
import { InputOTPForm } from "@/components/auth/otpContainer"
 

 

 const  ProfileForm= () =>{

  const router = useRouter();
  const pathname = usePathname();

const [showOtp,setshowOtp] = useState(true)

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
       firstname: "",
    },
  })

  function onSubmit(data: z.infer<typeof profileSchema>) {
    toast({
      title: "Profile details saved", 
    })
    console.log(data);
    
    
   return  window.location.replace("/hire-talent/company")
    
  }

  return (
    <div className="flex items-center justify-center h-screen w-full">
          <div  className="w-full  flex flex-col  items-center justify-center">
      <h2 className="text-3xl">Personal Details</h2>
 <br />
    <Form {...form}  >
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/4 space-y-6 border p-4" >
      <div className="  items-center w-full grid   lg:grid-cols-2 gap-3">

        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Your firstName" {...field} />
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
                <Input placeholder="Enter Your lasttName" {...field} />
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
                <Input placeholder="example@gmail.com" {...field} />
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


 <div  className="grid grid-cols-3 w-full gap-5  items-end" >
   <div className="col-span-2"> 
    
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
        <Button suppressHydrationWarning variant={"outline"} className=" border-blue-400 border">Verify</Button>
 </div>

{

showOtp && (
   <InputOTPForm/>
)

}

 <div className="flex items-center justify-between">
{(pathname === "/hire-talent/company" || pathname==="/hire-talent/postjob") && <Button type="submit">Prev</Button>}
 <Button type="submit" className="ml-auto">Next</Button>
 </div>
      </form>
    </Form>
    </div>
     </div>
  )
}


export default ProfileForm;