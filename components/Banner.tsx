'use client'
import React from 'react'
import { Button } from './ui/button'

const Banner = () => {
  return (
 
  <div className='w-full h-auto m-auto flex  mt-8  gap-4 justify-center items-center text-center'>
 <div className='flex flex-col gap-4'>
 <h1 className='md:text-6xl  md:max-w-screen-md sm:max-w-screen-sm  m-auto  sm:3xl text-5xl font-bold  text-zinc-600'>Search,Apply & Get Your <span className='text-blue-500'>Dream</span> Job.</h1>
      <p className='md:text-sm text-xs'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias ad corrupti accusamus quis, sunt rem.</p>
      <div><Button>Browse Jobs</Button></div>
 </div>
  </div>
 
  )
}

export default Banner
