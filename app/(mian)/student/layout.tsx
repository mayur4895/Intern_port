'use client'
import { auth } from '@/auth';
import MainNavbar from '@/components/Navbar/Student/MainNavbar'
import { CurrentUser } from '@/hooks/use-current-user';
import { UserType } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useCallback } from 'react'

const Studentlayout =  ({children}:{children:React.ReactNode}) => {
  const session =  CurrentUser();
 
 
 

  useCallback(()=>{
    if(!session && session?.role !== UserType.STUDENT ){
      redirect("/auth/login");
    }

    if(session?.role === UserType.EMPLOYER){
      return redirect("/dahboard")
    }

      
  },[session])
 
  return (
     <div>
      
    <MainNavbar session={session?.role as UserType === "STUDENT" ? session : null}/>
    <div className='py-20'>
      {children}
    </div>
     </div>
  )
}

export default Studentlayout
