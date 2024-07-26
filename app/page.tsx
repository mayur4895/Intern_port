// Home.js
import React from 'react';
import { auth } from "@/auth";

import Banner from "@/components/Banner";
import MainNavbar from "@/components/Navbar/Student/MainNavbar";
import Footer from "@/components/ui/footer";
import { UserType } from "@prisma/client";
import { redirect } from "next/navigation";
import ContactUs from '@/components/main/contactUs';
 
 
 

export default async function Home() {
  const currentUser = await auth();

  if(currentUser?.user?.role  === UserType.STUDENT){
    return redirect("/student/dashboard")
  } else if( currentUser?.user?.role === UserType.EMPLOYER){
    return  redirect("/hire-talent/profile")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <MainNavbar session={currentUser?.user} />  
      <Banner/>  
      <div className="flex-grow gap-4  container flex flex-col">
      <div className=' bg-green-500 h-[400px] w-full'> 
                college info
            </div>
   <ContactUs/>
      </div>
      <Footer/>
    </div>
  )
}
