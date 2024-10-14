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
 
    
     
        <div className=' grid  md:grid-cols-2  lg:grid-cols-3  w-full h-screen'>
         
      <Tabs
          defaultValue={type == "employer" ? "employer" : "student"}
          className=' items-center justify-center flex flex-col  w-full  '
           >
          <TabsList className="  gap-4 w-[320px]  h-[150px]  justify-center  items-center  ">
            <TabsTrigger
              value="student"
              onClick={()=>{setlogintype('student')}}
              className="  text-xs text-gray-400 h-[70px] w-[200px]  flex  gap-2 rounded-md">
              <TbUserFilled size={22} />
              Student
            </TabsTrigger>
            <TabsTrigger
              value="employer"
              onClick={()=>{setlogintype('employer')}}
              className=" text-xs text-gray-400 h-[70px]  w-[200px] flex  gap-2 rounded-md">
              <BsBuildingsFill size={22} />
               Company
            </TabsTrigger>
          </TabsList> 
          {children}
        </Tabs>

        <div className=' md:block hidden col-span-1  lg:col-span-2 border w-full h-full' >
            <Image src="/loginbg.jpg" alt="login_bg" height={800} width={800} className=' w-full h-full object-cover'/>
          </div>
        </div>
  
   
 
  )
}

export default LoginPagelayout
