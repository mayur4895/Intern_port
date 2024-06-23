 
import { getCompnayDetails } from "@/actions/hire-talent/getcompnayDetails";
import { currentUser } from "@/lib/auth";
import { create } from "zustand";
 

 
interface CompnayStore { 
  data: {};
  getCompanyData:(data?:{})=> void
  

}  
 
export const useCompanyData = create<CompnayStore>((set) => ({
  data: {},
  getCompanyData:async()=>{ 

            
  }

}));