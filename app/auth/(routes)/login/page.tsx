 'use client'
import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Login from '@/components/auth/login'
import CompanyLogin from '@/components/hire-talent/CompanyLogin'
import { useLoginType } from '@/hooks/use-logintype'

 
const LoginPage = ( ) => {
  const {type} = useLoginType();
 
  
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
    <CompanyLogin/>
    </TabsContent>
  </Tabs>
  </div>
  )
}

 
export default LoginPage;