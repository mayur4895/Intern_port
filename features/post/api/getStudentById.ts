import { useQuery, UseQueryResult } from '@tanstack/react-query';
import type { Post } from '@prisma/client';
import { getStudent } from '@/actions/student/getStudent';
 

export const useGetStudent = (studentId: string) => {
  return useQuery({
    queryKey: ['Student', studentId],
    queryFn: async () => {
      const result = await getStudent(studentId);
      if (result.error) {
        throw new Error(result.error);
      }
      return result.data;
    },
  });
};