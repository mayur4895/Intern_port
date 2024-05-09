'use client'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import Navbar from './ui/Navbar'

const MainNavbar = () => {
  return (
    <div className="flex w-full items-center  pl-4 ">
        <div className='font-bold tracking-wider'>JobHunt</div>
        <div className='  w-full '>
            <Navbar/>
        </div> 
        <div className="lg:flex hidden flex-row  ml-5  gap-x-4  "> 
        <Link href={"/auth/login"}> <Button>Login</Button> </Link>
      
        <Link href={"/auth/signup"}> <Button variant={"outline"} >Candident Sign-up</Button> </Link>
        
        <Link href={"/signup"}> <Button variant={"outline"} >Employer Sign-up</Button> </Link>
     </div>
    </div>
  )
}

export default MainNavbar
