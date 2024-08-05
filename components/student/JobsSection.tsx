'use client'
import { useGetAllPosts } from '@/features/post/api/getallPosts';
import React from 'react'
import InternshipCard from './InternshipCard';

const JobSection = () => {

    const { data: Internships, isLoading, error, } = useGetAllPosts(); 
  return (
    <div className='border h-full bg-white shadow-sm p-4'>
         <div className=' flex flex-col gap-3'>
            {
            Internships?.map((internship)=>{
                return( 

  
                    <InternshipCard
                    key={internship.id}
                    internship={internship}
                    />
                )
            })
            }
         </div>
    </div>
  )
}

export default JobSection
