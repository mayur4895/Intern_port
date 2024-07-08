'use client'
import React from 'react'
import { PiBuildingsFill } from "react-icons/pi";
import NavigationDashboard from './NavigationDashboard';
import { CurrentUser } from '@/hooks/use-current-user';
import UserButton from './UserButton';
import { FaBuilding, FaRegBuilding } from 'react-icons/fa';
import MarkupContent from './MarkupContent';
const DashboardHeader = () => {
    const currentUser = CurrentUser();
    console.log(currentUser?.companyDetails);
    
    
  return (
   <header className=' text-white  py-8 lg:px-18 pb-36 px-4 bg-gradient-to-b from-blue-700 to to-blue-500'> 
   <div className=' max-w-screen-2xl mx-auto'>
     <div className='mb-14 w-full flex items-center justify-between'>
 
 <div className='flex items-end gap-2 '>
 <PiBuildingsFill size={30}/> Modern
 </div>
 <NavigationDashboard/>
 <div className=' hidden lg:block'>
 <UserButton/> 

 </div>
      </div>

    <div className=' flex flex-col gap-3 text-white'>
    <h3 className='text-2xl'>Welcome Back {currentUser?.name} 👋</h3>
     <h2 className=' mt-0 text-xl'> Company: {currentUser?.companyDetails?.name}</h2>
     <MarkupContent content={currentUser?.companyDetails?.description}  className={'text-white'}/>
 
     <span className='flex items-center gap-2'><FaRegBuilding size={22}/> {currentUser?.companyDetails?.employees} Employees </span>
    </div>
   </div>
   </header>
  )
}

export default DashboardHeader
