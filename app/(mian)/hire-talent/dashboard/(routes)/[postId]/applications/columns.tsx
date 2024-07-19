"use client"
import { ArrowUpDown, Delete, MoreHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
 
import { ColumnDef } from "@tanstack/react-table"
 
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
   
 
import { Application } from "@prisma/client"
import Link from "next/link"
import { PiEyeThin } from "react-icons/pi"
import ApplicationActionsCell from "@/components/hire-talent/Application/ApplicationActionsCell"
 

 
 

 
 
 
 

export const columns: ColumnDef<Application>[] = [

  

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
        accessorKey: "profileUrl",
     
        header: ({ column }) => {
            return (
              <Button
                variant="ghost" 
              >
                Profile
              
              </Button>
            )
          }, cell:({row})=>{
            const Application = row.original
            return( 
            <Avatar>
              {   Application?.profileUrl ? <AvatarImage src={Application?.profileUrl }/> :
            <AvatarFallback>CN</AvatarFallback>}
          </Avatar>
    
          
            )
          }
      }, 
      {
        accessorKey: "studentName",
     
        header: ({ column }) => {
            return (
              <Button
                variant="ghost" 
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
          cell: ({ row }) => {
            const Application = row.original
             return(<div className=" text-nowrap  truncate  min-w-[80px] w-auto">
              {Application.studentName}
             </div>)
          }
      }, 
 
  
  
  {
    accessorKey: "resumeUrl",
 
    header: ({ column }) => {
        return (
          <Button
            variant="ghost" 
          >
             Resume
          </Button>
        )
      },
      cell: ({ row }) => {
        const Application = row.original
 
        return (
        <div>
            {   Application.resumeUrl &&  <div className=" w-[180px] flex items-center gap-2">
              <Link href={Application.resumeUrl}><PiEyeThin className="text-gray-600"  size={18}/></Link>
              <div className=" flex items-center gap-2">
              <Image
            alt="Product image"
            className="aspect-square object-cover"
            height="24"
            src={"/pdf.png"}
            width="24"
          />  
          <span className=" text-gray-500">Resume</span>
              </div>
              </div>
          }
        </div>
        )
      },
  }, 
  {
    accessorKey: "status",
 
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
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
        const Application = row.original 
        return (
        <div>
             {Application.createdAt.toDateString()}
            </div>

        )
  }, 
  },
  
  {
    id: "actions",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost" 
        >
          Actions 
        </Button>
      )
    },
    cell: ({ row }) => (
      <ApplicationActionsCell row={row} />
    ),
  },
]
