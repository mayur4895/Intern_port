'use client'
import { useCompanyPosts } from "@/hooks/use-company-posts"
import {  columns } from "./columns"
import { DataTable } from "./data-table"
import { Post } from "@prisma/client";

 

export default   function PostsTable() {
 
    const {data} = useCompanyPosts();
     
    if(!data){
        return <div>No Data</div>
    }
 
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data}/>
    </div>
  )
}
