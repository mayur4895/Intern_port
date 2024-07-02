'use client'
import DashboardHeader from '@/components/hire-talent/DashboardHeader'
 import { CurrentUser } from '@/hooks/use-current-user'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo } from 'react'

const DashboardLayout = ({children}:{children:React.ReactNode}) => {
 
  const router = useRouter()

   const currentUser = CurrentUser();
    
 

 
   useEffect(()=>{
    if(!currentUser) {
       router.push('/login')
    }

    if(currentUser && currentUser?.isPhoneVerified === false){
      router.push("/hire-talent/profile")
    }
  

   },[currentUser])
   

  return (
 <div> 
 <DashboardHeader /> 

   <div>
      {children}
    </div>
 </div>
  )
}

export default DashboardLayout
