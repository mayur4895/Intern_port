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
import { ScrollArea } from "../ui/scroll-area";
import FileUpload from "../FileUpload";
import { UploadDropzone } from "@/lib/uploadthing";
 



 
interface ProfileUploadProps {
  onChange: (url?: string) => void;
  endpoint: "StudentProfile"
  value: string | undefined;
}

const ProfileUpload = ({
  onChange,
  value,
  endpoint
}: ProfileUploadProps) => {
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "Studentprofile";
  const router = useRouter();
  const { toast } = useToast();
  
     
  const handleClose = () => {
    onClose();
  };


   
 
 
  async function onSubmit(values: z.infer<typeof StudentProfileSchema>) { 
    
         alert(values);
        
       
  }
  const [Name ,setName] = useState('');
  const [Size,setSize] = useState<any>();
  return (


    <>
    
      <Dialog open={isModalOpen}>
          <DialogContent className="   h-full  scroll-auto overflow-auto  scrollbar-thin  max-w-2xl ">
          <DialogClose
                className="    absolute  top-0 right-0 h-10 w-10 p-1 flex items-center justify-center z-10 bg-blue-200 rounded-bl-3xl"
                onClick={handleClose}
              >
                <VscClose size={22} />
              </DialogClose>
            <DialogHeader  >
              <DialogTitle className="text-xl   text-start font-normal">
                   Profile
              </DialogTitle>
              <DialogDescription> 
              </DialogDescription> 
            </DialogHeader> 
            <UploadDropzone
                endpoint={endpoint}
                onClientUploadComplete={(res) => {
                setName(res?.[0].name);
                setSize(res?.[0].size);
                    onChange(res?.[0].url);
                }}
                onUploadError={(error: Error) => {
                    console.log(`ERROR! ${error.message}`);
                }}
            />
          </DialogContent>
         
        </Dialog> 
  
    </>
  );
}

export default ProfileUpload;
