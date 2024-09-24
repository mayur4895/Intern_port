import { getApplicationsofPost } from "@/actions/hire-talent/getApplicationsofPost";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetApplicationofPost = (postId: string) => {
  return useQuery({
    queryKey: ['ApplicationsofPost', postId],
    queryFn: async () => {
<<<<<<< HEAD
      try {     
        const result = await getApplicationsofPost(postId);  
=======
      try {
        const result = await getApplicationsofPost(postId); 
    
>>>>>>> 4f65923a7d1ca3bd75068350a5fbd281650e454c
        if (result.error) {
          throw new Error(result.error);
        }
   
        return result.data;
      } catch (error) {
        console.error('Error fetching post applications:', error);
        throw error;  
      }
    },
  });
};
