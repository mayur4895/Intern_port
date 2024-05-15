'use client'
import React from 'react'
import { Button } from './ui/button'

const Banner = () => {
  return (
    <div className='  text-center min-h-fit'>
  <div className='w-full m-auto flex flex-col gap-4'>
  <h1 className='md:text-6xl  md:max-w-screen-md sm:max-w-screen-sm  m-auto  sm:2xl text-3xl font-bold  text-zinc-600'>Search,Apply & Get Your <span className='text-blue-500'>Dream</span> Job.</h1>
      <p className='md:text-sm text-xs'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias ad corrupti accusamus quis, sunt rem.</p>
      <div><Button>Browse Jobs</Button></div>
  </div>
    </div>
  )
}

export default Banner
