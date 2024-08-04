import FilterBox from '@/components/student/FilterBox'
import JobHeader from '@/components/student/JobHeader'
import JobSection from '@/components/student/JobsSection'
import React from 'react'

const JobsPage = () => {
  return (
    <div className=' md:grid grid-cols-3   h-[800px] p-5  gap-5  w-full    '>
  
       <FilterBox/>
    
     <div className=' col-span-2    h-full   flex flex-col  gap-5 '>
     <JobHeader/> 
        <JobSection/> 
     </div>
    </div>
  )
}

export default JobsPage
