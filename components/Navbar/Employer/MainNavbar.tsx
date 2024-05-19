 
import React, { useEffect, useState } from 'react'
import { Button } from '../../ui/button'
import Link from 'next/link'
import Navbar from './Navbar'
import { auth, signIn, signOut } from '@/auth'
import { RiUser3Line } from "react-icons/ri";
import { LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
 


interface MainNavbarProps{
  session?:any;
}

const MainNavbar =  ({session}:MainNavbarProps) => {
 
 
  



  
  return (
    <div className='flex  w-full z-50'>
       <div className="flex w-full items-center border-b shadow-sm  bg-white  pl-4 md:px-4 ">
        <div className='font-bold tracking-wider'><Link href={"/"}>HireIntern</Link></div>
        <div className='  w-full '>
            <Navbar  session={session}/>
        </div> 
     { !session &&    <>
      <div className="lg:flex hidden flex-row  ml-5  gap-x-4  "> 
        <Link href={"/auth/login"}> <Button>Login</Button> </Link>
       
     </div>
     </>}

 { session &&
  <> 
  <div className='flex gap-4 pr-2'>
    
 <div className=' hidden md:block'>
 <form action={async()=>{
  'use server'
  await signOut({redirectTo:"/"});
      }}> 
     <Button type='submit'>Logout</Button>
     </form>
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
