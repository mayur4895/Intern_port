 
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
 import { UserType } from '@prisma/client'
  



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
        label: "Contact Us",
        href: "/contact",
      },
    ]

    const StudentLogedInNavbar=[
      {
        label: "Home",
        href: "/student/dashboard",
      },
     
      {
        label: "My Applicatons",
        href: "/contact",
      },
      {
        label: "profile",
        href: "/update-profile",
      },
    ]
    const { onSetType} = useLoginType()
    
    return (
      <Menubar> 
 
  
      <div className='hidden  lg:flex'>
  
  
      {
        (session?.role !== UserType.EMPLOYER && !session ) && (
          Navbars.map(({ label, href }) => {
            return (
            
                <MenubarMenu key={label}>
                  <MenubarTrigger> <Link href={href} className='  font-normal whitespace-nowrap'> {label}</Link></MenubarTrigger>
                </MenubarMenu>
            
            )
          })
        )
         
     }
   
   {
        (session?.role === UserType.EMPLOYER ||  session) && (
        
          StudentLogedInNavbar.map(({ label, href }) => {
            return (
            
                <MenubarMenu key={label}>
                  <MenubarTrigger> <Link href={href} className=' whitespace-nowrap'> {label}</Link></MenubarTrigger>
                </MenubarMenu>
            
            )
          })
        
        )
   }
      
      
   
   
   
      </div>
   
      
  </Menubar>  
    )
  }
  
  export default Navbar
  