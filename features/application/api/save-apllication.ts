'use client'
 
import { SaveApplicationOfPost } from '@/actions/hire-talent/application/savedapplication';
import { useMutation, useQueryClient } from '@tanstack/react-query';
 

interface SaveApplicationPostResponse {
  success?: string;
  error?: string;
}

export const useSaveApplicationOfPost = () => {
  const queryClient = useQueryClient();

   const     mutation = useMutation({
    mutationFn:  async(appicationId:string)=>{
        const response = await SaveApplicationOfPost(appicationId);
        return response as SaveApplicationPostResponse;
    },
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ['ApplicationsofPost'] })
     
    },
  })

  return mutation;
}