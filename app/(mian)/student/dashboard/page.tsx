'use client'
import { auth, signOut } from '@/auth'
import { Button } from '@/components/ui/button'
import { CurrentUser } from '@/hooks/use-current-user'
import { UserType } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { stringify } from 'node:querystring'
import { json } from 'node:stream/consumers'
import React from 'react'
 
 const DashboardPage = async() => {
 
  const session = await  auth();
 

  if(session?.user.role as UserType !== "STUDENT"){
    return redirect("/");
  }
  
   return (
    <>  
    <div>
      <div>{JSON.stringify(session)}</div>
      Student DashBoard
    </div>
     </>
   )
 }
 
 export default DashboardPage