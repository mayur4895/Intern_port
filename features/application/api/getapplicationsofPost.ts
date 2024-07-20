import { useQuery, UseQueryResult } from '@tanstack/react-query';
import type { Post } from '@prisma/client';
import { getApplicationsofPost } from '../../../actions/hire-talent/getApplicationsofPost';
 

export const useGetApplicationofPost = (postId: string) => {
  return useQuery({
    queryKey: ['ApplicationsofPost', postId],
    queryFn: async () => {
      const result = await getApplicationsofPost(postId);
      if (result.error) {
        throw new Error(result.error);
      }
      return result.data;
    },
  });
};