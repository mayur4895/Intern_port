 import React from 'react' 
import Image from 'next/image'
import EmployerSignup from './EmployerSignup'
const HireBanner = () => {
  return (
    <>
     
     <div className='    flex  flex-col  md:grid  md:grid-cols-3 gap-5  h-auto items-center justify-center   m-5 mt-10'>
       <div className=' col-span-2   w-full  z-50 '>
          <h2 className='text-5xl font-semibold text-zinc-800'>Hire Frshers And Interns Faster</h2>
          <p className='text-xl pt-4'>Post Internships for free & hire talent with up to 2 years of experience</p>
          <Image src={"/hr_.png"}   height={800} width={800}  alt="bg" className=' object-cover  z-50'/>
       </div>
   
 
 
       <div className='z-50 md:mt-0 mt-10 '>
          <EmployerSignup/> 
       </div>
     </div>
    </>
  )
}

export default HireBanner
