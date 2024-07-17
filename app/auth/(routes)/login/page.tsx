'use client'
import React, { useEffect } from 'react' 
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Login from '@/components/auth/login' 
import { useLoginType } from '@/hooks/use-logintype'
import EmployerLogin from '@/components/hire-talent/EmployerLogin'
import { CurrentUser } from '@/hooks/use-current-user'
import { UserType } from '@prisma/client'
import { redirect } from 'next/navigation'
import { TbUser, TbUserFilled } from 'react-icons/tb'
import { BsBuildingsFill } from "react-icons/bs";
import Image from 'next/image'

 
const LoginPage = ( ) => {
  const currentUser = CurrentUser();
  const {type} = useLoginType();

 

useEffect(()=>{

  if(currentUser && currentUser.role  === UserType.EMPLOYER){
    return redirect("/hire-talent/dashboard");
}else if(currentUser && currentUser.role === UserType.STUDENT){
  return  redirect("/student/dashboard");
}

},[currentUser])
  
  return (
    <div className="flex items-center justify-center h-screen w-full   ">
      <div className='   bg-transparent p-5   h-full  container '>
      <Tabs defaultValue={ type=="employer"?"employer" :"student"}  className=" h-[600px]  top-10   w-full flex flex-col  items-center justify-center">
      <TabsList className="grid grid-cols-2 gap-5 w-[400px] h-[150px] mb-2  items-center justify-between ">
      <TabsTrigger value="student"  className='  text-gray-400 h-[100px] flex flex-col gap-2'><TbUserFilled  size={22}/>

      Student</TabsTrigger>
      <TabsTrigger value="employer" className='text-gray-400 h-[100px] flex flex-col gap-2' >
      <BsBuildingsFill size={22}/>

        Employer/Company</TabsTrigger>
    </TabsList>
   
     
   <div className='lg:grid lg:grid-cols-2 bg-white shadow-md  border rounded-tr-[50px]   rounded-bl-[50px] h-full w-full'>
    <div className='w-full h-full   rounded-bl-[50px] px-4 bg-black flex items-center justify-center p-5 overflow-hidden'>
    s
    </div>
    <div className=' rounded-tr-[50px]'>
    <TabsContent value="student" className='  flex items-center justify-center'>
      <Login/>
    </TabsContent>
    <TabsContent value="employer" className=' flex items-center justify-center ' >
    <EmployerLogin/>
    </TabsContent>
    </div>
   </div>
  </Tabs>
      </div>
 
  </div>
  )
}

 
export default LoginPage;