import { getApplicationsofPost } from "@/actions/hire-talent/getApplicationsofPost";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetApplicationofPost = (postId: string) => {
  return useQuery({
    queryKey: ['ApplicationsofPost', postId],
    queryFn: async () => {
      try {     
        const result = await getApplicationsofPost(postId);  
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
