import { useQuery, UseQueryResult } from '@tanstack/react-query';
import type { Post } from '@prisma/client';
 
import { getSavedApplicationsofPost } from '@/actions/hire-talent/application/getSavedApplications';
 

export const useGetSavedApplicationofPost = (userId: string) => {
  return useQuery({
    queryKey: ['SavedApplicationsofPost', userId],
    queryFn: async () => {
      const result = await getSavedApplicationsofPost(userId);
      if (result.error) {
        throw new Error(result.error);
      }
      return result.data;
    },
  });
};