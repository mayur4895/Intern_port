// Home.js
import React  from 'react';
import { auth } from "@/auth";

import Banner from "@/components/Banner";
import MainNavbar from "@/components/Navbar/Student/MainNavbar";
import Footer from "@/components/ui/footer";
import { UserType } from "@prisma/client";
import { redirect } from "next/navigation";
import ContactUs from '@/components/main/contactUs';
import { MovingCards } from '@/components/ui/infinite-scroll-cards';
 
 
 

export default async function Home() {
  const currentUser = await auth();

 
    if(currentUser?.user?.role  === UserType.STUDENT){
      return redirect("/student/dashboard")
    } else if( currentUser?.user?.role === UserType.EMPLOYER){
      return  redirect("/hire-talent/profile")
    }
 

  return (
    <>
       <MainNavbar session={currentUser?.user} />  
  
    <div className="flex flex-col   gap-4  ">
     
      <Banner/>  
      <div className="flex-grow gap-4    flex flex-col w-full">  
         
   <ContactUs/>
      </div>
    
    </div>
 
    <Footer/>
    </>
  )
}
