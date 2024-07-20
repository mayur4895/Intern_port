import type { Application, Post } from "@prisma/client";
import { create } from "zustand";

export type ModalType = "deletePost" | "applyPost"  | "deleteApplication";  

export interface ModalData {  
  post: Post; 
  studentId:string; 
  postId:string; 
  application:Application
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData | {};
  isOpen: boolean;
  onOpen: (type: ModalType, data: {}) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, data: {}, isOpen: false })
}));
