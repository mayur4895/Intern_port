 
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
import { Button } from "../../ui/button"
import Link from "next/link"
import { HiOutlineMenuAlt1 } from 'react-icons/hi'
import { IoEllipsisVertical } from 'react-icons/io5'
import { Separator } from '../../ui/separator'
import { signOut } from '@/auth'
import { useLoginType } from '@/hooks/use-logintype'
import { UserType } from '@prisma/client'
  



interface NavbarProps{
  session?:any;
 
}

  const Navbar = ({session}:NavbarProps) => {

    const EmployerLogedInNavbar= [
      {
        label:"DashBaord",
        href:"/dashboard"
      },
      {
     label :"Post Internship",
     href:"/post-internship"
      }
    ]
    const Navbars = [
       
      {
        label: "Hire For Top Profiles",
        href:"/top-profiles"
    }
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
                <MenubarTrigger> <Link href={href} className=' whitespace-nowrap'> {label}</Link></MenubarTrigger>
              </MenubarMenu>
          
          )
        })
      )
       
   }
 
 {
      (session?.role === UserType.EMPLOYER ||  session) && (
      
         EmployerLogedInNavbar.map(({ label, href }) => {
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
  