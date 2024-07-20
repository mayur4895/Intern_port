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
import { useDeleteApplicationOfPost } from "@/features/application/api/delete-applicationOf-post"
 
 
 

 
const DeleteApplication = ()=>{
  const {isOpen,onClose,type,data} = useModal();
   
 
    
 
  
  const isModalOpen = isOpen &&  type === "deleteApplication"
 
 const router = useRouter();
  

 const { toast } = useToast();
 const deleteApplicationOfPostMutation = useDeleteApplicationOfPost();
const queryClient = useQueryClient();
 
   async function onDelete() {
    try { 
    
        
    
           console.log( data);
           
         deleteApplicationOfPostMutation.mutate(data)
     queryClient.invalidateQueries({ queryKey: ['ApplicationsofPost'] });   
   toast({
    variant:"success",
    title:"Application Deleted"
   })
   onClose();
   
 
    } catch (error) {
      console.error('Error deleting Application:', error);
 
    }
    
  }

 
 
 const handleClose = ()=>{
  onClose();
 }
 
    return(<>
  <Dialog open={isModalOpen} onOpenChange={handleClose}>
      
      <DialogContent  >
        <DialogHeader>
          <DialogTitle className="text-xl font-medium text-start">Are you sure to Delete this Application?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Once you Deleted this  Application
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex items-center">
          <Button variant={"outline"} onClick={()=>{onClose()}}>Cancel</Button>
          <Button className=" bg-red-500 text-white hover:bg-red-600 hover:text-white" onClick={()=>{onDelete()}} variant={"outline"}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>) 
}


export default DeleteApplication;