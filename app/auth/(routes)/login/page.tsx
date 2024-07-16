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
    <div className="flex items-center justify-center h-screen w-full">
      
     <div className=' lg:grid lg:grid-cols-2 w-full p-5 items-center   container border'>
      <div className='w-full h-full bg-orange-500 '>
      ss
      </div>
     <Tabs defaultValue={ type=="employer"?"employer" :"student"}  className=" w-full flex flex-col  items-center justify-center">
    <TabsList className="grid grid-cols-2 gap-5 w-[400px] items-center justify-between ">
      <TabsTrigger value="student" >Student</TabsTrigger>
      <TabsTrigger value="employer"  >Employer/Company</TabsTrigger>
    </TabsList>
    <TabsContent value="student" className=' w-full  flex items-center justify-center'>
      <Login/>
    </TabsContent>
    <TabsContent value="employer" className=' w-full    flex items-center justify-center'>
    <EmployerLogin/>
    </TabsContent>
  </Tabs>
     </div>
  </div>
  )
}

 
export default LoginPage;