"use client"
import { ArrowUpDown, Delete, MoreHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
 
import { ColumnDef } from "@tanstack/react-table"
import type { Post } from "@prisma/client"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
   
import PostActionsCell from "@/components/hire-talent/Post/PostActionCell"
import DaysAgo from "@/components/hire-talent/Post/daysAgo"
import AppliedPostActionsCell from "@/components/student/AppliedPostActionCell"
 
  

export const columns: ColumnDef<any>[] = [ 
     
  
  {
    accessorKey: "companyLogo",
 
    header: ({ column }) => {
        return (
          <Button
            variant="ghost" 
          >
             Company 
          </Button>
        )
      },
      cell: ({ row }) => {
  
        const Post = row.original;
        
        return (
          
        <div>
            {   Post?.post?.companyLogo ?  (<div className=" flex items-center gap-2">
              <Image
            alt="Product image"
            className="aspect-square object-cover rounded-full p-1   shadow-md"
            height="30"
            src={Post?.post.companyLogo}
            width="30" 
         /> 
          <span className=" text-nowrap  truncate   w-36">{Post.post.companyName}</span>
            </div>):
          <Avatar>
            {   Post?.companyLogo ? <AvatarImage src={Post?.companyLogo}/> :
          <AvatarFallback>CN</AvatarFallback>}
        </Avatar>
        
          
          }
        </div>
        )
      },
  }, 

  {
    accessorKey:'internshipProfile',
    header: ({ column }) =>{
        return (
            <Button
              variant="ghost" 
            >
             Profile
            </Button>
          )
    },cell:({row})=>{
        const Post = row.original;

        return (
            <div className="text-nowrap">
                {   Post?.post.internshipProfile}
            </div>
        )
    }
  },
  
  {
    accessorKey: "createdAt",
 
    header: ({ column }) => {
        return (
          <Button
            variant="ghost" 
          >
             Applied on 
          </Button>
        )
      },
      cell: ({ row }) => {
        const Post = row.original
   
        return (
        <div>
            { Post?.createdAt && <DaysAgo dateString={new Date(Post?.createdAt).toDateString()}/>}
            </div>

        )
  }, 
  },
 {
    accessorKey:'status',
    header: ({ column }) =>{
        return (
            <Button
              variant="ghost" 
            >
             Status
            </Button>
          )
    },cell:({row})=>{
        const Post = row.original; 
        return (
            <div>
                {Post?.status}
            </div>
        )
    }
  },
 
  
 
]
