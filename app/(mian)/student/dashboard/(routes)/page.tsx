'use client'
import { auth, signOut } from '@/auth'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useGetAllPosts } from '@/features/post/api/getallPosts'
import { useInternships } from '@/hooks/use-all-posts'
 
import { CurrentUser } from '@/hooks/use-current-user'
import { useModal } from '@/hooks/use-modal-store'
import { UserType } from '@prisma/client'
import { ArrowRight, Building2, CreditCard, LocateIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { stringify } from 'node:querystring'
import { json } from 'node:stream/consumers'
import React from 'react'
 
 const DashboardPage =  () => {
const currentUser = CurrentUser();
 
const { data: Internships, isLoading, error, } = useGetAllPosts(); 
const MapIcon:any = {
 'in office':<Building2 className='text-gray-500' size={15}/>,
 'remote':<LocateIcon className='text-gray-500' size={15}/>,

}
 

 

   return (
    <>  
    <div className=' text-start items-center  px-10'>
  
        <h3 className='text-2xl'>Recomonded for you</h3>
       
        <div className='flex flex-wrap  justify-center w-full  items-center mt-8 gap-3'>
          {Internships?.map((internship, index) => (
            <Card key={internship.id}  className=' w-[320px] cursor-pointer'>
                 <CardHeader className='flex justify-between items-start flex-row w-full'>
           <div>
           <span className=''>{internship.internshipProfile}   </span>
           <CardDescription className=' text-nowrap h-7 w-[90%]'>{internship.companyName}</CardDescription>
           </div>
           {internship.companyLogo && <Image  src={internship.companyLogo} alt='logo' height={30} width={30} className=' object-center object-contain' />}
                </CardHeader>
           
                <Separator/>
               <CardContent  className=' py-2'>  
              
         
                <span className='flex items-center gap-2 text-sm'>  { MapIcon[internship.internshipType]} {internship.internshipType}</span>
                <span className='flex items-center gap-2 text-sm'> <CreditCard size={12}/> ₹ 6,00,000 - 8,00,000/year</span>

                <span className='text-xs text-gray-500 '>{internship.createdAt.toDateString()}</span>
                </CardContent>
              <CardFooter className=' mt-5 flex  items-end justify-end'>
                <Link href={`/student/internship/${internship?.id}/detail`}    className='flex text-sm items-center text-blue-500 gap-1'>View Details <ArrowRight size={15}/></Link>
              </CardFooter>
             
            </Card>
          ))}
        </div>
    </div>
     </>
   )
 }
 
 export default DashboardPage