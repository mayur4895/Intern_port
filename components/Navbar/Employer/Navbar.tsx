 
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
  



interface NavbarProps{
  session?:any;
}

  const Navbar = ({session}:NavbarProps) => {


    const Navbars = [
       
      {
        label: "Hire For Top Profiles",
    
        profiles:[{
          label: "Web Developer",
          href: "/internships",
        },
      {
        label: "Jobs",
        href: "/jobs",
      }
      ]
    }
    ]

 
    const { onSetType} = useLoginType()
    return (
    
        <Menubar> 
 
    <div className="ml-auto flex items-center ">
    <div className='hidden  lg:flex'>
    {Navbars.map(({ label }) => (
        <MenubarMenu key={label}>
          <MenubarTrigger>  {label}</MenubarTrigger>
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
          <SheetTitle className='font-bold tracking-wider'>  <Link href={"/"}>HireIntern</Link> </SheetTitle>
          <SheetDescription>
            
          </SheetDescription>
        </SheetHeader>
      <div className='flex flex-col gap-y-3'>
      {Navbars.map(({ label }) => (
        <MenubarMenu key={label}>
          <MenubarTrigger>  {label}</MenubarTrigger>
        </MenubarMenu>
      ))}
<Separator/>{
  !session &&  (
<div className="flex flex-col  ml-4   items-start  justify-start gap-4"> 
        <Link href={"/auth/login"} className='text-sm text-black font-semibold hover:text-blue-500' onClick={()=>{onSetType("employer")}}>  Login </Link>
      
        <Link href={"/auth/signup"} className='text-sm text-black font-semibold hover:text-blue-500'>   Candident Sign-up </Link>
        
        <Link href={"/signup"} className='text-sm text-black font-semibold hover:text-blue-500'>   Employer Sign-up </Link>
     </div> )}

     { 
      session &&  
      <div className="flex flex-col    items-start  justify-start gap-4"> 
         
 
         <Button type='submit' onClick={()=>{signOut()}}>Logout</Button>
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
  