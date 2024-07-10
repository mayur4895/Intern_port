import { useQuery } from '@tanstack/react-query';
import { getAllCompanyPosts } from '@/actions/hire-talent/getallCompanyPosts';
import { Post } from '@prisma/client';

 

export const useGetCompanyPosts = () => {
  return useQuery<Post[], Error>({
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
