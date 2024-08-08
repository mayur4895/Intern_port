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
import { Activity, ArrowRight, Building2, CreditCard, DollarSign, LocateIcon, Users } from 'lucide-react'
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
      
          <div className='w-full    px-10'>
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
             
        </div>
          </div>
    
        
        
    
     <div className=' flex flex-col px-5 mt-8'>
      <h2>Recomanded for you</h2>
    <div className='flex flex-wrap    w-full    mt-3 gap-3'>
          {Internships?.map((internship, index) => (
            <Card key={internship.id}  className=' w-[320px] cursor-pointer'>
                 <CardHeader className='flex justify-between items-start flex-row w-full py-4'>
           <div>
           <span className=' text-sm'>{internship.internshipProfile}   </span>
           <CardDescription className=' text-xs text-nowrap   w-[90%]'>{internship.companyName}</CardDescription>
           </div>
           {internship.companyLogo && <Image  src={internship.companyLogo} alt='logo' height={30} width={30} className=' object-center object-contain' />}
                </CardHeader>
           
                <Separator/>
               <CardContent  className=' py-2'>  
              
         
                <span className='flex items-center gap-2 text-xs'>  { MapIcon[internship.internshipType]} {internship.internshipType}</span>
                <span className='flex items-center gap-2 text-xs'> <CreditCard size={12}/> ₹ 6,00,000 - 8,00,000/year</span>

                <span className='text-xs text-gray-500 '>{internship.createdAt.toDateString()}</span>
                </CardContent>
              <CardFooter className=' mt-2 flex  items-end justify-end'>
                <Link href={`/student/internship/${internship?.id}/detail`}    className='flex text-xs items-center  gap-1'>View Details <ArrowRight size={15}/></Link>
              </CardFooter>
             
            </Card>
          ))}
        </div>
     </div>
     </>
   )
 }
 
 export default DashboardPage