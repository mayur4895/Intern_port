'use client';

import { Badge } from "@/components/ui/badge";
 import { Loader2 } from 'lucide-react';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCompanyPosts } from "@/hooks/use-company-posts";
import InternshipResponsibilities from "./MarkupContent";
import MarkupContent from "./MarkupContent";
import Image from "next/image";
 

const Posts = () => {
  const { data: Posts, isLoading, error } = useCompanyPosts();

  if (isLoading) {
    return (
      <div className='fixed top-0 left-0 h-full w-full flex items-center justify-center bg-white/40'>
        <Loader2 className='animate-spin' />
      </div>
    );
  }
 

  if (error) {
    return <div>Error: {error.message}</div>;
  }

   
 

  return (
    <div>
      <div className='mt-5 flex flex-col gap-3'>
        <h3 className='text-xl'>Your Posts</h3>
        <div className='flex flex-col gap-3'>
          {Posts?.map((post, index) => (
            
            <Card key={post.id}>
              <CardHeader>
                <CardTitle className='text-xl flex  items-center gap-2'>  
                  {post?.companyLogo && <Image src={post?.companyLogo} alt="logo" height={25} width={25}/>}
                  {post.internshipProfile}  </CardTitle>
                <MarkupContent content={post.internResponsibilities} />
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <span>No of Openings: {post.noOfOpenings}</span>
                <MarkupContent content={post.whoCanApply} />
                <br />
                <span className='flex-auto gap-2'>Required Skills - {
                  post?.requiredSkills?.map((skill, skillIndex) => (
                    <Badge key={skillIndex} className="ml-2 pointer-events-none bg-blue-500">{skill}</Badge>
                  ))
                }</span>
                <span>Internship Type: {post.internshipType}</span>
              </CardContent>
              <CardFooter>
            
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
