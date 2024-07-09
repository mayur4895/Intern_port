// hooks/useDeletePost.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteInternshipPost } from '@/actions/hire-talent/DeleteInternshipPost';

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      console.log(`Deleting post with ID: ${postId}`);
      const response = await DeleteInternshipPost(postId);
      console.log('Delete response:', response);
      return response;
    },
    onSuccess: () => {
      console.log('Invalidating companyPosts query...');
      queryClient.invalidateQueries({queryKey:['companyPosts']});
    },
    onError: (error) => {
      console.error('Error deleting post:', error);
    },
  });
};
