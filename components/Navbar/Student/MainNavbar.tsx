 'use client'
import React, { useEffect, useState } from 'react'
 
import Link from 'next/link'
import Navbar from './Navbar' 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
 
import { signOut } from 'next-auth/react'
import { useLoginType } from '@/hooks/use-logintype'
import { useRouter } from 'next/navigation'
import { logout } from '@/actions/logout'
import { CurrentUser } from '@/hooks/use-current-user'
import { Button } from '@/components/ui/button'

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
        <Link href={"/auth/login"}  onClick={()=>{onSetType("student")}}> <Button>Login</Button> </Link>
      
        <Link href={"/auth/signup"}> <Button variant={"outline"} >Candident Sign-up</Button> </Link>
        
        <Link href={"/hire-talent"}> <Button variant={"outline"} >Employer Sign-up</Button> </Link>
     </div>
     </>}

 { session &&
  <> 
  <div className='flex gap-4 pr-2'>
    
 <div className=' hidden md:block'>
 
     <Button type='submit' onClick={()=> signOut({callbackUrl:"/"})}>Logout</Button>
  
 </div> 
 { session &&  <Link href={""}>  <Avatar>
  <AvatarImage src={session?.image} />
  <AvatarFallback>   
  <div className=' shadow h-10 bg-stone-300  text-xl font-semibold w-10 rounded-full flex justify-center items-center'>
  {session?.name[0]}
  </div> 
     </AvatarFallback>
</Avatar>
   </Link>}
           </div>
  </>
 }
    
    </div>
    </div>
  )
}

export default MainNavbar
