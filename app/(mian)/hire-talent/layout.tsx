'use client'
import { motion } from 'framer-motion';
import MainNavbar from '@/components/Navbar/Employer/MainNavbar'
import StepperForm from '@/components/ui/stepper';
 
import { CurrentUser } from '@/hooks/use-current-user';
import { UserType } from '@prisma/client';
import { redirect, usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { getCompnayDetails } from '@/actions/hire-talent/getcompnayDetails';
import { currentUser } from '@/lib/auth';
import { Loader2 } from 'lucide-react';
  

const HireTalentLayout =  ({children}:{children:React.ReactNode}) => {
  const session =   CurrentUser();

  if(session?.role === UserType.STUDENT){
    return redirect("/student/dashboard")
  }
  
  const  [isLoading,setIsLoading]= useState(false);
  const [CompnayData ,setCompnayData] = useState<any>({})
  const router = useRouter();
 
  const getCompnayData = async()=>{
    try {
       setIsLoading(true)
       const res = await  getCompnayDetails(session?.id);
   
      if(res?.success && res.data){
       setIsLoading(false); 
       setCompnayData(res.data?.compnayDetails[0]);
      }
    } catch (error) {
     setIsLoading(false);
    } 
     }
  

 useEffect(()=>{
  getCompnayData();
  
  
    

 },[])
 
  return (
    <> 
    {/* {isLoading && (
         <div className='w-full h-full fixed top-0 z-50 left-0 bg-white flex items-center justify-center'>
         <Loader2 className=' animate-spin ' size={25} />
         </div>
    )} */}
     <div>
      
      <MainNavbar session={session?.role as UserType === "EMPLOYER" ? session : null}/>
 



 <div className='w-full mt-12'>    
  

 <div>
 {children} 
 </div>
 </div>
      
     
     </div>
     </>
  )
}

export default HireTalentLayout
