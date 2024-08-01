'use client'
import React from 'react'
import { Button } from './ui/button'
import { MovingCards } from './ui/infinite-scroll-cards'
import Image from 'next/image'

const Banner = () => {
  return (
 
    <>
    <div className='w-full  py-10 m-auto  grid md:grid-cols-2  md:container px-2 text-black  gap-4 justify-center items-center text-center'>
 <div className='flex flex-col   text-start md:text-start gap-4   '>
 <h1 className='md:text-6xl  md:max-w-screen-md sm:max-w-screen-sm  m-auto  text-3xl      text-zinc-700'>The Best Place To Find  <span className='text-purple-400    drop-shadow-lg'>Internship.</span></h1>
  <span className='text-sm  text-gray-500 '>Find your internship and gain industry experience, and hire talented students</span>
      <div><Button  className=' py-2 h-10'>Browse Jobs</Button></div>
 </div>
 <div  >
 <Image src="/bg-main.jpg" alt="main" height={600} width={700}/>
 </div>
 
  </div>

 
  
  <div className="container text-center py-3   bg-gradient-to-r from-purple-100  via-purple-300 to-purple-100">
    <h2 className='text-white  font-semibold mb-2'>Our Trusted partners</h2>
 <div className='py-4'>
 <MovingCards /> 
 </div>
 </div>
  </>
 
  )
}

export default Banner
