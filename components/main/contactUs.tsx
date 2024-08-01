
"use client"
 
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
import axios from "axios"
import { GetInTouch } from "@/actions/getInTouch"
import { useToast } from "../ui/use-toast"
import { Card, CardHeader } from "../ui/card"
import { CiLocationOn, CiMail } from "react-icons/ci"
import { PiPhoneThin } from "react-icons/pi"
 
export const formSchema = z.object({
  firstname: z.string().min(2, {
    message: "firstname must be at least 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "lastname must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  jobtitle: z.string().min(2, {  message: "required",}),
  phone:z.string().min(10,{
    message: "Invalid phone number must be at least 10 digits."
  }),
  Profession: z.enum(["I am Student", "I am Employer"]),
})
 

const ContactUs = ()=>{
const {toast} = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname:"",
      email:"",
      jobtitle:"",
      phone:"",
      Profession: "I am Employer"
    },
  })
 
 
  async function onSubmit(values: z.infer<typeof formSchema>) {
    

    try{
       const res = await  GetInTouch(values);

       if(res.success){
          toast({
            title:"Details Saved",
            variant:"success"
          })
        form.reset();
       }

       if(res.error){
        toast({
          title:res.error,
          variant:"destructive"
        })
        
      form.reset();
       }
    }catch{
      toast({
        title:"Error while details Saved",
        variant:"destructive"
      })
      form.reset();
    }
  
  }
    return(<>
 <div className=" w-full mt-4 px-2">
 
      <div className=' grid lg:grid-cols-2 gap-4 w-full'>
               
             <div className=' h-[500px] w-full  flex   flex-col gap-5  lg:px-5 '>
             <div>
                <h1 className=" font-medium text-2xl">Modern College Ganeshkhind</h1>
                <span>Apply to Internship</span>
              </div>
             <Card>
                   <CardHeader>
                    <span className="text-sm text-gray-600 flex items-center gap-2"><CiLocationOn />Location</span>
                    <span className="text-sm text-zinc-800">GaneshKhind,pune</span>
                   </CardHeader>
                 </Card>
                 <Card>
                   <CardHeader>
                    <span className="text-sm text-gray-600 flex items-center gap-2"> <CiMail /> Email:</span>
                    <span className="text-sm text-zinc-800">moderncollege16@gmail.com</span>
                   </CardHeader>
                 </Card>
                 <Card>
                   <CardHeader>
                    <span className="text-sm text-gray-600 flex items-center gap-2"><PiPhoneThin /> phone:</span>
                    <span className="text-sm text-zinc-800">7768050797 / 7768020797</span>
                   </CardHeader>
                 </Card>

              </div>
            
                <div className=" w-full   px-5 lg:px-20">
                  <div className="mb-5">
                    <h2 className="text-2xl font-semibold">Get In Touch</h2>
                    <p className=" lg:text-sm text-gray-500">Need Help with Something? Get in touch with our friendly team and we will get in touch within 2 hours</p>
                  </div>
                <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
       <div className=" flex  gap-5">
       <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem className=" w-full">
            
              <FormControl>
                <Input placeholder="Enter Firstname"  className=" focus-visible:ring-0  border-transparent rounded-none focus:ring-0  border-b-zinc-300" {...field} />
              </FormControl> 
             
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem className=" w-full">
            
              <FormControl>
                <Input placeholder="Enter Lastname"  className=" focus-visible:ring-0  border-transparent rounded-none focus:ring-0  border-b-zinc-300" {...field} />
              </FormControl> 
         
            </FormItem>
          )}
        />
       </div>
       <FormField
          control={form.control}
          name="jobtitle"
          render={({ field }) => (
            <FormItem className=" w-full">
            
              <FormControl>
                <Input placeholder="Enter jobtitle"  className=" focus-visible:ring-0  border-transparent rounded-none focus:ring-0  border-b-zinc-300" {...field} />
              </FormControl> 
         
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
            
              <FormControl>
                <Input placeholder="Enter Work email"  type="email" className=" focus-visible:ring-0  border-transparent rounded-none focus:ring-0  border-b-zinc-300" {...field} />
              </FormControl> 
             
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
            
              <FormControl>
                <Input placeholder="Enter phone"  className=" focus-visible:ring-0  border-transparent rounded-none focus:ring-0  border-b-zinc-300" {...field} />
              </FormControl> 
         
            </FormItem>
          )}
        />
        <Button type="submit">Get In touch</Button>
      </form>
    </Form>
   </div>
              </div>
       
 </div>
    </>)
}


export default ContactUs