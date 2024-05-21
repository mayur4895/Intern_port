 
import { create } from "zustand";

export type LoginType =  "student" |  "employer"

 

interface ModalStore {
  type: LoginType | null;   
  onSetType: (type: LoginType) => void;
 
}

export const useLoginType = create<ModalStore>((set) => ({
  type: null, 
  onSetType: (type) => set({type}),
 
}));