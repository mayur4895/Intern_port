 'use client'
import React, { useEffect, useState } from 'react'
 
import Link from 'next/link'
import Navbar from './Navbar' 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
 
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
import { signOut } from 'next-auth/react'
import { useLoginType } from '@/hooks/use-logintype'
import { useRouter } from 'next/navigation'
import { logout } from '@/actions/logout'
import { CurrentUser } from '@/hooks/use-current-user'
import { Button } from '@/components/ui/button'
import { Menubar, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { IoEllipsisVertical } from 'react-icons/io5'
import { UserType } from '@prisma/client'
import { CiMenuBurger } from 'react-icons/ci'
import Image from 'next/image'
import { cn } from '@/lib/utils'
 
interface MainNavbarProps{
  session?:any;
}

const MainNavbar =  ({session}:MainNavbarProps) => {
 
 
 

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
  ]

  const { onSetType} = useLoginType()
     

  const [scroll, setscroll] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setscroll(true);
    } else {
      setscroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  
  return (
    <div className={cn('sticky top-0 z-50 transition-shadow bg-white md:rounded-b-3xl border-b', { 'shadow-sm bg-slate-50 border-b-blue-200': scroll })} >
       <div className="flex w-full justify-between  lg:container  px-2">
        <div className='  tracking-wider flex items-center  text-blue-500 text-nowrap gap-2'>
          <Link href={"/"}> 
               HireTalent.
          </Link>
    
          </div>
     <div className='flex ml-auto items-center'>
     <div className='  w-full '>
            <Navbar  session={session}/>
        </div> 
     { !session &&    <>
      <div className="lg:flex hidden flex-row      "> 
 
      <Link href={"/auth/login"}  onClick={()=>{onSetType("student")}}> <Button   variant={"link"} className='font-normal'>Login</Button> </Link>
        <Link href={"/auth/signup"}> <Button variant={"link"}  className='font-normal'>Candidate Sign-up</Button> </Link>
        
        <Link href={"/hire-talent"}> <Button variant={"link"}  className='font-normal'>Employer Sign-up</Button> </Link>
 
     </div>
     </>}
     </div>
     <Menubar>
          <MenubarMenu>
            <MenubarTrigger asChild>
              <Sheet>
               {   <SheetTrigger asChild className={     `     ${!session?.role ? "hidden " : " lg:block  cursor-pointer border-2 hover:border-purple-400 transition"}`   }>
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


                { !session && (
                 <SheetTrigger asChild  className="lg:hidden pr-2 cursor-pointer">
                  <CiMenuBurger size={30} className=""/>
               </SheetTrigger>)
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
                <MenubarTrigger> <Link href={href} className='  whitespace-nowrap'> {label}</Link></MenubarTrigger>
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
                          className="text-sm font-normal text-black   hover:text-purple-500"
                          onClick={() => {
                            onSetType("employer");
                          }}>
                      
                        <Button >   Login </Button>
                        </Link>

                        <Link
                          href={"/auth/signup"}
                          className="text-sm font-normal text-black  hover:text-purple-500">
                           
                          Candidate Sign-up 
                        </Link>

                        <Link
                          href={"/signup"}
                          className="text-sm font-normal text-black   hover:text-purple-500">
                         
                          Employer Sign-up 
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

      
  
      </div>

 
   
  );
};

export default MainNavbar
