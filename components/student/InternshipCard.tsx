import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import  type { Post } from '@prisma/client';
import Image from 'next/image';
import DaysAgo from '../hire-talent/Post/daysAgo';
import { PiClockClockwiseThin, PiSuitcaseSimpleLight } from 'react-icons/pi';
import { Badge } from '../ui/badge';
import MarkupContent from '../hire-talent/MarkupContent';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CiBookmark } from 'react-icons/ci';
 

  interface InternshipCardProps{
    internship: Post;
  }
const InternshipCard = ({internship}:InternshipCardProps) => {

  const router = useRouter();
  return (
    <Link    className=' cursor-pointer'   href={`/student/internship/${internship.id}/detail`}>
       <Card className=' rounded-none'>
        <CardHeader className='  '>
            <div className='flex  gap-2 items-center justify-between'>
            <div className='flex  gap-2 items-center'>
            {internship.companyLogo ?  <Image src={internship?.companyLogo} alt="comapny logo" height={45} width={45}/>:<div> No</div>}
            <CardTitle className='text-sm'> {internship.internshipProfile}</CardTitle>
            </div>
            <span className='border p-2'><CiBookmark size={20} /></span>
            </div>
            <div className='  items-center flex gap-5   '> 
                   <span className='  text-xs text-gray-500 flex items-center gap-2'>  <PiClockClockwiseThin size={22}/>
                 { internship?.createdAt &&  <DaysAgo dateString={internship?.createdAt?.toDateString()} /> }</span>
                 <span className=' text-gray-600 text-xs flex items-center gap-2'><PiSuitcaseSimpleLight size={22}/>{internship?.noOfOpenings} openings</span>
                 </div>
        
                 <div className="truncate-fade">
    <MarkupContent className="text-xs scale-95 -translate-x-3" content={internship?.internResponsibilities} />
  </div>
               
         
        </CardHeader>
        <CardContent className='  pt-0'>
        <div className='  '> 
                  <div className=' flex flex-auto  text-xs flex-wrap   gap-3'>
                    {internship?.requiredSkills.map((skill:any,index:any)=>{
                      return(
                        <Badge key={index} className=' rounded-sm p-2 px-4 text-xs font-normal  border border-gray-300  hover:bg-gray-200 bg-white text-gray-700'>{skill}</Badge>
                      )
                    })}
                  </div>
                  </div>
        </CardContent>
       </Card>
    </Link>
  )
}

export default InternshipCard
