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

  interface InternshipCardProps{
    internship: Post;
  }
const InternshipCard = ({internship}:InternshipCardProps) => {

  const router = useRouter();
  const savePostMutation =  useSavePost();

  async function handleSavePost() {
    try {
      savePostMutation.mutate(internship.id, {
        onSuccess: (res) => {
          if (res.success) {
            toast({
              variant: "success", 
              title: res.success,
            });
          } else if (res.error) {
            toast({
              variant: "destructive", 
              title: res.error,
            });
          }
        },
        onError: (error) => {
          console.error('Error saving Post:', error);
          toast({
            variant: "destructive", 
            title: "An error occurred while saving the Post.",
          });
        }
      });
   
    
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: "destructive", 
        title: "An unexpected error occurred.",
      });
    }
  }
  return (
    <Link    className=' cursor-pointer'   href={`/student/internship/${internship.id}/detail`}>
       <Card className=' rounded-none'>
        <CardHeader className='  '>
            <div className='flex  gap-2 items-center justify-between'>
            <div className='flex flex-col  gap-1  mb-2 '>
 
            <CardTitle className='text-sm '> {internship.internshipProfile}</CardTitle>
            <span className='text-xs'>{internship.companyName}</span>
            </div>
            {internship.companyLogo  && <Image src={internship?.companyLogo} alt="comapny logo" height={35} width={35}/>}
            {/* <span className='border p-2' onClick={handleSavePost}><CiBookmark size={20} /></span> */}
            </div>
            <div className='  items-center flex gap-5   '> 
            <span className=' text-gray-600 text-xs flex items-center gap-1'><IoLocationOutline size={19}/>   {
              internship?.cities?.slice(0,2).map((city) => (
                <Badge key={city}  className="mr-1 bg-slate-200 hover:bg-zinc-200 text-zinc-600">
                  {city}
                </Badge>
              ))
            }</span>
            <span className=' text-gray-600 text-xs flex items-center gap-2'><PiSuitcaseSimpleLight size={22}/>{internship?.noOfOpenings} openings</span>
            <span className=' text-gray-600 text-xs flex items-center gap-2'><CiCalendar  size={22}/>{internship?.internshipDuration} {internship?.monthOrWeeks} </span>
                 </div>
          
         
        </CardHeader>
        <CardContent className='  flex items-center gap-4 pt-0'>
        <span className='  text-xs text-gray-500 flex items-center gap-1'>  <PiClockClockwiseThin size={20}/>
        { internship?.createdAt &&  <DaysAgo dateString={internship?.createdAt?.toDateString()} /> }</span>
        <span className=' text-gray-500 text-xs flex items-center gap-[0.20rem]'> <TiMediaRecordOutline          size={20}/>{internship?.partOrFullTime}   </span>
        </CardContent>
       </Card>
    </Link>
  )
}

export default InternshipCard
