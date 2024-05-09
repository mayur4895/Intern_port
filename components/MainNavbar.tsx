'use client'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import Navbar from './ui/Navbar'

const MainNavbar = () => {
  return (
    <div className="flex items-center w-full border-b">
        <h3 className='font-bold tracking-wider'>JobHunt</h3>
        <div className='ml-auto'>
            <Navbar/>
        </div>
        <div className="flex  ml-5 items-center gap-x-3"> 
        <Link href={"/auth/login"}> <Button>Login</Button> </Link>
      
        <Link href={"/auth/signup"}> <Button variant={"outline"} >Candident Sign-up</Button> </Link>
        
        <Link href={"/signup"}> <Button variant={"outline"} >Employer Sign-up</Button> </Link>
     </div>
    </div>
  )
}

export default MainNavbar
