'use client'
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card'
import { useGetInternship } from '@/features/post/api/getInternship'
import { Post } from '@prisma/client'
import { useParams } from 'next/navigation'
import React from 'react'
import { CiCreditCard1, CiHome } from 'react-icons/ci'
import { FaBuilding, FaCalendar, FaHome, FaPlayCircle } from 'react-icons/fa'
import { PiBuildingsThin, PiClockClockwiseThin, PiPlayCircleThin, PiSuitcaseSimpleThin, PiTreeStructureThin } from 'react-icons/pi'
import { GiSandsOfTime } from "react-icons/gi";
import DaysAgo from '@/components/hire-talent/Post/daysAgo'
import MarkupContent from '@/components/hire-talent/MarkupContent'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useModal } from '@/hooks/use-modal-store'
import { Skeleton } from '@/components/ui/skeleton'
import ApplyForm from '@/components/student/ApplyForm'
import { CurrentUser } from '@/hooks/use-current-user'

 

const InternshipDetailspage = () => {

const IconMap:any = {
  'in office': <PiBuildingsThin size={22} /> ,
  'Hybrid': <PiTreeStructureThin size={22}/>,
  'remote': <CiHome size={22}/>,
}

       const params = useParams();
       const currentUser = CurrentUser();
       console.log(currentUser);
       
       const { internshipId } = params as { internshipId: string }
       const {onOpen}= useModal();
       const {data} = useGetInternship(internshipId); 
       
  return (
    <div>
            <div className=' text-center flex flex-col items-center justify-center'>
       
                <Card className=' shadow-sm p-4 w-3/4 rounded-none flex flex-col gap-5'>
                   <div className='p-6 text-start flex flex-col gap-2'>
                

                   <CardTitle className=' text-xl font-normal'>{data?.internshipProfile}</CardTitle>
                   <CardDescription className=' font-medium'>{data?.companyName}</CardDescription>
                   </div>
                   <CardContent className=' text-start'>
                    <span className=' flex items-end gap-2'>{data?.internshipType && IconMap[data.internshipType]}{data?.internshipType}</span>
                  <div className=' mt-5 flex gap-16'>
                       <div className=' flex flex-col gap-2'>
                        <span className=' flex items-center gap-2 text-gray-500 text-sm'> <PiPlayCircleThin  size={22}/>  Start Date</span>
                        <span className=' text-sm'>{data?.internshipStartDate}</span>
                       </div>
                       <div className=' flex flex-col gap-2'>
                        <span className=' flex items-center gap-2 text-gray-500 text-sm'> <CiCreditCard1 size={22}/>ctc (Annual)</span>
                        <span className=' text-sm'> ₹ 6,25,000 - 8,10,000</span>
                       </div>
                       <div className=' flex flex-col gap-2'>
                        <span className=' flex items-center gap-2 text-gray-500 text-sm'> <PiSuitcaseSimpleThin size={22}/>Experience</span>
                        <span className=' text-sm'>0 years</span>
                       </div>
                       <div className=' flex flex-col gap-2'>
                        <span className=' flex items-center gap-2 text-gray-500 text-sm'> <GiSandsOfTime size={22}/> Apply By</span>
                        <span className=' text-sm'>25 Aug</span>
                       </div>
                  </div>
                 <div className=' mt-5 flex flex-col gap-6 '> 
                   <span className='  text-sm text-gray-500 flex items-center gap-2'>  <PiClockClockwiseThin size={22}/>
                 { data?.createdAt &&  <DaysAgo dateString={data?.createdAt?.toDateString()} /> }</span>
                 <span className=' text-gray-600'>{data?.noOfOpenings} openings</span>
                 </div>

                 <div className=' flex  flex-col gap-5 mt-5'>
                  <MarkupContent content={data?.internResponsibilities || ''}/>
                  <div className=' mt-5'>
                    <span className='text-sm mb-4'>Skill(s) required </span>
                  <div className=' flex flex-auto mt-4 gap-5'>
                    {data?.requiredSkills.map((skill:any,index:any)=>{
                      return(
                        <Badge key={index} className=' p-2 px-4 bg-gray-200 hover:bg-gray-200 text-zinc-800'>{skill}</Badge>
                      )
                    })}
                  </div>
                  </div>

                  <div>
                    <MarkupContent content={data?.whoCanApply || ''}/>

                   <div className=' flex flex-col gap-2 mt-5'>
                   <span className=' font-medium text-gray-600'>Number of openings</span>
                   <span>{data?.noOfOpenings}</span>
                   </div>
                  </div>
                 </div>
                   </CardContent>
                   <CardFooter>
                     {(data?.id && currentUser?.id )&&  <ApplyForm postId={data.id} studentId={currentUser.id} />}
                   </CardFooter>
                </Card>
            </div>
    </div>
  )
}

export default InternshipDetailspage
