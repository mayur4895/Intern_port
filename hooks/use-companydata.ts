import {create} from 'zustand';
import { getCompanyDetails } from '@/actions/hire-talent/getcompanyDetails';
import { CompanyDetails } from '@prisma/client';

interface CompanyState {
  companyDetails:  CompanyDetails | null;
  isLoading: boolean;
  error: string | null;
  fetchCompanyDetails: () => Promise<void>;
}

export const useCompanyStore = create<CompanyState>((set) => ({
  companyDetails: null,
  isLoading: false,
  error: null,
  fetchCompanyDetails: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await getCompanyDetails();
      console.log(res);
      
      if (res?.success && res.data) {
        set({ companyDetails: res.data?.companyDetails, isLoading: false });
      } else {
        set({ error: res?.error || 'Failed to fetch company details', isLoading: false });
      }
    } catch (error:any) {
      set({ error: error?.message || 'Failed to fetch company details', isLoading: false });
    }
  },
}));
