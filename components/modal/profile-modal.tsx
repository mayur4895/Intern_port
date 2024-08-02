'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "../ui/use-toast";
import { useModal, ModalData } from '../../hooks/use-modal-store';
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { VscClose } from "react-icons/vsc";
 
import { Post } from "@prisma/client";
import { Separator } from "../ui/separator";
import FileUplod from "../FileUpload";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import StudentProfileSchema from "@/schemas/student/profileSchema";
 



 
const ProfileModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "Studentprofile";
  const router = useRouter();
  const { toast } = useToast();

  const [internship, setInternship] = useState<Post | null>(null);
  
  const isModalData = (data: {}): data is ModalData => {
    return (data as ModalData).studentId !== undefined && (data as ModalData).postId !== undefined;
  };
 
  const studentId = isModalData(data) ? data.studentId : null;
  const postId = isModalData(data) ? data.postId : null;
 
  const form = useForm<z.infer<typeof StudentProfileSchema>>({
    resolver: zodResolver(StudentProfileSchema),
    defaultValues: {
        firstname:"",
        lastname: "",
      email: "",
       phone: "", 
      profilePicture: "",
      resumeUrl: "",
    },
  })
  

   

  const handleClose = () => {
    onClose();
  };


   
 
 
  async function onSubmit(values: z.infer<typeof StudentProfileSchema>) { 
    
        console.log(values);
        
       
  }

  return (
    <>
      <Dialog open={isModalOpen} >
        <DialogContent>
          
          <DialogHeader>
            <DialogTitle className="text-xl font-normal">
               Update Profile
            </DialogTitle>
            <DialogDescription>
           
            </DialogDescription>
            <DialogClose
              className="absolute top-1 right-3 h-7 w-7 flex items-center justify-center z-10 bg-white"
              onClick={handleClose}
            >
              <VscClose size={22} />
            </DialogClose>
          </DialogHeader>
          <Separator/>
          
         
            
          <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
   <div className="grid grid-cols-2 w-full items-center gap-2">
   <FormField
  control={form.control}
  name="firstname"
  render={({ field }) => (
    <FormItem className="floating-label-input">
 
    <FormControl>
     <div>
     <Input placeholder=" "   className="peer"  {...field} />
      <label className="absolute text-gray-500 transition-all duration-200 transform -translate-y-2 scale-75 top-3 left-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2">
      Enter FirstName
    </label>
     </div>
    </FormControl> 
    <FormMessage />
  </FormItem>
  )}
/>
<FormField
  control={form.control}
  name="lastname"
  render={({ field }) => (
    <FormItem className="floating-label-input">
 
    <FormControl>
     <div>
     <Input placeholder=" "   className="peer"  {...field} />
      <label className="absolute text-gray-500 transition-all duration-200 transform -translate-y-2 scale-75 top-3 left-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2">
      Enter LastName
    </label>
     </div>
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
    <FormItem className="floating-label-input">
 
    <FormControl>
     <div>
     <Input placeholder=" "   className="peer"  {...field} />
      <label className="absolute text-gray-500 transition-all duration-200 transform -translate-y-2 scale-75 top-3 left-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2">
      Enter Email
    </label>
     </div>
    </FormControl> 
    <FormMessage />
  </FormItem>
  )}
/>
<FormField
  control={form.control}
  name="phone"
  render={({ field }) => (
    <FormItem className="floating-label-input">
 
      <FormControl>
       <div>
       <Input placeholder=" "   className="peer"  {...field} />
        <label className="absolute text-gray-500 transition-all duration-200 transform -translate-y-2 scale-75 top-3 left-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2">
        Enter phone
      </label>
       </div>
      </FormControl> 
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
          control={form.control}
          name="resumeUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Resume</FormLabel>
              <FormControl>
               <FileUplod  value={field.value} onChange={field.onChange} endpoint="ResumePdf"/>
              </FormControl> 
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update Profile</Button>
      </form>
    </Form>      
        </DialogContent>
       
      </Dialog>
    </>
  );
}

export default ProfileModal;
