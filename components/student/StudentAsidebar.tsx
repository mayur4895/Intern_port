'use client'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Home, Building2, LineChart, Package, Settings, PanelLeft } from 'lucide-react'
import { FaPlusCircle } from 'react-icons/fa'
import { usePathname } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CurrentUser } from '@/hooks/use-current-user'
import { PiSuitcaseSimpleLight } from 'react-icons/pi'
import { TbBrandGoogleHome } from 'react-icons/tb'
 
import { CiHome, CiLogout, CiUser } from 'react-icons/ci'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { signOut } from 'next-auth/react'
 
 

 
const StudentAsidebar = () => {
 
  const  pathname  =  usePathname();

  const isActive = (path:any) => pathname === path
  const currentUser = CurrentUser();
  return (
    <div>
      <aside className="fixed inset-y-0 left-0 z-10 hidden md:w-60 flex-col border-r text-white  bg-zinc-800 lg:flex">
        <nav className="flex flex-col items-start gap-5 w-full sm:py-5   ">
          <div  className='flex items-center bg-zinc-700 w-full  px-2 py-4 gap-2'>
            
         
              <Avatar>
                      <AvatarImage src={currentUser?.image} />
                      <AvatarFallback>
                        <div className=" shadow h-10 bg-blue-300   text-xl font-semibold w-10 rounded-full flex justify-center items-center">
                          {currentUser?.name[0]}
                        </div> 
                      </AvatarFallback>
                    </Avatar> 
                <div className=' flex flex-col gap-1'>
                <span className=' truncate  w-[95%] text-xs  font-medium'>{currentUser?.name}</span>
                <span className=' truncate  w-[95%] text-xs font-normal'>{currentUser?.email}</span>
                </div>
      
          </div>

          <Link href="/student/dashboard" 
            
              className={`text-sm flex items-end gap-2 p-2 w-full relative  ${
                isActive('/student/dashboard') ? ' overflow-hidden  ' : ''
              }`}
            >
          <CiHome  size={22}/>
              <span>Dashboard</span>
              {isActive('/student/dashboard') && (
                <div className="top-0 right-0 absolute bg-white  h-10 w-[3px]" />
              )}
          
          </Link>

          <Link href="/student/dashboard/jobs"
           
              className={`text-sm flex items-end gap-2 w-full relative p-2 ${
                isActive('/student/dashboard/jobs') ? ' overflow-hidden  ' : ''
              }`}
            >
              <PiSuitcaseSimpleLight className="h-5 w-5" />
              <span>Internships</span>
              {isActive('/student/dashboard/jobs') && (
                <div className="top-[1.8px] right-0 absolute bg-blue-100 h-8 w-[2px]" />
              )}
        
          </Link>


          <Link href="/student/dashboard/profilepage"
           
           className={`text-sm flex items-end gap-2 w-full relative p-2 ${
             isActive('/student/dashboard/profilepage') ? ' overflow-hidden  ' : ''
           }`}
         >
           <CiUser  className="h-5 w-5" />
           <span>Your Profile</span>
           {isActive('/student/dashboard/profilepage') && (
             <div className="top-[1.8px] right-0 absolute bg-blue-100 h-8 w-[2px]" />
           )}
     
       </Link>

          <Link  href={""} className='text-sm flex items-end gap-2 w-full relative p-2' onClick={()=>{signOut()}}>
          <CiLogout  className="h-5 w-5" />
             Logout
          </Link>

         
        
        </nav>
        <nav className="mt-auto flex flex-col items-start gap-4 px-2 sm:py-5">
          <Link href="#"
       
              className={`text-sm flex items-end gap-2 w-full relative p-2${
                isActive('#settings') ? ' overflow-hidden  ' : ''
              }`}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
              {isActive('#settings') && (
                <div className="top-[1.8px] right-0 absolute bg-blue-100 h-8 w-[2px]" />
              )}
     
          </Link>
        </nav>
 
      </aside>

      <div className=' w-full  first-letter: md:hidden block p-2'>
         
      <Sheet>
  <SheetTrigger asChild>
    <Button size="icon" variant="outline" className=" ">
      <PanelLeft className="h-4 w-4" />
      <span className="sr-only">Toggle Menu</span>
    </Button>
  </SheetTrigger>
  <SheetContent side="left" className="sm:max-w-xs px-0">
    <nav className="grid gap-6 text-lg font-normal">
    <div  className='flex items-center   w-full  px-2 py-4 gap-2'>
            
         
            <Avatar>
                    <AvatarImage src={currentUser?.image} />
                    <AvatarFallback>
                      <div className=" shadow h-10 bg-blue-300   text-xl font-semibold w-10 rounded-full flex justify-center items-center">
                        {currentUser?.name[0]}
                      </div> 
                    </AvatarFallback>
                  </Avatar> 
              <div className=' flex flex-col gap-1'>
              <span className=' truncate  text-xs  font-medium'>{currentUser?.name}</span>
              <span className=' truncate  text-xs font-normal'>{currentUser?.email}</span>
              </div>
    
        </div>
      <Separator/>
      <Link href="/student/dashboard" 
            
            className={`text-sm flex items-end gap-2 p-2 w-full relative  ${
                    isActive('/student/dashboard') ? ' overflow-hidden   bg-blue-100' : ''
            }`}
          >
        <CiHome  size={22}/>
            <span>Dashboard</span>
            {isActive('/student/dashboard') && (
              <div className="top-[1.8px] right-0 absolute  bg-blue-500 h-8 w-[2px]" />
            )}
        
        </Link>
        <Link href="/student/dashboard/jobs"
           
           className={`text-sm flex items-end gap-2 w-full relative p-2 ${
                 isActive('/student/dashboard/jobs') ? ' overflow-hidden   bg-blue-100' : ''
           }`}
         >
           <PiSuitcaseSimpleLight className="h-5 w-5" />
           <span>Internships</span>
           {isActive('/student/dashboard/jobs') && (
                  <div className="top-[1.8px] right-0 absolute  bg-blue-500 h-8 w-[2px]" />
           )}
     
       </Link>

      <Link href="/student/dashboard/profilepage"
           
           className={`text-sm flex items-end gap-2 w-full relative p-2 ${
             isActive('/student/dashboard/profilepage') ? ' overflow-hidden   bg-blue-100' : ''
           }`}
         >
           <CiUser  className="h-5 w-5" />
           <span>Your Profile</span>
           {isActive('/student/dashboard/profilepage') && (
             <div className="top-[1.8px] right-0 absolute  bg-blue-500 h-8 w-[2px]" />
           )}
     
       </Link>

          <Link  href={""} className='text-sm flex items-end gap-2 w-full relative p-2' onClick={()=>{signOut()}}>
          <CiLogout  className="h-5 w-5" />
             Logout
          </Link>
     
     
    </nav>
  </SheetContent>
</Sheet>
      </div>
    </div>

  )
}

export default StudentAsidebar
