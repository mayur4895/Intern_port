'use client'
import EmptyNavbar from '@/components/Navbar/EmptyNavbar'
import MainNavbar from '@/components/Navbar/Student/MainNavbar'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from 'next/link';
import { useLoginType } from '@/hooks/use-logintype';
import { TfiClose } from 'react-icons/tfi';
import { TbUserFilled } from 'react-icons/tb';
import { BsBuildingsFill } from 'react-icons/bs';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
const LoginPagelayout = ({children}:{children:React.ReactNode}) => {

  const { type } = useLoginType();
  const [ logintype, setlogintype]= useState('student');  
  return (
    <div className=' w-full flex items-center md:h-screen h-auto   bg-blue-800/10 justify-center'> 
    
      <div className=' relative  shadow-md rounded-md'>
      <Link href={"/"} className=" absolute right-5 top-5 hidden md:block cursor-pointer "><TfiClose size={22} className='text-gray-500'/></Link>
      <Tabs
          defaultValue={type == "employer" ? "employer" : "student"}
          className=" lg:h-[600px]  h-auto top-10   shadow-sm   bg-white rounded-md border w-full flex flex-col   items-center justify-center">
          <TabsList className="grid    grid-cols-2 gap-5 w-[320px]  h-[150px]   items-center justify-between ">
            <TabsTrigger
              value="student"
              onClick={()=>{setlogintype('student')}}
              className="  text-xs text-gray-400 h-[70px] flex  gap-2 rounded-md">
              <TbUserFilled size={22} />
              Student
            </TabsTrigger>
            <TabsTrigger
              value="employer"
              onClick={()=>{setlogintype('employer')}}
              className=" text-xs text-gray-400 h-[70px] flex  gap-2 rounded-md">
              <BsBuildingsFill size={22} />
               Company
            </TabsTrigger>
          </TabsList> 
   <Separator/>
          {children}
        </Tabs>
      </div>
   
    </div>
  )
}

export default LoginPagelayout
