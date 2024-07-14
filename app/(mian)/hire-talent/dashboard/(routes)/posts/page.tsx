'use client'
import React from 'react'
import dynamic from 'next/dynamic';
import { DataTable } from './data-table';
import { columns } from './columns'; 
import { useGetCompanyPosts } from '@/features/post/api/get-allComapnyPosts';
import { Post } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import { TbDatabaseOff } from "react-icons/tb";
import { useGetApplicationofPost } from '@/features/post/api/getapplicationsofPost';

 const PostPage = () => {
 
  


  const {data,isLoading} = useGetCompanyPosts();
 
  
     
    if(isLoading){
        return <div className='  h-full left-0 top-0   lg:pl-14   flex items-center justify-center     w-full    '>
        <div className="   flex items-center justify-center  bottom-0 right-0 fixed   h-full lg:w-[85%]  w-full  "> 
           <Loader2 className=' animate-spin '/>
        </div>
        </div>
    }

    if(!data){
      return <div className='h-full w-full '>
        <div className="flex items-center justify-center"> 
                 <TbDatabaseOff size={22}/>
                  </div>
        </div>
    }
 
  return (
    <div className="    px-2   py-10">
      <DataTable columns={columns} data={data }/>
    </div>
  )
}

export default PostPage
