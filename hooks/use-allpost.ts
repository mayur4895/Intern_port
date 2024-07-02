import {create} from 'zustand';
 
 
import { getAllPosts } from '@/actions/hire-talent/getallPosts';
import  type { Post } from '@prisma/client';

interface companyPostState {
  Posts:  Post[] | null;
  isLoading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
}

export const useCompanyPosts = create<companyPostState>((set) => ({
  Posts: null,
  isLoading: false,
  error: null,
  fetchPosts: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await  getAllPosts();
      if (res?.success && res.data) { 
        set({Posts: res.data?.posts, isLoading: false });
      } else {
        set({ error: res?.error || 'Failed to fetch company posts', isLoading: false });
      }
    } catch (error:any) {
      set({ error: error?.message || 'Failed to fetch company posts', isLoading: false });
    }
  },
}));
