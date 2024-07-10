import React from 'react';
 
import { useDeleteCompanyPost } from '@/features/post/api/delete-companyPost';
import { MoreHorizontal } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useQueryClient } from '@tanstack/react-query';
 
 
const PostActionsCell = ({ row }:any) => {
  const post = row.original;
  const { toast } = useToast();
  const deletePostMutation = useDeleteCompanyPost();
const queryClient = useQueryClient();
  const handleDelete =   (postId:string) => {
    try {
        deletePostMutation.mutate(postId);  
   console.log("delete post");
    queryClient.invalidateQueries({ queryKey: ['companyPosts'] });   
   toast({
    title:"post Deleted"
   })
   
    } catch (error) {
      console.error('Error deleting post:', error);
 
    }
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
          Copy Post ID
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDelete(post.id)}>
          Delete Post
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View Post Details</DropdownMenuItem>
        <DropdownMenuItem>View Applications</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostActionsCell;
