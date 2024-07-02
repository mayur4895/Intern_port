"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import Link from "next/link";
import Navbar from "./Navbar";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"; 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLoginType } from "@/hooks/use-logintype";
import { signOut } from "next-auth/react";
import { IoEllipsisVertical } from "react-icons/io5";
import { Separator } from "@/components/ui/separator";
import { UserType } from "@prisma/client";
import { CiMenuBurger } from "react-icons/ci";
interface MainNavbarProps {
  session?: any;
}

const MainNavbar = ({ session }: MainNavbarProps) => {


 
 
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

  const { onSetType } = useLoginType();

  return (
    <div className="flex items-center  w-full z-50">
      <div className="flex w-full items-center border-b shadow-sm  bg-white  pl-4 md:px-4 ">
        <div className="font-bold tracking-wider">
          <Link href={"/"}>HireIntern</Link>
        </div>
        <div className="flex   ml-auto flex-row">       
             <div className="  w-full ml-auto ">
          <Navbar session={session}  />
        </div>

        <Menubar>
          <MenubarMenu>
            <MenubarTrigger asChild>
              <Sheet>
               {   <SheetTrigger asChild className={     `  hidden  ${!session?.role ? "hidden " : " lg:block  cursor-pointer border-2 hover:border-blue-400 transition"}`   }>
                   <Avatar>
                      <AvatarImage src={session?.image} />
                      <AvatarFallback>
                        <div className=" shadow h-10 bg-stone-300  text-xl font-semibold w-10 rounded-full flex justify-center items-center">
                          {session?.name[0]}
                        </div> 
                      </AvatarFallback>
                    </Avatar> 
                </SheetTrigger>
              
                }


                {
                 <SheetTrigger asChild  className="lg:hidden pr-2 cursor-pointer">
                    <CiMenuBurger size={30} className=""/>
               </SheetTrigger>
                }
                <SheetContent>
   <SheetHeader>
     <SheetTitle className=' flex flex-col mt-4 text-base pl-2  items-start justify-start'> 
            <h2 className=' uppercase'>{session?.name}</h2>
            <span  className='text-sm font-normal  text-gray-700'>{session?.email}</span>
      </SheetTitle>
<Separator/>
 
   </SheetHeader>
                  <div className="flex flex-col gap-y-3  mt-2">
                 <div className="lg:hidden">
                 {
      (session?.role !== UserType.EMPLOYER && !session ) && (
        Navbars.map(({ label, href }) => {
          return (
          
              <MenubarMenu key={label}>
                <MenubarTrigger> <Link href={href} className='font-normal whitespace-nowrap'> {label}</Link></MenubarTrigger>
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
                <MenubarTrigger> <Link href={href} className=' font-normal whitespace-nowrap'> {label}</Link></MenubarTrigger>
              </MenubarMenu>
          
          )
        })
      
      )
 }
    
                 </div>
              <Separator className="lg:hidden"/>  
                    {!session && (
                      <div className="flex flex-col  ml-4   items-start  justify-start gap-4">
                        <Link
                          href={"/auth/employer/login"}
                          className="text-sm font-normal text-black   hover:text-blue-500"
                          onClick={() => {
                            onSetType("employer");
                          }}>
                          {" "} 
                          Login{" "}
                        </Link>

                        <Link
                          href={"/auth/signup"}
                          className="text-sm font-normal text-black  hover:text-blue-500">
                          {" "}
                          Candident Sign-up{" "}
                        </Link>

                        <Link
                          href={"/signup"}
                          className="text-sm font-normal text-black   hover:text-blue-500">
                          {" "}
                          Employer Sign-up{" "}
                        </Link>
                      </div>
                    )}

                    {session && (
                      <div className="flex flex-col    items-start  justify-start gap-4">
                        <Button
                          type="submit"
                          variant={"link"}
                          className=" font-normal"
                          onClick={() => {
                            signOut();
                          }}>
                          Logout
                        </Button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </MenubarTrigger>
          </MenubarMenu>
        </Menubar>
      </div>

      
      {!session && (
        <>
          <div className="lg:flex hidden flex-row  ml-5  gap-x-4  ">
            <Link
              href={"/auth/login"}
              onClick={() => {
                onSetType("employer");
              }}>
              {" "}
              <Button>Login</Button>{" "}
            </Link>
          </div>
        </>
      )}
      </div>

 
    </div>
  );
};

export default  MainNavbar ;
 