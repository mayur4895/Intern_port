'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteCompanyPost } from '@/actions/hire-talent/DeleteCompanyPost';

interface DeleteCompanyPostResponse {
  success?: string;
  error?: string;
}

export const useDeleteCompanyPost = () => {
  const queryClient = useQueryClient();

   const     mutation = useMutation({
    mutationFn:  async(postId:string)=>{
        const response = await DeleteCompanyPost(postId);
        return response as DeleteCompanyPostResponse;
    },
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ['companyPosts'] })
    },
  })

  return mutation;
}