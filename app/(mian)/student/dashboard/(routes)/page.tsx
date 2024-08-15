'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGetAllPosts } from '@/features/post/api/getallPosts'
import { Activity, ArrowRight, Building2, CreditCard, DollarSign, LocateIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"



type ApplicationType = {
  id: string;
  companyName: string;
  internshipProfile: string;
  status: 'Applied' | 'Interview' | 'Accepted' | 'Rejected';
  applicationDate: Date;
  location: 'Remote' | 'In Office';
};

const recentApplications: ApplicationType[] = [
  {
    id: '1',
    companyName: 'TechCorp',
    internshipProfile: 'Software Engineer Intern',
    status: 'Applied',
    applicationDate: new Date('2024-07-20'),
    location: 'Remote',
  },
  {
    id: '2',
    companyName: 'Healthify Inc.',
    internshipProfile: 'Data Analyst Intern',
    status: 'Interview',
    applicationDate: new Date('2024-07-18'),
    location: 'In Office',
  },
  {
    id: '3',
    companyName: 'Innovate Labs',
    internshipProfile: 'Product Manager Intern',
    status: 'Accepted',
    applicationDate: new Date('2024-07-15'),
    location: 'Remote',
  },
  {
    id: '4',
    companyName: 'DesignStudio',
    internshipProfile: 'UI/UX Designer Intern',
    status: 'Rejected',
    applicationDate: new Date('2024-07-10'),
    location: 'In Office',
  },
];





const DashboardPage = () => {
  const { data: Internships, isLoading, error } = useGetAllPosts();

  const MapIcon: any = {
    'in office': <Building2 className='text-gray-500' size={15} />,
    'remote': <LocateIcon className='text-gray-500' size={15} />,
  }

  return (
    <>
      <div className='w-full px-10'>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        </div>
      </div>

      <div className='flex flex-col px-5 mt-8'>
        <div>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="recent applications">
              <div className="flex items-center">
                <TabsList defaultValue={'all'}>
                  <TabsTrigger value="recent applications">Recent Applications</TabsTrigger>
                  <TabsTrigger value="applications history">Applications History</TabsTrigger>
                  <TabsTrigger value="active applications">Active Applications</TabsTrigger>
                  <TabsTrigger value="saved posts" className="  sm:flex">
                    Saved posts
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="recent applications">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Applications</CardTitle>
                    <CardDescription>
                      Manage your Applications and tracking it.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                  <Table>
      <TableCaption>A list of your recent Applications.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead  >Role</TableHead>
          <TableHead>Comapny Name</TableHead>
          <TableHead>location</TableHead>
          <TableHead >Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentApplications.map((Application) => (
          <TableRow key={Application.id}>
            <TableCell className="font-medium">{Application.internshipProfile}</TableCell>
            <TableCell>{Application.companyName}</TableCell>
            <TableCell>{Application.location}</TableCell>
            <TableCell >{Application.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
 
    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="applications history">
                <Card>
                  <CardHeader>
                    <CardTitle>Application History</CardTitle>
                    <CardDescription>
                      Manage your Applications and tracking it.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                  <Table>
      <TableCaption>A list of your Applications.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead  >Role</TableHead>
          <TableHead>Comapny Name</TableHead>
          <TableHead>location</TableHead>
          <TableHead >Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentApplications.map((Application) => (
          <TableRow key={Application.id}>
            <TableCell className="font-medium">{Application.internshipProfile}</TableCell>
            <TableCell>{Application.companyName}</TableCell>
            <TableCell>{Application.location}</TableCell>
            <TableCell >{Application.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
 
    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

            </Tabs>
            
          </main>
        </div>
        <br />
        <h2 className='px-5'>Recommended for you</h2>
        <div className='flex flex-wrap w-full mt-3 gap-3  px-5'>
          {  isLoading  
            ? Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className='bg-zinc-200/50 h-[200px] w-[320px]' />
            ))
            : Internships?.map((internship) => (
              <Card key={internship.id} className='w-[320px] cursor-pointer shadow-none border-zinc-300'>
                <CardHeader className='flex justify-between items-start flex-row w-full py-4'>
                  <div>
                    <span>{internship.internshipProfile}</span>
                    <CardDescription className='text-sm text-nowrap w-[90%]'>{internship.companyName}</CardDescription>
                  </div>
                  {internship.companyLogo && <Image src={internship.companyLogo} alt='logo' height={30} width={30} className='object-center object-contain' />}
                </CardHeader>
                <Separator />
                <CardContent className='py-2'>
                  <span className='flex items-center gap-2 text-sm'>{MapIcon[internship.internshipType]} {internship.internshipType}</span>
                  <span className='flex items-center gap-2 text-sm'><CreditCard size={12} /> ₹ 6,00,000 - 8,00,000/year</span>
                  <span className='text-sm text-gray-500'>{new Date(internship.createdAt).toDateString()}</span>
                </CardContent>
                <CardFooter className='mt-2 flex items-end justify-end'>
                  <Link href={`/student/internship/${internship.id}/detail`} className='flex text-sm items-center gap-1'>View Details <ArrowRight size={15} /></Link>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </>
  )
}

export default DashboardPage;
