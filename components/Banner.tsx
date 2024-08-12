'use client'
import React from 'react'
import { Button } from './ui/button'
import { MovingCards } from './ui/infinite-scroll-cards'
import Image from 'next/image'
import Link from 'next/link'

const Banner = () => {
  return (
 
    <>
    <div className='w-full  py-10 m-auto  grid md:grid-cols-2    md:container px-2 text-black  gap-4 justify-center items-center text-center'>
 <div className='flex flex-col   text-start items-start     gap-4   '>
 <h1 className='    gap w-full   md:max-w-screen-md sm:max-w-screen-sm  m-auto  text-3xl  md:text-3xl   lg:text-5xl      text-zinc-700'>The Best Place To Find  <span className='text-blue-500    drop-shadow-lg'>Internship.</span></h1>
  <span className='text-sm  text-gray-500 '>Find your internship and gain industry experience, and hire talented students</span>
      <Link href={"/student/jobs"}><Button  className=' py-2 h-10'>Browse Jobs</Button></Link>
 </div>
 <div  >
 <Image src="/bg-main.jpg" alt="main" height={600} width={700}/>
 </div>
 
  </div>

 
  
  <div className="md:container px-2 text-center py-3   border  ">
   
 <div className='py-4'>
 <MovingCards /> 
 </div>
 </div>
  </>
 
  )
}

export default Banner
