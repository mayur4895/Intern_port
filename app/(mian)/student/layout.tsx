'use client'
import { auth } from '@/auth';
import MainNavbar from '@/components/Navbar/Student/MainNavbar'
import { CurrentUser } from '@/hooks/use-current-user';
import { useSession } from 'next-auth/react';
import React from 'react'

const Studentlayout =  ({children}:{children:React.ReactNode}) => {
  const session =  CurrentUser();
   


  return (
     <div>
      
    <MainNavbar session={session}/>
    <div className='py-20'>
      {children}
    </div>
     </div>
  )
}

export default Studentlayout
