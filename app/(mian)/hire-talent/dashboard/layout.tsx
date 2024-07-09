 
 
'use client'
 import Link from "next/link"
import DashboardHeader from '@/components/hire-talent/DashboardHeader'
import {
 
  Home,
  LineChart,
 
  Package,
  Package2,
  
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react" 
 import { CurrentUser } from '@/hooks/use-current-user'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Asidebar from "@/components/hire-talent/Asidebar"
 
 
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
  

   },[currentUser,router])
   

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <TooltipProvider> 
     <Asidebar/>
      </TooltipProvider>
   <div className='  lg:pl-40'>
   <div className="flex flex-col sm:gap-4 sm:py-4  lg:pl-14 sm:px-4">
     <DashboardHeader />
 
      {children}
      </div>
    </div>
 </div>
  )
}

export default DashboardLayout
