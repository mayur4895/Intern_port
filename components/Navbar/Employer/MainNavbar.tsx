 'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '../../ui/button'
import Link from 'next/link'
import Navbar from './Navbar' 

import { RiUser3Line } from "react-icons/ri";
import { LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useLoginType } from '@/hooks/use-logintype'
import { signOut } from 'next-auth/react'
 


interface MainNavbarProps{
  session?:any;
}

const MainNavbar =  ({session}:MainNavbarProps) => {
 
 
  


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
        <Link href={"/auth/emolyer/login"} onClick={()=>{onSetType("employer")}} > <Button>Login</Button> </Link>
       
     </div>
     </>}

 { session &&
  <> 
  <div className='flex gap-4 pr-2'>
    
 <div className=' hidden md:block'>
  
 <Button  onClick={()=>{signOut({callbackUrl:"/"})}}>Logout</Button>
 </div>
  <Link href={""}>  <Avatar>
  <AvatarImage src={session.user.image} />
  <AvatarFallback>   
  <div className=' shadow h-10 bg-stone-300  text-xl font-semibold w-10 rounded-full flex justify-center items-center'>
  {session?.user.name[0]}
  </div>
    {/* <RiUser3Line size={22} /> */}
     </AvatarFallback>
</Avatar>
   </Link>
           </div>
  </>
 }
    
    </div>
    </div>
  )
}

export default MainNavbar
