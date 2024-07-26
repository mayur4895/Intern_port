'use client'
import React from 'react'
import { Button } from './ui/button'
import { MovingCards } from './ui/infinite-scroll-cards'

const Banner = () => {
  return (
 
  <div className='w-full  py-10 m-auto flex  flex-col bg-gradient-to-b to-blue-400 from-blue-600       gap-4 justify-center items-center text-center'>
 <div className='flex flex-col gap-4'>
 <h1 className='md:text-6xl  md:max-w-screen-md sm:max-w-screen-sm  m-auto  sm:3xl lg:text-5xl font-semibold  text-slate-200  '>Search,Apply & Get Your  Dream  Job.</h1>
    
      <div><Button variant={"outline"} className=' bg-transparent text-white   py-2 h-10'>Browse Jobs</Button></div>
 </div>
 
 <div className='container pb-3 mt-8'>
 <MovingCards /> 
 </div>
  </div>
 
  )
}

export default Banner
