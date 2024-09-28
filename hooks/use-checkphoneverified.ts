 
// import { create } from 'zustand';
// import { checkPhoneStatus } from '@/actions/hire-talent/checkPhoneVerify';

// interface PhoneState {
//   phoneStatus: boolean | null;
//   isLoading: boolean;
//   error: string | null;
//   checkPhoneStatus: (userId: string, phone: string) => Promise<void>;
// }

// export const usePhoneVerifiedStore = create<PhoneState>((set) => ({
//   phoneStatus: null,
//   isLoading: false,
//   error: null,
//   checkPhoneStatus: async (userId: string, phone: string) => {
//     set({ isLoading: true, error: null });
//     try {
//       if (userId === undefined || phone === undefined) {
//         return;
//       }
//       const res = await checkPhoneStatus(userId, phone); 
//       if (res?.success) {
//         set({ phoneStatus: true, isLoading: false });
//       } else {
//         set({ phoneStatus: false, isLoading: false });
//       }
//     } catch (error: any) {
//       set({ error: error?.message || 'Failed to fetch phone status', isLoading: false });
//     }
//   },
// }));


 