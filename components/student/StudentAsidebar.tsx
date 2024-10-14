'use client'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Home, Building2, LineChart, Package, Settings, PanelLeft } from 'lucide-react'
import { FaPlusCircle } from 'react-icons/fa'
import { usePathname } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
 
import { PiSuitcaseSimpleLight } from 'react-icons/pi'
import { TbBrandGoogleHome } from 'react-icons/tb'
 
import { CiHome, CiLogout, CiUser } from 'react-icons/ci'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { signOut } from 'next-auth/react'
import { CurrentUser } from '@/hooks/use-current-user'
 
 

 
const StudentAsidebar = () => {
 
  const  pathname  =  usePathname();

  const isActive = (path:any) => pathname === path
  const  currentUser  =   CurrentUser();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: true, callbackUrl: "/" });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <div>
      <aside className="fixed    inset-y-0 left-0 z-10 hidden md:w-60 flex-col border-r border-r-zinc-300  text-zinc-800   bg-[#312C51] lg:flex">
        <nav className="flex flex-col items-start gap-5 w-full sm:py-5 px-2  ">
          <div  className='flex items-center  w-full  px-2 py-2 gap-2'>
            
         
              <Avatar>
                      <AvatarImage src={currentUser?.image} />
                      <AvatarFallback>
                        <div className=" shadow h-10  bg-white  text-xl font-semibold w-10 rounded-full flex justify-center items-center">
                          {currentUser?.name[0]}
                        </div> 
                      </AvatarFallback>
                    </Avatar> 
                <div className=' flex flex-col gap-1 text-white'>
                <span className=' truncate   w-[98%] text-xs  font-medium'>{currentUser?.name}</span>
                <span className=' truncate   w-[98%] text-xs font-normal'>{currentUser?.email}</span>

              
                </div>
 
          </div>
          <Separator className=' bg-zinc-800 '/>
          <Link href="/student/dashboard"  
              className={` font-semibold text-sm text-white rounded-md flex items-center gap-2 p-2 w-full relative  ${
                isActive('/student/dashboard') ? ' overflow-hidden  bg-[#48426D]  text-white' : '  '
              }`}
            >
          <CiHome  size={22} className={' bg-white p-1 h-7 w-7 rounded-3xl  text-black'}/>
              <span>Dashboard</span>
              {isActive('/student/dashboard') && (
                <div className="top-0 right-0 absolute     h-10 w-[3px]" />
              )}
          
          </Link>

          <Link href="/student/dashboard/jobs"
           
              className={`text-sm font-semibold text-white flex rounded-md items-center gap-2 w-full relative p-2 ${
                isActive('/student/dashboard/jobs') ? ' overflow-hidden  bg-[#48426D] text-white' : ' '
              }`}
            >
              <PiSuitcaseSimpleLight className={' bg-white p-1 h-7 w-7 rounded-3xl  text-black'}/>
              <span>Internships</span>
              {isActive('/student/dashboard/jobs') && (
                <div className="top-[1.8px] right-0 absolute bg-[#48426D] h-8 w-[2px]" />
              )}
        
          </Link>


          <Link href="/student/dashboard/profilepage"
           
           className={`text-sm font-semibold flex rounded-md text-white items-center gap-2 w-full relative p-2 ${
             isActive('/student/dashboard/profilepage') ?' overflow-hidden bg-[#48426D]  text-white' : ' '
           }`}
         >
           <CiUser  className={' bg-white p-1 h-7 w-7 rounded-3xl  text-black'}/>
           <span>Your Profile</span>
           {isActive('/student/dashboard/profilepage') && (
             <div className="top-[1.8px] right-0 absolute bg-[#48426D] h-8 w-[2px]" />
           )}
     
       </Link>

       <Link href="/student/dashboard/applications"
           
           className={`text-sm font-semibold flex rounded-md text-white items-center gap-2 w-full relative p-2 ${
             isActive('/student/dashboard/applications') ?' overflow-hidden bg-[#48426D]  text-white' : ' '
           }`}
         >
           <CiUser  className={' bg-white p-1 h-7 w-7 rounded-3xl  text-black'}/>
           <span>My Applications</span>
           {isActive('/student/dashboard/applications') && (
             <div className="top-[1.8px] right-0 absolute bg-[#48426D] h-8 w-[2px]" />
           )}
     
       </Link>

       <Link href="/student/dashboard/bookmark"
           
           className={`text-sm font-semibold flex rounded-md text-white items-center gap-2 w-full relative p-2 ${
             isActive('/student/dashboard/bookmark') ?' overflow-hidden bg-[#48426D]  text-white' : ' '
           }`}
         >
           <CiUser  className={' bg-white p-1 h-7 w-7 rounded-3xl  text-black'}/>
           <span>My Bookmarks</span>
           {isActive('/student/dashboard/bookmark') && (
             <div className="top-[1.8px] right-0 absolute bg-[#48426D] h-8 w-[2px]" />
           )}
     
       </Link>

          <Link  href={""} className='text-sm font-semibold text-white flex rounded-md items-center gap-2 w-full relative p-2'   onClick={async () => {
    try {
      await signOut({ callbackUrl: '/' });  
    } catch (error) {
      console.error('Error during logout:', error);  
    }
  }}>
          <CiLogout  className={' bg-white p-1 h-7 w-7 rounded-3xl  text-black'} />
             Logout
          </Link>

         
        
        </nav>
        <nav className="mt-auto flex rounded-md flex-col items-start gap-4 px-2 sm:py-5">
          <Link href="#"
       
              className={`text-sm text-white flex items-center gap-2 w-full relative p-2${
                isActive('#settings') ? ' overflow-hidden   text-white' : 'hover:bg-blue-100'
              }`}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
              {isActive('#settings') && (
                <div className="top-[1.8px] right-0 absolute bg-blue-500 h-8 w-[2px]" />
              )}
     
          </Link>
        </nav>
 
      </aside>

      
    </div>

  )
}

export default StudentAsidebar
