 'use client'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import Navbar from './ui/Navbar'
import { auth, signIn, signOut } from '@/auth'
import { RiUser3Line } from "react-icons/ri";
import { LogOut } from 'lucide-react'
 


interface MainNavbarProps{
  session?:any;
}

const MainNavbar =  ({session}:MainNavbarProps) => {
 
 
  

 

 
 
  return (
    <div className="flex w-full items-center border-b shadow-sm  pl-4 md:px-4 ">
        <div className='font-bold tracking-wider'>JobHunt</div>
        <div className='  w-full '>
            <Navbar/>
        </div> 
     { !session &&    <>
      <div className="lg:flex hidden flex-row  ml-5  gap-x-4  "> 
        <Link href={"/auth/login"}> <Button>Login</Button> </Link>
      
        <Link href={"/auth/signup"}> <Button variant={"outline"} >Candident Sign-up</Button> </Link>
        
        <Link href={"/signup"}> <Button variant={"outline"} >Employer Sign-up</Button> </Link>
     </div>
     </>}

 { session &&
  <> 
  <div className='flex gap-4'>
           <Link href={"/auth/login"}> <Button >LogOut</Button> </Link>
            <Link href={""}> <Button variant={"outline"} className=' rounded-full p-2'><RiUser3Line size={22} /> </Button> </Link>
           </div>
  </>
 }
    
    </div>
  )
}

export default MainNavbar
