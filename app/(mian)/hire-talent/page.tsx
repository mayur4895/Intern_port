 'use client'
import HireBanner from '@/components/hire-talent/Banner'
import { CurrentUser } from '@/hooks/use-current-user'
import { UserType } from '@prisma/client';
import { redirect } from 'next/navigation';
import React from 'react'

const HireTalentpage = () => {
const currentUser = CurrentUser();
  if(currentUser && currentUser.role === UserType.EMPLOYER){
    return redirect("/hire-talent/profile")
  }
  return (
    <div>  
      <HireBanner/>   
    </div>
  )
}

export default HireTalentpage
