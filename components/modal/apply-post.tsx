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
import { applyToInternship } from "@/actions/hire-talent/applyToInternship";
import { useGetInternship } from "@/features/post/api/getInternship";
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



const formSchema = z.object({
  resume: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})
const ApplyPost = () => {
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "applyPost";
  const router = useRouter();
  const { toast } = useToast();

  const [internship, setInternship] = useState<Post | null>(null);
  
  const isModalData = (data: {}): data is ModalData => {
    return (data as ModalData).studentId !== undefined && (data as ModalData).postId !== undefined;
  };
 
  const studentId = isModalData(data) ? data.studentId : null;
  const postId = isModalData(data) ? data.postId : null;

  const { data: internshipData } = useGetInternship(postId || '');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resume: "",
    },
  })
  useEffect(() => {
    if (internshipData) {
      setInternship(internshipData);
    }
  }, [internshipData]);

   

  const handleClose = () => {
    onClose();
  };


   
 
 
  async function onSubmit(values: z.infer<typeof formSchema>) { 
    if (studentId && postId) {
      const response = await applyToInternship(postId, studentId);
      if (response.error) {
        alert(response.error);
      } else {
        alert('Application submitted successfully');
      }
    } else {
      console.error("Invalid modal data");
    }
  }

  return (
    <>
      <Dialog open={isModalOpen} >
        <DialogContent>
          
          <DialogHeader>
            <DialogTitle className="text-xl font-normal">
              Apply for {internship?.internshipProfile}
            </DialogTitle>
            <DialogDescription>
              {internship?.companyName}
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
        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Resume</FormLabel>
              <FormControl>
               <FileUplod value={field.value} onChange={field.onChange} endpoint="ResumePdf"/>
              </FormControl> 
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit Application</Button>
      </form>
    </Form>      
        </DialogContent>
       
      </Dialog>
    </>
  );
}

export default ApplyPost;
