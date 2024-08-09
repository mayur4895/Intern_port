import { getStudentProfile } from '@/actions/student/getStudentProfile';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
 
 
 
 

export const useGetStudentProfileInfo = (studentId: string) => {
  return useQuery({
    queryKey: ['useGetStudentProfileInfo', studentId],
    queryFn: async () => {
      const result = await getStudentProfile(studentId);
      if (result.error) {
        throw new Error(result.error);
      }
      return result.data;
    },
  });
};