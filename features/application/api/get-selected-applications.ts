import { useQuery, UseQueryResult } from '@tanstack/react-query';
import type { Post } from '@prisma/client';
import { getSelectedApplicationsofPosts } from '@/actions/hire-talent/application/getSelectedApplications';
 
 
 

export const useGetSelectedApplicationofPost = (userId: string) => {
  return useQuery({
    queryKey: ['SelectedApplicationsofPost', userId],
    queryFn: async () => {
      const result = await getSelectedApplicationsofPosts(userId);
      if (result.error) {
        throw new Error(result.error);
      }
      return result.data;
    },
  });
};