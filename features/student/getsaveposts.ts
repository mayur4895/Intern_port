import { useQuery, UseQueryResult } from '@tanstack/react-query';
import type { Post } from '@prisma/client';
 
 
import { getSavedPost } from '@/actions/student/getsavedpost';
 

export const useGetSavedPost = (userId: string) => {
  return useQuery({
    queryKey: ['SavedPost', userId],
    queryFn: async () => {
      const result = await getSavedPost(userId);
      if (result.error) {
        throw new Error(result.error);
      }
      return result.data;
    },
  });
};