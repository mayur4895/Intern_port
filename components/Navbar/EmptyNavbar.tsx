'use client'
import React, { useEffect, useState } from 'react'
 
import Link from 'next/link'
  

 

const EmptyNavbar =  ( ) => {
 
 
  
  
  return (
    <div className='flex  w-full z-50'>
       <div className="flex w-full items-center border-b shadow-sm  bg-white  py-3 pl-4 md:px-4 ">
        <div className='font-bold tracking-wider'><Link href={"/"}>HireIntern</Link></div>
        
    </div>
    </div>
  )
}

export default EmptyNavbar
