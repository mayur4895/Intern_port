'use client'
import { auth } from '@/auth';
import MainNavbar from '@/components/Navbar/Student/MainNavbar'
import { useSession } from 'next-auth/react';
import React from 'react'

const Studentlayout =  ({children}:{children:React.ReactNode}) => {
  const session =  useSession();
  return (
     <div>
      
    <MainNavbar session={session?.data?.user}/>
    <div className='py-20'>
      {children}
    </div>
     </div>
  )
}

export default Studentlayout
