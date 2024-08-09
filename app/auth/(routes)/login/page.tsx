"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "@/components/auth/login";
import { useLoginType } from "@/hooks/use-logintype";
import EmployerLogin from "@/components/hire-talent/EmployerLogin";
import { CurrentUser } from "@/hooks/use-current-user";
import { UserType } from "@prisma/client";
import { redirect } from "next/navigation";
import { TbUser, TbUserFilled } from "react-icons/tb";
import { BsBuildingsFill } from "react-icons/bs";
import Image from "next/image";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { MovingCards } from "@/components/ui/infinite-scroll-cards";
import { TfiClose } from "react-icons/tfi";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
const LoginPage = () => {
  const currentUser = CurrentUser();
  const { type } = useLoginType();
  const [ logintype, setlogintype]= useState('student');  

  useEffect(() => {
    if (currentUser && currentUser.role === UserType.EMPLOYER) {
      return redirect("/hire-talent/dashboard");
    } else if (currentUser && currentUser.role === UserType.STUDENT) {
      return redirect("/student/dashboard");
    }
  }, [currentUser]);

  return (
    <div className="md:grid md:grid-cols-2 overflow-hidden    bg-white items-center    h-full w-full">
    <div className=" w-full  h-auto md:h-full  grid   px-4      items-center  overflow-hidden  p-5 ">
         
          <Image
            src="/search-talent.jpg"
            alt="bg"
            height={400}
            width={400}
            className="   "
          />
 
     

    
    </div>

    <div className=" rounded-tr-[50px]">

      <TabsContent
        value="student"
        className=" flex items-center justify-center  flex-col ">
                    <h2>Student login </h2>
        <Login />
      </TabsContent>
      <TabsContent
        value="employer"
        className=" flex items-center justify-center  flex-col ">
          <h2>Employer login </h2>
        <EmployerLogin />
      </TabsContent>
    </div>
  </div>
  );
};

export default LoginPage;
