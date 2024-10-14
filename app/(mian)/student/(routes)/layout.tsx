'use client'
import MainNavbar from '@/components/Navbar/Student/MainNavbar';
import {   CurrentUser, } from '@/hooks/use-current-user'
import { UserType } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const ProfileLayoutPage = ({children}:{children:React.ReactNode}) => {


    
       const  currentUser  =   CurrentUser();
    const router = useRouter();

    useEffect(() => {
     if(currentUser?.studentProfileDetails !== null){
        router.push("/student/dashboard");
     }
    },[currentUser])
  return (
    <div>
      
    <MainNavbar session={currentUser?.role as UserType === "STUDENT" ? currentUser : null}/>
 
<div className='w-full mt-12'>    


<div>
{children} 
</div>
</div>
    
   
   </div>
  )
}

export default ProfileLayoutPage
