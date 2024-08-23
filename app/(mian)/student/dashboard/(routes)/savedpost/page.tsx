'use client'
import React, { useEffect } from 'react'
import dynamic from 'next/dynamic';
import { DataTable } from './data-table';
 
import { useGetCompanyPosts } from '@/features/post/api/get-allComapnyPosts';
import { Post } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import { TbDatabaseOff } from "react-icons/tb";
import { columns } from './column';
import { useGetSavedPost } from '@/features/student/api/getsaveposts';
import { CurrentUser } from '@/hooks/use-current-user';
import { useRouter } from 'next/navigation';
 

 const SavedPostsPage = () => {
 
  

const currentUser = CurrentUser();
 const router = useRouter();
      useEffect(()=>{
        if(!currentUser){
          return  router.push('/auth/login')
        }
      },[currentUser])
     
    const {data:posts,isLoading} = useGetSavedPost(currentUser?.id || '');
 
  
     
    if(isLoading){
        return <div className='  h-14    lg:pl-14   flex items-center justify-center     w-full    '>
        <div className="   flex items-center justify-center   w-full  "> 
           <Loader2 className=' animate-spin '/>
        </div>
        </div>
    }

    if(!posts){
      return <div className='h-full w-full '>
        <div className="flex items-center justify-center"> 
                 <TbDatabaseOff size={22}/>
                  </div>
        </div>
    }
 
  return (
    <div className="    px-2   py-10">
      <DataTable columns={columns} data={posts }/>
    </div>
  )
}

export default SavedPostsPage
