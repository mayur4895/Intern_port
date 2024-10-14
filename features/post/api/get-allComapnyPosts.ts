import { useQuery } from '@tanstack/react-query';
import { getAllCompanyPosts } from '@/actions/hire-talent/getallCompanyPosts';
import  type { Application, Post } from '@prisma/client';

 

 
interface PostWithApplications extends Post {
  applications: Application[];
}
 
export const useGetCompanyPosts = () => {
  return useQuery<PostWithApplications[], Error>({
    queryKey: ['companyPosts'],
    queryFn: async () => {
      const response = await getAllCompanyPosts();
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data || [];
    },
  });
};
