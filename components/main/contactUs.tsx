
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
 
const formSchema = z.object({
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
 
 
  function onSubmit(values: z.infer<typeof formSchema>) {
    
    console.log(values)
  }
    return(<>
 <div className=" container">
 
      <div className=' grid lg:grid-cols-2 gap-4 w-full'>
             
             <div className=' h-[500px] w-full bg-slate-500/20'>
                info
              </div>
            
                <div className=" w-full   p-5 px-20">
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