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
 
 
 

 
const ApplyPost = ()=>{
  const {isOpen,onClose,type,data} = useModal();
   
 
    
 
  
  const isModalOpen = isOpen &&  type === "applyPost"
 
 const router = useRouter();
  

 const { toast } = useToast();
 
   
 
 
 const handleClose = ()=>{
  onClose();
 }
 
    return(<>
  <Dialog open={isModalOpen} onOpenChange={handleClose}>
      
      <DialogContent  >
        <DialogHeader>
          <DialogTitle className="text-2xl">Apply Post</DialogTitle>
          <DialogDescription> 
          </DialogDescription>
        </DialogHeader>  
      </DialogContent>
    </Dialog>
    </>) 
}


export default ApplyPost;