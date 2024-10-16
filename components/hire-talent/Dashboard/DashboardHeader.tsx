'use client'
import React from 'react'
 
import {   CurrentUser, } from '@/hooks/use-current-user';
 
import { FaBuilding, FaPlusCircle, FaRegBuilding } from 'react-icons/fa';
 

 
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
  Building2, 
  Home,
  LineChart, 
  Package, 
  PanelLeft, 
  Search, 
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from 'next/link';
 
import { Separator } from '../../ui/separator';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarImage } from '../../ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { signOut } from 'next-auth/react';
import { CiLogout } from 'react-icons/ci';
import { IoSettingsOutline } from 'react-icons/io5';
import { IoIosHelpCircleOutline } from 'react-icons/io';
const DashboardHeader = () => {
  const  currentUser  =   CurrentUser();
 
    const pathname = usePathname();
    const handleLogout = async () => {
  try {
    await signOut({ redirect: true, callbackUrl: "/" });
  } catch (error) {
    console.error("Error during logout:", error);
  }
};
  return ( 
<header className="sticky  py-2  top-0 z-30 flex h-14 items-center gap-4 border-b bg-background   sm:static sm:h-auto sm:border-0 sm:bg-transparent px-4">
<Sheet>
  <SheetTrigger asChild>
    <Button size="icon" variant="outline" className="lg:hidden">
      <PanelLeft className="h-4 w-4" />
      <span className="sr-only">Toggle Menu</span>
    </Button>
  </SheetTrigger>
  <SheetContent side="left" className="sm:max-w-xs">
    <nav className="grid gap-6 text-lg font-normal">
      <Link
        href="#"
        className="group flex  shrink-0 gap-2   text-sm font-semibold  md:text-base"
      >
        <Building2 className="h-4 w-4 transition-all group-hover:scale-110" />
        <span>Modern </span>
      </Link>
      <Separator/>
      <Link
          href="/hire-talent/dashboard"
        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground text-sm"
      >
        <Home className="h-4 w-4" />
        Dashboard
      </Link>
      <Link
        href="/hire-talent/dashboard/new-post"
        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground text-sm"
      >
            <FaPlusCircle className="h-5 w-5" />
            <span className="">Create post</span> 
      </Link>
      <Link
      href="/hire-talent/dashboard/posts"
        className="flex items-center gap-4 px-2.5 text-muted-foreground  hover:text-foreground text-sm"
      >
        <Package className="h-4 w-4" />
         view posts
      </Link> 
      <Link
        href="#"
        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground text-sm"
      >
        <LineChart className="h-4 w-4" />
      charts
      </Link>
    </nav>
  </SheetContent>
</Sheet>
<Breadcrumb className="hidden md:flex">
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink asChild>
        <Link href="/hire-talent/dashboard" className={` text-gray-500  ${pathname === `/hire-talent/dashboard`}`?'text-zinc-800':' text-zinc-400'}>Dashboard</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink asChild>
      <Link href="/hire-talent/dashboard/posts" className={`${pathname === `/hire-talent/posts`}`?'text-zinc-800':' text-zinc-400'}>Posts</Link>
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
    <Avatar className='flex items-center   bg-black  justify-center '>
      <AvatarImage src="" className=' h-6 w-6' alt="@shadcn" />
      <AvatarFallback className='   text-white'>{currentUser?.name ? currentUser?.name[0]: '?'}</AvatarFallback>
    </Avatar>
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="center"  className=' w-60 flex flex-col items-start  ' >
    <DropdownMenuLabel>{currentUser?.name }</DropdownMenuLabel>
     <span className=' text-xs pl-2'>{currentUser?.email}</span>
     <Separator className='mt-2'/>
    <DropdownMenuSeparator />
    <DropdownMenuItem className=' flex items-center gap-2 text-xs'><IoSettingsOutline size={20}/>Settings</DropdownMenuItem>
    <DropdownMenuItem className=' flex items-center gap-2 text-xs'> <IoIosHelpCircleOutline size={20}/> Support</DropdownMenuItem>
    <DropdownMenuSeparator />
    <Separator className='mt-2'/>
    <DropdownMenuItem className=' text-xs flex items-center gap-2'  onClick={handleLogout}> <CiLogout  size={20}/> Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
</header>
  )
}

export default DashboardHeader
