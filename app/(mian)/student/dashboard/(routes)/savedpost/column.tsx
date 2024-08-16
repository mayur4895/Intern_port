"use client"
import { ArrowUpDown, Delete, MoreHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
 
import { ColumnDef } from "@tanstack/react-table"
import type { Post } from "@prisma/client"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
   
import PostActionsCell from "@/components/hire-talent/Post/PostActionCell"
 

 
 

 
 
 
 

export const columns: ColumnDef<any>[] = [ 
    // {
    //     id: "select",
    //     header: ({ table }) => (
    //       <Checkbox
    //         checked={
    //           table.getIsAllPageRowsSelected() ||
    //           (table.getIsSomePageRowsSelected() && "indeterminate")
    //         }
    //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //         aria-label="Select all"
    //       />
    //     ),
    //     cell: ({ row }) => (
    //       <Checkbox
    //         checked={row.getIsSelected()}
    //         onCheckedChange={(value) => row.toggleSelected(!!value)}
    //         aria-label="Select row"
    //       />
    //     ),
    //     enableSorting: false,
    //     enableHiding: false,
    //   },
 
  {
    accessorKey: "createdAt",
 
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
             Save Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const Post = row.original
   
        return (
        <div>
             {Post.createdAt.toDateString()}
            </div>

        )
  }, 
  },
  {
    accessorKey: "companyLogo",
 
    header: ({ column }) => {
        return (
          <Button
            variant="ghost" 
          >
             Company Name
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
          <span className=" text-nowrap">{Post.post.companyName}</span>
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
             Role
            </Button>
          )
    },cell:({row})=>{
        const Post = row.original;

        return (
            <div>
                {   Post?.post.internshipProfile}
            </div>
        )
    }
  },
 
 
  
  {
    id: "actions",
    header: ({ column }) =>{
        return (
            <Button
              variant="ghost" 
            >
             Actions
            </Button>
          )
    },
    cell: ({ row }) => (
      <PostActionsCell row={row} />
    ),
  },
]
