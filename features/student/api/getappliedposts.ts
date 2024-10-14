import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Post } from '@prisma/client';
import { getAppliedPost } from '@/actions/student/getAppliedPost';

type AppliedPost = {
  post: Post;
};

export const useGetAppliedPost = (userId: string): UseQueryResult<AppliedPost[], Error> => {
  return useQuery<AppliedPost[], Error>({
    queryKey: ['AppliedPost', userId],
    queryFn: async () => {
      const result = await getAppliedPost(userId);
      if (result.error) {
        throw new Error(result.error);
      }
      // Adjust the return statement to return the array of appliedPosts
      return result.appliedPosts || [];
    },
  });
};
