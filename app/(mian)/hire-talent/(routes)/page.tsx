  
'use client'
import HireBanner from '@/components/hire-talent/Banner'
 
 
 
import { UserType } from '@prisma/client';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
 

const HireTalentpage = () => {
 
  // if(currentUser && currentUser.role === UserType.EMPLOYER){
  //   return redirect("/hire-talent/dashboard")
  // }
 

 
 
  return (
    <div>  
      <HireBanner/>   
    </div>
  )
}

export default HireTalentpage
