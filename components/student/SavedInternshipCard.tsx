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
import { CiBookmark, CiCalendar, CiViewTimeline } from 'react-icons/ci';
import { toast } from '../ui/use-toast';
import { useSavePost } from '@/features/student/api/save-post';
import { IoLocationOutline } from 'react-icons/io5';
 
import { TiMediaRecordOutline } from "react-icons/ti"
import { Button } from '../ui/button';


type SavedPost = {
    id: string;
    userId: string;
    postId: string;
    post: Post; // This includes the related Post entity
  };
  interface SavedInternshipCardProps{
    internship:  SavedPost;
  }
const SavedInternshipCard = ({internship}:SavedInternshipCardProps) => {

  const router = useRouter();
 

  return (
     
       <Card className=' rounded-none w-full'>
        <CardHeader className='  '>
            <div className='flex  gap-2 items-center justify-between'>
            <div className='flex flex-col  gap-1  mb-2 '>
 
            <CardTitle className='text-sm '> {internship.post?.internshipProfile}</CardTitle>
            <span className='text-xs'>{internship.post?.companyName}</span>
            </div>
            {internship.post?.companyLogo  && <Image src={internship?.post?.companyLogo} alt="comapny logo" height={35} width={35}/>}
           
            </div>
            <div className='  items-center flex gap-5   '> 
            <span className=' text-gray-600 text-xs flex items-center gap-1'><IoLocationOutline size={19}/>   {
              internship?.post?.cities?.slice(0,2).map((city) => (
                <Badge key={city}  className="mr-1 bg-slate-200 hover:bg-zinc-200 text-zinc-600">
                  {city}
                </Badge>
              ))
            }</span>
            <span className=' text-gray-600 text-xs flex items-center gap-2'><PiSuitcaseSimpleLight size={22}/>{internship?.post?.noOfOpenings} openings</span>
            <span className=' text-gray-600 text-xs flex items-center gap-2'><CiCalendar  size={22}/>{internship?.post?.internshipDuration} {internship?.post?.monthOrWeeks} </span>
                 </div>
          
         
        </CardHeader>
        <CardContent className='  flex items-center gap-4 pt-0'>
        <span className='  text-xs text-gray-500 flex items-center gap-1'>  <PiClockClockwiseThin size={20}/>
        { internship?.post?.createdAt && <DaysAgo dateString={new Date(internship?.post.createdAt).toDateString()} />
 }</span>
        <span className=' text-gray-500 text-xs flex items-center gap-[0.20rem]'> <TiMediaRecordOutline          size={20}/>{internship?.post.partOrFullTime}   </span>
        </CardContent>

        <CardFooter>
            <div className=' gap-2 flex items-center'>
                <Button><Link  href={`/student/internship/${internship.post.id}/detail`}>Apply Now</Link></Button>
                <Button>Delete</Button>
            </div>
        </CardFooter>
       </Card>
 
  )
}
 
 
    
    

export default SavedInternshipCard
