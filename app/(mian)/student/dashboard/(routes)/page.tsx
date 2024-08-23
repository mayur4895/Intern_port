'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGetAllPosts } from '@/features/post/api/getallPosts'
import { Activity, ArrowRight, Building2, CreditCard, DollarSign, Loader2, LocateIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
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
import { useGetCompanyPosts } from '@/features/post/api/get-allComapnyPosts'
import { DataTable } from './savedpost/data-table'
import { columns } from './savedpost/column'
import { TbDatabaseOff } from 'react-icons/tb'
import { CurrentUser } from '@/hooks/use-current-user'
import { useGetSavedPost } from '@/features/student/api/getsaveposts'
import { ScrollArea } from '@/components/ui/scroll-area'
import SavedPostsPage from './savedpost/page'
import { useRouter } from 'next/navigation'
import ApplidPostPage from './Applied/page'
import ApplidRecentPostPage from './recentApplied/page'



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

const MapIcon: any = {
  'in office': <Building2 className='text-gray-500' size={15} />,
  'remote': <LocateIcon className='text-gray-500' size={15} />,
}



const DashboardPage = () => {

  const currentUser = CurrentUser();
  const { data: Internships, isLoading, error } = useGetAllPosts();
 
  const router = useRouter();
  useEffect(()=>{
    if(!currentUser){
      return  router.push('/auth/login')
    }
  },[currentUser])
 
 
 

  return (
    <>
     <div className='px-2 mt-4'>
      <h2 className='text-2xl font-semibold'>Hii👋 {currentUser?.name} </h2>
     </div>
      <div className='flex flex-col  mt-8 sm:px-2'>
        {/* <div> */}
          {/* <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8"> */}
            <Tabs defaultValue="recent applications" className='w-full'>
              <div className="flex   w-full ">
              <TabsList defaultValue={'all'} className='mb-5 md:mb-0 flex  flex-wrap gap-2 items-start justify-start   whitespace-nowrap'>
  <TabsTrigger value="recent applications">Recent Applications</TabsTrigger>
  <TabsTrigger value="applied">Applied</TabsTrigger>
  <TabsTrigger value="active applications">Active Applications</TabsTrigger>
  <TabsTrigger value="saved posts" className="sm:flex">
    Saved posts
  </TabsTrigger>
</TabsList>
              </div>
              <TabsContent value="recent applications">
                 <ApplidRecentPostPage/>
              </TabsContent>
              <TabsContent value="applied"> 
                       <ApplidPostPage/> 
        </TabsContent>
              <TabsContent value="active applications">
     <div className='h-20  flex items-center justify-center w-full p-2  border'>
     No Active Applications
     </div>
                </TabsContent>
 

<TabsContent value="saved posts" className="tabs-content-scrollable px-0">
 
    <SavedPostsPage />
 
</TabsContent>
 
 
              

            </Tabs>
            
          {/* </main>
        </div> */}
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
