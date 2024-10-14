import { useQuery, UseQueryResult } from '@tanstack/react-query';
 
import { getDepartments } from '@/actions/hire-talent/getDepartments';
 

export const useGetDepartments = () => {
  return useQuery({
    queryKey: ['Departments'],
    queryFn: async () => {
      const result = await getDepartments();
      if (result.error) {
        throw new Error(result.error);
      }
     
      
      return result.data;
    },
  });
};