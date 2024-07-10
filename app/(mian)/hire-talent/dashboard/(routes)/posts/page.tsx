'use client'
import React from 'react'
import dynamic from 'next/dynamic';
import { DataTable } from './data-table';
import { columns } from './columns';
import { useCompanyPosts } from '@/hooks/use-company-posts';
import { useGetCompanyPosts } from '@/features/post/api/get-allComapnyPosts';
import { Post } from '@prisma/client';
 const PostPage = () => {
  const {data} = useGetCompanyPosts();
     
    if(!data){
        return <div>No Data</div>
    }
 
  return (
    <div className="container  px-1 py-10">
      <DataTable columns={columns} data={data}/>
    </div>
  )
}

export default PostPage
