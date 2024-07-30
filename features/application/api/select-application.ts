'use client'
 
 
import { selectApplicationForPost } from '@/actions/hire-talent/application/SelectApplication';
import { useMutation, useQueryClient } from '@tanstack/react-query';
 

interface SaveApplicationPostResponse {
  success?: string;
  error?: string;
}

export const useSelectApplicationOfPost = () => {
  const queryClient = useQueryClient();

   const     mutation = useMutation({
    mutationFn:  async(appicationId:string)=>{
        const response = await selectApplicationForPost(appicationId);
        return response as SaveApplicationPostResponse;
    },
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ['ApplicationsofPost'] })
     
    },
  })

  return mutation;
}