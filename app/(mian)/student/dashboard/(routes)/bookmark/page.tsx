'use client'
import React, { useEffect } from 'react'
import dynamic from 'next/dynamic';
 
 
import { useGetCompanyPosts } from '@/features/post/api/get-allComapnyPosts';
 import { Loader2 } from 'lucide-react';
import { TbDatabaseOff } from "react-icons/tb";
 
import { useGetSavedPost } from '@/features/student/api/getsaveposts';
import { CurrentUser } from '@/hooks/use-current-user';
import { useRouter } from 'next/navigation';
import InternshipCard from '@/components/student/InternshipCard';
import { Post } from '@prisma/client';
import SavedInternshipCard from '@/components/student/SavedInternshipCard';
import Image from 'next/image';
 
type SavedPost = {
  id: string;
  userId: string;
  postId: string;
  post: Post;  
};

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
      return <div className='  h-full left-0 top-0   lg:pl-14   flex items-center justify-center     w-full    '>
      <div className="   flex items-center justify-center  bottom-0 right-0 fixed   h-full lg:w-[85%]  w-full  "> 
         <Loader2 className=' animate-spin '/>
      </div>
      </div>
  }
    if(posts.length ==0){
      return <div className='  h-full left-0 top-0   lg:pl-14   flex items-center justify-center     w-full    '>
      <div className="   flex items-center justify-center  bottom-0 right-0 fixed   h-full lg:w-[85%]  w-full  "> 
          <div className='text-center flex flex-col gap-3'>
          <Image src={"/no_data.png"} alt={"no_data"} height={120} width={120}/>
          <span className=' text-gray-500'>No Bookmarks</span>
          </div>
      </div>
      </div>
    }
 
  return ( 

<div className=" md:px-2  w-full mt-4 ">
<h2 className='text-2xl mb-4'>My Bookmarks</h2>
<div className='flex flex-wrap w-full mt-3 gap-3  px-5'>
      {posts.map((post:SavedPost) => (
        <div key={post.id} className=' w-full'>
            <SavedInternshipCard  internship={post}/> 
        </div>
      ))}
      </div>
 
</div>
  )
}

export default SavedPostsPage
