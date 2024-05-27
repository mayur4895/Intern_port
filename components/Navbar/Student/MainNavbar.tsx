 'use client'
import React, { useEffect, useState } from 'react'
 
import Link from 'next/link'
import Navbar from './Navbar' 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
 
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
import { signOut } from 'next-auth/react'
import { useLoginType } from '@/hooks/use-logintype'
import { useRouter } from 'next/navigation'
import { logout } from '@/actions/logout'
import { CurrentUser } from '@/hooks/use-current-user'
import { Button } from '@/components/ui/button'
import { Menubar, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'

interface MainNavbarProps{
  session?:any;
}

const MainNavbar =  ({session}:MainNavbarProps) => {
 
 
 

  const Navbars = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "InternShips",
      href: "/internships",
    },
    {
      label: "Jobs",
      href: "/jobs",
    },
    {
      label: "Services",
      href: "/services",
    },
    {
      label: "Contact Us",
      href: "/contact",
    },
  ]


  const StudenNavbarItems=[
    {
      label: "Home",
      href: "/student/dashboard",
    },
   
    {
      label: "My Applicatons",
      href: "/contact",
    },
  ]

  const { onSetType} = useLoginType()
     



  
  return (
    <div className='flex  w-full z-50'>
       <div className="flex w-full items-center border-b shadow-sm  bg-white  pl-4 md:px-4 ">
        <div className='font-bold tracking-wider'><Link href={"/"}>HireIntern</Link></div>
        <div className='  w-full '>
            <Navbar  session={session}/>
        </div> 
     { !session &&    <>
      <div className="lg:flex hidden flex-row  ml-5  gap-x-4  "> 
        <Link href={"/auth/login"}  onClick={()=>{onSetType("student")}}> <Button>Login</Button> </Link>
      
        <Link href={"/auth/signup"}> <Button variant={"outline"} >Candident Sign-up</Button> </Link>
        
        <Link href={"/hire-talent"}> <Button variant={"outline"} >Employer Sign-up</Button> </Link>
     </div>
     </>}

 { session &&
  <> 
  <div className='flex gap-4 pr-2'>
    
 
 { session &&  (    
  <Menubar>   <MenubarMenu>
   <MenubarTrigger asChild>
   <Sheet>
 <SheetTrigger asChild className=' '>
   <Button variant={ "ghost"} > 
   <Avatar>
  <AvatarImage src={session?.image} />
  <AvatarFallback>   
  <div className=' shadow h-10 bg-stone-300  text-xl font-semibold w-10 rounded-full flex justify-center items-center'>
  {session?.name[0]}
  </div> 
     </AvatarFallback>
</Avatar>
 
    </Button>
 </SheetTrigger>
 <SheetContent>
   <SheetHeader>
     <SheetTitle className=' flex flex-col mt-4 text-base pl-2  items-start justify-start'> 
            <h2 className=' uppercase'>{session?.name}</h2>
            <span  className='text-sm font-normal  text-gray-700'>{session?.email}</span>
      </SheetTitle>
<Separator/>
   </SheetHeader>
 <div className='flex flex-col gap-y-3'>
 <div className='lg:hidden'>
 {Navbars.map(({ label, href }) => (
   <MenubarMenu key={label}>
     <MenubarTrigger> <Link href={href} className='font-normal   whitespace-nowrap'> {label}</Link></MenubarTrigger>
   </MenubarMenu>
 
 ))}
 
 </div>
 <div >
 {StudenNavbarItems.map(({ label, href }) => (
   <MenubarMenu key={label}>
     <MenubarTrigger> <Link href={href} className=' font-normal  whitespace-nowrap'> {label}</Link></MenubarTrigger>
   </MenubarMenu>
 
 ))}
 
 </div>
{
!session &&  (
<div className="flex flex-col  ml-4   items-start  justify-start gap-4"> 
   <Link href={"/auth/student/login"} className='text-sm text-black font-semibold hover:text-blue-500' onClick={()=>{onSetType("employer")}}>  Login </Link>
 
   <Link href={"/auth/signup"} className='text-sm text-black font-semibold hover:text-blue-500'>   Candident Sign-up </Link>
   
   <Link href={"/signup"} className='text-sm text-black font-semibold hover:text-blue-500'>   Employer Sign-up </Link>
</div> )}
<Separator/>
{ 
 session &&  
 <div className="flex flex-col    items-start  justify-start gap-4">
 <Button type='submit' className='font-normal ' variant={"link"} onClick={()=> signOut({callbackUrl:"/"})}>Logout</Button>
</div>
}
 </div>
   
 </SheetContent>
</Sheet>
   </MenubarTrigger>
 </MenubarMenu>
 </Menubar>

 )
   }
           </div>
  </>
 }
    
    </div>
    </div>
  )
}

export default MainNavbar
