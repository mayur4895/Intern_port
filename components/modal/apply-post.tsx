'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Button } from "@/components/ui/button"
 
import qs from "query-string"
 
 
 
import {  useToast } from "../ui/use-toast"
 import axios from "axios"  
import {  useParams, useRouter } from "next/navigation"
import { ModalData, useModal } from '../../hooks/use-modal-store';
import { useDeleteCompanyPost } from "@/features/post/api/delete-companyPost"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { DialogClose } from "@radix-ui/react-dialog"
import { IoClose } from "react-icons/io5"
import { VscClose } from "react-icons/vsc";

 
 

 
const ApplyPost = ()=>{
  const {isOpen,onClose,type,data} = useModal();
   
 
 
 
  
  const isModalOpen = isOpen &&  type === "applyPost"
 
 const router = useRouter();
  const [modalOpen,setmodalOpen] = useState(isModalOpen);

 const { toast } = useToast();
 
   
 
 
 const handleClose = ()=>{
  onClose();
 }
 
    return(<>
  <Dialog  open={isModalOpen} onOpenChange={ setmodalOpen}  > 
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-normal"> 
            Apply for {}
              </DialogTitle>
          <DialogDescription> 
          </DialogDescription>
          <DialogClose  className=" absolute top-1 right-3  h-7 w-7 flex items-center justify-center z-10 bg-white" onClick={handleClose}>
          <VscClose size={22}/>

          </DialogClose>
        </DialogHeader>  
      </DialogContent>
    </Dialog>
    </>) 
}


export default ApplyPost;