import { useQuery } from '@tanstack/react-query';
import type { Post } from '@prisma/client';
import { getInternship } from '@/actions/student/getInternship';

export const useGetInternship = (postId: string) => {
  return useQuery<Post, Error>({
    queryKey: ['internship', postId],
    queryFn: async () => {
      return await getInternship(postId);
    },
  });
};
