'use client'
 
 
import { studentProfile } from '@/actions/student/studentProfile';
import { StudentProfileFormValues } from '@/app/(mian)/student/(routes)/profile/page';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
 

 
interface UpdatePostResponse {
    success?: string;
    error?: string;
  }
  
  export const useUpdateStudentProfile = () => {
    const mutation = useMutation({
      mutationFn: async (values: StudentProfileFormValues) => {
        const response = await studentProfile(values);
        return response as UpdatePostResponse;
      },
    });
  
    return mutation;
  };