 
import React from 'react'
import { auth, signOut } from '@/auth'
import { Button } from '@/components/ui/button';
import { redirect, useRouter } from 'next/navigation';
import AuthButtonClient from '@/components/AuthButtonClient';
const DashBoard =async() => {

 
  const session = await auth();
  // return (
  //   <div>
  //      <Button onClick={()=>{signOut({redirectTo:"/auth/login"})}}>logout</Button>
  //     {JSON.stringify(session)}

  const handleSignOut = async () => {
    signOut({redirectTo:"/auth/login"});
   
  };
      
  return (
    <>
     <AuthButtonClient />
    </>
  )
 
}
 
export default DashBoard
