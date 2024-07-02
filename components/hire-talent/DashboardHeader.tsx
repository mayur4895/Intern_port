'use client'
import React from 'react'
import { PiBuildingsFill } from "react-icons/pi";
import NavigationDashboard from './NavigationDashboard';
import { CurrentUser } from '@/hooks/use-current-user';
import UserButton from './UserButton';
const DashboardHeader = () => {
    const currentUser = CurrentUser();
  return (
   <header className=' text-white  py-8 lg:px-18 pb-36 px-4 bg-gradient-to-b from-blue-700 to to-blue-500'> 
   <div className=' max-w-screen-2xl mx-auto'>
     <div className='mb-14 w-full flex items-center justify-between'>
 
 <div className=' flex items-end gap-2 '>
 <PiBuildingsFill size={30}/> Modern
 </div>
 <NavigationDashboard/>
 <UserButton/>
 
     </div>

     <h3 className='text-2xl'>Welcome Back {currentUser?.name} 👋</h3>
   </div>
   </header>
  )
}

export default DashboardHeader
