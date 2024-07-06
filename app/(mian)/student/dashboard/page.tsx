'use client'
import { auth, signOut } from '@/auth'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useInternships } from '@/hooks/use-all-posts'
import { useCompanyPosts } from '@/hooks/use-company-posts'
import { CurrentUser } from '@/hooks/use-current-user'
import { UserType } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { stringify } from 'node:querystring'
import { json } from 'node:stream/consumers'
import React from 'react'
 
 const DashboardPage =  () => {
const currentUser = CurrentUser();
 
const { data: Internships, isLoading, error, } = useInternships();
console.log(Internships);


   return (
    <>  
    <div className=' text-start items-center '>
  
        <h3 className='text-2xl'>{currentUser?.name}</h3>
        <div className='flex flex-wrap  gap-3'>
          {Internships?.map((internship, index) => (
            <Card key={internship.id}  className=' w-auto'>
              <CardHeader>
                <span className=''>{internship.internshipProfile}   </span>
                <CardDescription>{internship.companyName}</CardDescription>
                <span>{internship.internshipType}</span>
              </CardHeader> 

              <CardFooter>
                <Button variant={'outline'}>View Details</Button>
              </CardFooter>
             
            </Card>
          ))}
        </div>
    </div>
     </>
   )
 }
 
 export default DashboardPage