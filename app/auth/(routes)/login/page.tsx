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
      
    <Tabs defaultValue={ type=="employer"?"employer" :"student"}  className="w-[400px] ">
    <TabsList className="grid w-full grid-cols-2">
      <TabsTrigger value="student">Student</TabsTrigger>
      <TabsTrigger value="employer">Employer/Company</TabsTrigger>
    </TabsList>
    <TabsContent value="student">
      <Login/>
    </TabsContent>
    <TabsContent value="employer">
    <EmployerLogin/>
    </TabsContent>
  </Tabs>
  </div>
  )
}

 
export default LoginPage;