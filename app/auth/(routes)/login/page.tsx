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
import Login from '@/components/login'
import CompanyLogin from '@/components/hire-talent/CompanyLogin'
import { useLoginType } from '@/hooks/use-logintype'

 
const LoginPage = ( ) => {
  const {type} = useLoginType();
  console.log(type);
  
  return (
    <Tabs defaultValue={ type=="employer"?"employer" :"student"}  className="w-[400px] mt-10">
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
  )
}

 
export default LoginPage;