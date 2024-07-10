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
 
 
 

 
const DeletePost = ()=>{
  const {isOpen,onClose,type,data} = useModal();
   
 
    
 
  
  const isModalOpen = isOpen &&  type === "deletePost"
 
 const router = useRouter();
  

 const { toast } = useToast();
 const deletePostMutation = useDeleteCompanyPost();
const queryClient = useQueryClient();
 
   async function onDelete() {
    try { 
        if (data && 'post' in data) {
        
      await  deletePostMutation.mutateAsync(data.post.id)
     queryClient.invalidateQueries({ queryKey: ['companyPosts'] });   
   toast({
    variant:"success",
    title:"post Deleted"
   })
   onClose();
   
}
    } catch (error) {
      console.error('Error deleting post:', error);
 
    }
    
  }

 
 
 const handleClose = ()=>{
  onClose();
 }
 
    return(<>
  <Dialog open={isModalOpen} onOpenChange={handleClose}>
      
      <DialogContent  >
        <DialogHeader>
          <DialogTitle className="text-2xl">Are you sure to Delete Server?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Once you Deleted this
             <span className="text-blue-400"> ' asch ' </span> server. permanently deleted
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


export default DeletePost;