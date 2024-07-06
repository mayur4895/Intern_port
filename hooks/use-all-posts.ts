// hooks/useCompanyPosts.ts
import { useQuery } from '@tanstack/react-query';
 
import type { Post } from '@prisma/client';
 import { getAllInternships } from '@/actions/student/getAllInternships';

const fetchInternships = async (): Promise<Post[]> => {
  const res = await getAllInternships();
  if (res?.success && res?.data) {
    return res.data;
  } else {
    throw new Error(res?.error || 'Failed to fetch company posts');
  }
};

export const useInternships = () => {
  return useQuery<Post[], Error>({
    queryKey:['Posts'], 
    queryFn:fetchInternships,
    staleTime: 1000 * 60 , 
  
  })
  
};
