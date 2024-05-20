 import React from 'react'
import RegisterForm from "./RegisterForm"
import Image from 'next/image'
const HireBanner = () => {
  return (
    <>
     
     <div className=' grid grid-cols-3 gap-5 h-fit items-center justify-center   m-5 mt-12'>
       <div className=' col-span-2 z-50 '>
          <h2 className='text-5xl font-semibold text-zinc-800'>Hire Frshers And Interns Faster</h2>
          <p className='text-xl pt-4'>Post Internships for free & hire talent with up to 2 years of experience</p>
               <Image src={"/hr-image.png"} height={600} width={820} alt="bg" className=' z-50'/>
       </div>
       <div className='z-50 '>
          <RegisterForm/> 
       </div>
     </div>
    </>
  )
}

export default HireBanner
