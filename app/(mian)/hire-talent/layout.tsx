'use client'
 
import MainNavbar from '@/components/Navbar/Employer/MainNavbar'
import { CurrentUser } from '@/hooks/use-current-user';
import { UserType } from '@prisma/client';
import { redirect } from 'next/navigation';
import React from 'react'

const HireTalentLayout =  ({children}:{children:React.ReactNode}) => {
  const session =   CurrentUser();

  if(session?.role === UserType.STUDENT){
    return redirect("/student/dashboard")
  }
  return (
     <div>
      
      <MainNavbar session={session?.role as UserType === "EMPLOYER" ? session : null}/>
      <div>
      {children}

      </div>
     </div>
  )
}

export default HireTalentLayout
