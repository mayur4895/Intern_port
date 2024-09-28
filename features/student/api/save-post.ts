'use client'
 
import { SaveApplicationOfPost } from '@/actions/hire-talent/application/savedapplication';
import { SavePost } from '@/actions/student/savedPost';
 
import { useMutation, useQueryClient } from '@tanstack/react-query';
 

interface SavePostResponse {
  success?: string;
  error?: string;
}

export const useSavePost = () => {
  const queryClient = useQueryClient();

   const     mutation = useMutation({
    mutationFn:  async(postId:string)=>{
        const response = await  SavePost(postId);
        return response as SavePostResponse;
    },
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ['InternshipPosts'] })
     
    },
  })

  return mutation;
}