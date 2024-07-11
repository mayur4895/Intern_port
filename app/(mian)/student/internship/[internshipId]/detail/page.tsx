'use client'
import { useGetInternship } from '@/features/post/api/getInternship'
import { Post } from '@prisma/client'
import { useParams } from 'next/navigation'
import React from 'react'

 

const InternshipDetailspage = () => {
       const params = useParams();
       const { internshipId } = params as { internshipId: string }
       
       const {data} = useGetInternship(internshipId);
       console.log(data);
       
  return (
    <div>
            <div>
           {data?.internshipProfile}
            </div>
    </div>
  )
}

export default InternshipDetailspage
