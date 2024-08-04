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
 

  interface InternshipCardProps{
    internship: Post;
  }
const InternshipCard = ({internship}:InternshipCardProps) => {
  return (
    <div>
       <Card className=' rounded-none'>
        <CardHeader className='  '>
            <div className='flex  gap-2 items-center'>
            {internship.companyLogo ?  <Image src={internship?.companyLogo} alt="comapny logo" height={40} width={40}/>:<div> No</div>}
            <CardTitle className='text-sm'> {internship.internshipProfile}</CardTitle>
            </div>
 
                 <div className="truncate-fade">
    <MarkupContent className="text-xs" content={internship?.internResponsibilities} />
  </div>
               
            <div className='  items-center flex gap-5   '> 
                   <span className='  text-xs text-gray-500 flex items-center gap-2'>  <PiClockClockwiseThin size={22}/>
                 { internship?.createdAt &&  <DaysAgo dateString={internship?.createdAt?.toDateString()} /> }</span>
                 <span className=' text-gray-600 text-xs flex items-center gap-2'><PiSuitcaseSimpleLight size={22}/>{internship?.noOfOpenings} openings</span>
                 </div>
        
        </CardHeader>
        <CardContent className='  pt-0'>
        <div className='  '> 
                  <div className=' flex flex-auto  text-xs flex-wrap   gap-3'>
                    {internship?.requiredSkills.map((skill:any,index:any)=>{
                      return(
                        <Badge key={index} className=' rounded-sm p-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-500'>{skill}</Badge>
                      )
                    })}
                  </div>
                  </div>
        </CardContent>
       </Card>
    </div>
  )
}

export default InternshipCard
