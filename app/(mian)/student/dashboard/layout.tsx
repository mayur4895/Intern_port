 
 
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
import StudentAsidebar from "@/components/student/StudentAsidebar"
import StudentDashboardHeader from "@/components/student/StudentDashboardHeader"
 


const StudentDashboardLayout = ({children}:{children:React.ReactNode}) => {

 
   
const currentUser = CurrentUser();

 
  

 return (
   <div className="   w-full    "> 

 
    <StudentAsidebar /> 
  <div className='  lg:pl-48 w-full   '>  
  
   
 <div className=" lg:pl-12    mt-0   h-full   w-full">
 <StudentDashboardHeader/>
 {children}
 </div>
     
   </div>
</div>
 )
}

export default StudentDashboardLayout
