'use client'
import React from 'react'
import { PiBuildingsFill } from "react-icons/pi";
 
import { CurrentUser } from '@/hooks/use-current-user';
 
import { FaBuilding, FaPlusCircle, FaRegBuilding } from 'react-icons/fa';
 

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Building,
  Building2,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from 'next/link';
import Image from 'next/image';
import { Separator } from '../ui/separator';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarImage } from '../ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { signOut } from 'next-auth/react';
const StudentDashboardHeader = () => {
    const currentUser = CurrentUser();
 
    const pathname = usePathname();
    
  return ( 
<header className="sticky  py-2  top-0 z-30 flex h-14 items-center gap-4 border-b bg-background   sm:static sm:h-auto sm:border-0 sm:bg-transparent px-4">
 
<Breadcrumb className="hidden md:flex">
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink asChild>
        <Link href="/hire-talent/dashboard" className={` text-gray-500  ${pathname === `/student/dashboard`}`?'text-zinc-800':' text-zinc-400'}>Dashboard</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink asChild>
      <Link href="/hire-talent/dashboard/posts" className={`${pathname === `/student/dashboard/jobs`}`?'text-zinc-800':' text-zinc-400'}>Jobs</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    
  </BreadcrumbList>
</Breadcrumb>
<div className="relative ml-auto flex-1 md:grow-0">
  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
  <Input
    type="search"
    placeholder="Search..."
    className="w-full rounded-lg bg-background  pl-8 md:w-[200px] lg:w-[336px]"
  />
</div>
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button
      variant="outline"
      size="icon"
      className="overflow-hidden rounded-full  "
    >
    <Avatar className='flex items-center  bg-blue-400  justify-center '>
      <AvatarImage src="/user.png" alt="@shadcn" />
      <AvatarFallback className='   text-white'>{currentUser?.name ? currentUser?.name[0]: '?'}</AvatarFallback>
    </Avatar>
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem>Support</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem  onClick={() => {
                            signOut();
                          }}>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
</header>
  )
}

export default StudentDashboardHeader
