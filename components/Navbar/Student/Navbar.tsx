 
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
 
import Link from "next/link"
import { HiOutlineMenuAlt1 } from 'react-icons/hi'
import { IoEllipsisVertical } from 'react-icons/io5'
 import { useLoginType } from '@/hooks/use-logintype'
import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Separator } from '@radix-ui/react-menubar'
  



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
        label: "InternShips",
        href: "/internships",
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

 
    const { onSetType} = useLoginType()
    
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
 
  </div>   
</Menubar>

    
    )
  }
  
  export default Navbar
  