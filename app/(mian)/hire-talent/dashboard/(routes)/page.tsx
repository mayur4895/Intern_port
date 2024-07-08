'use client'
import { useCompanyStore } from '@/hooks/use-companydata';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const Dashboard = () => {
  
  
  return (
    <div className='mt-5'>
  <div className='px-10 grid w-full grid-cols-3 gap-5'>
  <Card className=''>
  <CardHeader>
    <CardTitle className='text-xl'>No Of Posts</CardTitle>
    <CardDescription className='text-3xl'>5</CardDescription>
  </CardHeader> 
</Card>

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>

  </div>
    </div>
  )
}

export default Dashboard
