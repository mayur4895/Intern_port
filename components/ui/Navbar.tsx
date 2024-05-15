 'use client'
  

  import React from 'react'
  import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
  } from "@/components/ui/menubar"
  import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Button } from "./button"
import Link from "next/link"
import { HiOutlineMenuAlt1 } from 'react-icons/hi'
import { IoEllipsisVertical } from 'react-icons/io5'
import { Separator } from './separator'
  



interface NavbarProps{
  session?:any;
}

  const Navbar = ({session}:NavbarProps) => {


    const Navbars = [
      {
        label: "Home",
        href: "/",
      },
      {
        label: "InterShips",
        href: "/interships",
      },
      {
        label: "Jobs",
        href: "/jobs",
      },
      {
        label: "Services",
        href: "/services",
      },
      {
        label: "Contact Us",
        href: "/contact",
      },
    ]

 
    
    return (
    
        <Menubar> 
 
    <div className="ml-auto flex items-center ">
    <div className='hidden  lg:flex'>
    {Navbars.map(({ label, href }) => (
        <MenubarMenu key={label}>
          <MenubarTrigger> <Link href={href} className=' whitespace-nowrap'> {label}</Link></MenubarTrigger>
        </MenubarMenu>
      ))}
    </div>

      <MenubarMenu>
        <MenubarTrigger asChild>
        <Sheet>
      <SheetTrigger asChild className=' lg:hidden'>
        <Button variant={ "ghost"} ><IoEllipsisVertical  size={20}/> </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>JobHunt.</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
      <div className='flex flex-col gap-y-3'>
      {Navbars.map(({ label, href }) => (
        <MenubarMenu key={label}>
          <MenubarTrigger> <Link href={href} className=' whitespace-nowrap'> {label}</Link></MenubarTrigger>
        </MenubarMenu>
      ))}
<Separator/>{
  !session &&  (
<div className="flex flex-col  ml-4   items-start  justify-start gap-4"> 
        <Link href={"/auth/login"} className='text-sm text-black font-semibold hover:text-blue-500'>  Login </Link>
      
        <Link href={"/auth/signup"} className='text-sm text-black font-semibold hover:text-blue-500'>   Candident Sign-up </Link>
        
        <Link href={"/signup"} className='text-sm text-black font-semibold hover:text-blue-500'>   Employer Sign-up </Link>
     </div> )}

     { 
      session &&  
      <div className="flex flex-col    items-start  justify-start gap-4"> 

      <Button variant={"link"} className='text-sm text-black font-semibold hover:text-blue-500'>Logout</Button>
      </div>
     }
      </div>
        
      </SheetContent>
    </Sheet>
        </MenubarTrigger>
      </MenubarMenu>

    </div>  
    
</Menubar>

    
    )
  }
  
  export default Navbar
  