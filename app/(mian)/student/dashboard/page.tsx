'use client'
import { auth, signOut } from '@/auth'
import { Button } from '@/components/ui/button'
import { CurrentUser } from '@/hooks/use-current-user'
import { useSession } from 'next-auth/react'
import { stringify } from 'node:querystring'
import { json } from 'node:stream/consumers'
import React from 'react'
 
 const DashboardPage =() => {
  const session =   CurrentUser();
 
  
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