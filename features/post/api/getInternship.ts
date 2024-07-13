import { useQuery, UseQueryResult } from '@tanstack/react-query';
import type { Post } from '@prisma/client';
import { getInternship } from '@/actions/student/getInternship';

export const useGetInternship = (postId: string): UseQueryResult<Post, Error> => {
  return useQuery<Post, Error>({
    queryKey: ['InternshipPosts', postId],
    queryFn: async () => {
      const data = await getInternship(postId);
      if (!data) {
        throw new Error("Post not found");
      }
      return data;
    },
  });
};
