"use client"
import { ArrowUpDown, Delete, MoreHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import type { Post } from "@prisma/client"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
 
import { useDeletePost } from "@/hooks/use-delete-post"
 
import { useToast } from "@/components/ui/use-toast"
import { useDeleteCompanyPost } from "@/features/post/api/delete-companyPost"
import PostActionsCell from "@/components/hire-talent/Post/PostActionCell"
 

 
 

 
 
 
 

export const columns: ColumnDef<any>[] = [

  

    {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
 
  {
    accessorKey: "createdAt",
 
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
             Created At
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
             Company Logo 
          </Button>
        )
      },
      cell: ({ row }) => {
        const Post = row.original
   
        return (
        <div>
            {   Post?.companyLogo ? <Image
            alt="Product image"
            className="aspect-square object-cover"
            height="54"
            src={Post?.companyLogo}
            width="54"
          /> :
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
    accessorKey: "internshipProfile",
 
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
             Job Profile 
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  }, 
  {
    accessorKey: "applications",
    header: "Applications",
    cell: ({ row }) => {
 
      
      const post = row.original;
      console.log(post);
      return <div>{post.applications.length}</div>;
    }
  },
  
  {
    id: "actions",
    cell: ({ row }) => (
      <PostActionsCell row={row} />
    ),
  },
]
