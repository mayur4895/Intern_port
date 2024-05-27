'use client'
import { auth } from '@/auth';
import MainNavbar from '@/components/Navbar/Student/MainNavbar'
import { CurrentUser } from '@/hooks/use-current-user';
import { UserType } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react'

const Studentlayout =  ({children}:{children:React.ReactNode}) => {
  const session =  CurrentUser();
  if(session?.role === UserType.EMPLOYER){
    return redirect("/hire-talent")
  }

  if(!session && session.role !== UserType.STUDENT ){
    return  redirect("/auth/login");
  }
 
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
