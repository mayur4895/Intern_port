import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IoCheckmarkDone } from 'react-icons/io5'

const POstApplyPage = () => {
  return (
    <div className="flex   items-center justify-center h-[100vh] w-full text-center">
      <Card className=' w-[500px] pb-10 flex flex-col gap-3 text-center items-center'>
          <Image src={"/submit.png"} alt="st" height={200} width={400} className=' w-full  object-cover'/>

          <h2 className='text-2xl font-semibold w-2/3 text-zinc-700'>Your application has been submitted!</h2>
           <div className=' flex items-center gap-2 text-start  w-2/3  '>
           <IoCheckmarkDone size={22}  className='text-green-600'/>
           <div className=' flex flex-col gap-1'>
          <span className='text-sm text-zinc-800'>
          You will get an email confirmation at  
          </span>
          <p className='text-sm text-zinc-900 font-semibold'> test@gmail.com</p>
          </div>
            </div>
          <Link href={'/student/dashboard/jobs'}>
          <Button className='w-42 text-center mt-4 hover:bg-blue-100 border-blue-400 h-12 ' variant={"outline"}>Return to Job Search</Button></Link>
      </Card>
    </div>
  )
}

export default POstApplyPage
