'use client'
import { CurrentUser } from '@/hooks/use-current-user'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const ProfileLayoutPage = ({children}:{children:React.ReactNode}) => {


    const currentUser = CurrentUser();
    const router = useRouter();

    useEffect(() => {
     if(currentUser?.studentProfileDetails !== null){
        router.push("/student/dashboard");
     }
    },[currentUser])
  return (
    <div>
      {children}
    </div>
  )
}

export default ProfileLayoutPage
