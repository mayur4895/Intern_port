import React from 'react';
 
import { useDeleteCompanyPost } from '@/features/post/api/delete-companyPost';
import { MoreHorizontal } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useQueryClient } from '@tanstack/react-query';
import { useModal } from '@/hooks/use-modal-store';
 
 
const ApplicationActionsCell = ({ row }:any) => {
  const post = row.original; 
  const {onOpen} = useModal();
  const handleDelete =   () => {
    onOpen('deletePost',{post})
  };

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
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(post.id)}>
          Copy Application ID
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDelete()}>
          Delete Application
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Save Candidate</DropdownMenuItem>
        <DropdownMenuItem>Select Candidate</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ApplicationActionsCell;
