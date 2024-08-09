'use client'
import { DeleteApplicationOfPost } from '@/actions/hire-talent/deleteApplicationOfPost';
import { useMutation, useQueryClient } from '@tanstack/react-query';
 

interface DeleteApplicationPostResponse {
  success?: string;
  error?: string;
}

export const useDeleteApplicationOfPost = () => {
  const queryClient = useQueryClient();

   const     mutation = useMutation({
    mutationFn:  async(data:any)=>{
        const response = await DeleteApplicationOfPost(data);
        return response as DeleteApplicationPostResponse;
    },
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ['ApplicationsofPost'] })
    },
  })

  return mutation;
}