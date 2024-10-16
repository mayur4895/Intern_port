"use client"
import { ArrowUpDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button" 
import { ColumnDef } from "@tanstack/react-table" 
import Image from "next/image" 
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
             Company Name
          </Button>
        )
      },
      cell: ({ row }) => {
  
        const Post = row.original
      console.log(Post?.companyLogo);
      
        return (
          
        <div className=" flex items-center gap-2">
          {   Post?.companyLogo &&  (<div className=" flex items-center gap-2">
              <Image
            alt="Product image"
            className="aspect-square object-cover rounded-full p-1   "
            height="35"
            src={Post?.companyLogo}
            width="35"
          /> 
          </div>)}
          {Post?.companyName}
         
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
