import React, { useState } from 'react' 
 
import { signOut } from 'next-auth/react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { LuAlignRight } from "react-icons/lu";

import UserButton from './UserButton';
import { CurrentUser } from '@/hooks/use-current-user';
import Link from 'next/link';
const NavigationDashboard = () => {
  const routesDahbaord = [
    {
      label: 'Dashboard',
      href: '/hire-talent/dashboard',
    },
    {
      label: 'Applications',
      href: '/hire-talent/dashbaord/applications',
    },{
      label:'create post',
      href:'/hire-talent/dashboard/new-post'
    },
    {
      label:'view posts',
      href:'/hire-talent/dashboard/posts'
    }
  ]

  const [IsOpen,setIsOpen] = useState(false);
  const currentUser = CurrentUser();
  return (
     <>
     <div className='lg:flex items-end gap-5 hidden'>
        {
          routesDahbaord.map(({ label, href }) => (
            <div key={label}>
              <Link href={href} prefetch={true}>{label}</Link>
            </div>
          ))
        }
   
    
    </div>

    <div className=' lg:hidden block'>
    <Sheet open={IsOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild onClick={()=>{setIsOpen(true)}}> 
        <LuAlignRight size={22} className=' cursor-pointer'/>
      </SheetTrigger>
      <SheetContent className='lg:hidden block'>
        <SheetHeader className='text-start flex flex-col'>
        <SheetTitle>{currentUser?.name}</SheetTitle>
          <SheetDescription>
           
          </SheetDescription>
        </SheetHeader>
        <div className='flex flex-col items-start gap-5 lg:hidden mt-5'>
        {
          routesDahbaord.map(({ label, href }) => (
            <div key={label}>
              <Link href={href} prefetch={true} onClick={()=>{setIsOpen(false)}}>{label}</Link>
            </div>
          ))
        }
           
    </div>
        <SheetFooter className=' mt-5'> 
        <UserButton/>  
        </SheetFooter>
      </SheetContent>
    </Sheet>
    </div>
     </>
  )
}

export default NavigationDashboard
