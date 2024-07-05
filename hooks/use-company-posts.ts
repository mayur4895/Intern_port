// hooks/useCompanyPosts.ts
import { useQuery } from '@tanstack/react-query';
import { getAllPosts } from '@/actions/hire-talent/getallPosts';
import type { Post } from '@prisma/client';

const fetchCompanyPosts = async (): Promise<Post[]> => {
  const res = await getAllPosts();
  if (res?.success && res?.data) {
    return res.data;
  } else {
    throw new Error(res?.error || 'Failed to fetch company posts');
  }
};

export const useCompanyPosts = () => {
  return useQuery<Post[], Error>({
     queryKey:['companyPosts'], 
    queryFn:fetchCompanyPosts,
    staleTime: 1000 * 60 ,
  
  
  })
  
};
