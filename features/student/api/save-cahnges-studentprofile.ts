 
import { UpdatestudentProfile } from '@/actions/student/updateProfile';
import { StudentProfileFormValues } from '@/app/(mian)/student/(routes)/profile/page';
import { useMutation } from '@tanstack/react-query';

interface UpdateStudentProfileResponse {
  success?: string;
  error?: string;
}

export const useUpdateStudentProfile = () => {
  const mutation = useMutation({
    mutationFn: async ({ values, userId }: { values: StudentProfileFormValues; userId: string }) => {
      const response = await UpdatestudentProfile(values, userId); // Assuming your API can handle userId
      return response as UpdateStudentProfileResponse;
    },
  });

  return mutation;
};
