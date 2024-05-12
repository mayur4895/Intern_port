import { auth, signOut } from '@/auth'
import { Button } from '@/components/ui/button'
import React from 'react'
 
 const DashboardPage = async() => {
  const session:any =  await auth()
   return (
    <> 
      
      <form action={async()=>{
  'use server'
  await signOut({redirectTo:"/auth/login"});
      }}> 
     <button  type='submit'>
      Logout
     </button>
     </form>
     </>
   )
 }
 
 export default DashboardPage