import React from 'react';
 
import { useDeleteCompanyPost } from '@/features/post/api/delete-companyPost';
import { MoreHorizontal } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useQueryClient } from '@tanstack/react-query';
import { useModal } from '@/hooks/use-modal-store';
 
import { CurrentUser } from '@/hooks/use-current-user';
import { UserType } from '@prisma/client';
import { useSaveApplicationOfPost } from '@/features/application/api/save-apllication';
import { useGetSavedApplicationofPost } from '@/features/application/api/get-saved-application';
 
 
const ApplicationActionsCell = ({ row }:any) => {
  const currentUser = CurrentUser();
  const Application = row.original; 
  const {onOpen} = useModal();

  

   

  const handleDelete =   () => {
    onOpen('deleteApplication',{Application})
  };

 
  const { toast } = useToast();
  const saveApplicationOfPostMutation =  useSaveApplicationOfPost();
 const queryClient = useQueryClient();
  
 async function handleSave() {
  try {
    saveApplicationOfPostMutation.mutate(Application.id, {
      onSuccess: (res) => {
        if (res.success) {
          toast({
            variant: "success",
            title: "Success",
            description: res.success,
          });
        } else if (res.error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: res.error,
          });
        }
      },
      onError: (error) => {
        console.error('Error saving application:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "An error occurred while saving the application.",
        });
      }
    });

  
  
  } catch (error) {
    console.error('Error:', error);
    toast({
      variant: "destructive",
      title: "Error",
      description: "An unexpected error occurred.",
    });
  }
}


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(Application.id)}>
          Copy Application ID
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDelete()}>
          Delete Application
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem  onClick={handleSave} >Save Candidate</DropdownMenuItem>
        <DropdownMenuItem>Select Candidate</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ApplicationActionsCell;
