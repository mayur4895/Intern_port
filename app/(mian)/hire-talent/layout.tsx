'use client'
 
import MainNavbar from '@/components/Navbar/Employer/MainNavbar'
import QontoStepIcon from '@/components/ui/stepper';
 
import { CurrentUser } from '@/hooks/use-current-user';
import { UserType } from '@prisma/client';
import { redirect } from 'next/navigation';
import React from 'react'

const HireTalentLayout =  ({children}:{children:React.ReactNode}) => {
  const session =   CurrentUser();

  if(session?.role === UserType.STUDENT){
    return redirect("/student/dashboard")
  }

  const steps = ['Step 1', 'Step 2', 'Step 3'];
const currentStep =  2;
  return (
     <div>
      
      <MainNavbar session={session?.role as UserType === "EMPLOYER" ? session : null}/>
      <div>
      <QontoStepIcon />
     <div>
     {children} 
     </div>
      </div>
     </div>
  )
}

export default HireTalentLayout
