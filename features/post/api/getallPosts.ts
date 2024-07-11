import { useQuery } from '@tanstack/react-query';
 
import  type { Application, Post } from '@prisma/client';
import { getAllInternships } from '@/actions/student/getAllInternships';

 


 
export const useGetAllPosts = () => {
  return useQuery<Post[], Error>({
    queryKey: ['InternshipPosts'],
    queryFn: async () => {
      const response = await getAllInternships();
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data || [];
    },
  });
};
