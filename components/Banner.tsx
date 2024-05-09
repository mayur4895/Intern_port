'use client'
import React from 'react'
import { Button } from './ui/button'

const Banner = () => {
  return (
    <div className='flex items-center justify-center text-center py-10   h-fit w-full'>
  <div className='w-full m-auto flex flex-col gap-4'>
  <h1 className='md:text-6xl  md:max-w-screen-md sm:max-w-screen-sm  m-auto  sm:2xl text-xl font-bold'>Search,Apply & Get Your Dream Job.</h1>
      <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias ad corrupti accusamus quis, sunt rem.</p>
      <div><Button>Browse Jobs</Button></div>
  </div>
    </div>
  )
}

export default Banner
