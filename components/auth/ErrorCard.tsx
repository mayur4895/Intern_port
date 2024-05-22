import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const ErrorCard = () => {
  return (
    <div className='flex justify-center items-center h-full w-full'>
         <div  className=' w-full items-center flex flex-col  p-4 shadow-sm border bg-white rounded-lg'>
         <Image src={"/Error.png"} alt="Error"  height={200} width={200} className=' object-cover object-center'/>
        <Link href={"/"}>  <Button>Back to Home</Button></Link>
    </div>
    </div>
  )
}

export default ErrorCard
