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
    <div className="flex items-center justify-center h-screen w-full   ">
      <div className="   bg-transparent p-5   h-full  container ">
        <Tabs
          defaultValue={type == "employer" ? "employer" : "student"}
          className=" lg:h-[600px]  h-auto top-10   w-full flex flex-col  items-center justify-center">
          <TabsList className="grid grid-cols-2 gap-5 w-[400px]  h-[150px] mb-2  items-center justify-between ">
            <TabsTrigger
              value="student"
              onClick={()=>{setlogintype('student')}}
              className="  text-gray-400 h-[100px] flex flex-col gap-2">
              <TbUserFilled size={22} />
              Student
            </TabsTrigger>
            <TabsTrigger
              value="employer"
              onClick={()=>{setlogintype('employer')}}
              className="text-gray-400 h-[100px] flex flex-col gap-2">
              <BsBuildingsFill size={22} />
              Employer/Company
            </TabsTrigger>
          </TabsList>

          <div className="lg:grid lg:grid-cols-2 overflow-hidden bg-white shadow-md  border rounded-tr-[50px]   lg:rounded-bl-[50px] h-full w-full">
            <div className=" w-full  h-auto md:h-full  grid rounded-bl-[50px] px-4 grid-rows-3 justify-between  bg-gradient-to-br from-blue-500 to-blue-300    overflow-hidden  p-5 ">
              <div className=" row-span-3  w-full  flex-col gap-2 items-start">
                <h2 className={"text-3xl font-semibold px-4 text-white break-words lg:w-full w-[400px]" }>
                     {logintype === "student" ?    <div>Find Your Best Job</div>
                      :  <span>Hire Student Up to 2  Year Experience</span>}
                </h2>
                <div>
                  <Image
                    src="/lbg.png"
                    alt="bgs"
                    height={300}
                    width={300}
                    className="  object-cover"
                  />
                </div>
              </div>

              <div>
               <MovingCards /> 
              </div>
            </div>
            <div className=" rounded-tr-[50px]">
              <TabsContent
                value="student"
                className="  flex items-center justify-center">
                <Login />
              </TabsContent>
              <TabsContent
                value="employer"
                className=" flex items-center justify-center ">
                <EmployerLogin />
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginPage;
