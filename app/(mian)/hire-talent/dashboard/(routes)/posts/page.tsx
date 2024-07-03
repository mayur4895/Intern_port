'use client'
 
import { Badge } from "@/components/ui/badge"
import { getAllPosts } from '@/actions/hire-talent/getallPosts';
import { useCompanyPosts } from '@/hooks/use-allpost';
import { Loader2 } from 'lucide-react';
import React, { useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const PostsPage = () => {

 
    const {  Posts, isLoading, error, fetchPosts } = useCompanyPosts();

    useEffect(() => {
      fetchPosts();
    }, [fetchPosts]);

 


  
   
  
  return (
    <div>

     { isLoading && <div className=' fixed top-0 left-0 h-full w-full flex items-center justify-center'>
            <Loader2 className=' animate-spin'/>
      </div>}
          <div className=' mt-5 flex flex-col gap-3'>
          <h3 className='text-xl'>Your Posts</h3>
            <div className='flex flex-col gap-3'>
              {Posts?.map((post, index) => (
               <Card>
               <CardHeader>
                 <CardTitle className='text-xl'>{post.internshipProfile} at  <span className="text-gray-600"> {post.companyName}</span></CardTitle>
                 <CardDescription>{post.internResponsibilities}</CardDescription>
               </CardHeader>
               <CardContent  className="flex flex-col gap-2">
                <span>No of Opening: {post.noOfOpenings}</span>
                 <span className='text-gray-600 text-sm'>{post.whoCanApply}</span>
                 <br/>
                 <span className=' flex-auto gap-2'>Required Skills - {
                  post?.requiredSkills?.map((skill)=>{
               return (
                <Badge className=" ml-2 pointer-events-none bg-blue-500">{skill}</Badge>
               )
                  })
                  }</span>

<span>Internship Type : {post.internshipType}</span>
               </CardContent>
               <CardFooter>
         
 
               </CardFooter>
             </Card> 
              ))}

         
            </div>
          </div>
    </div>
  )
}

export default PostsPage
