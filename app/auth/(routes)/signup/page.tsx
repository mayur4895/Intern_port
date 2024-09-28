'use client'

import Signup from "@/components/auth/Signup";
import Image from "next/image";
import Link from "next/link";
import { TbBrandGoogleHome } from "react-icons/tb";
import { RiUser3Line } from "react-icons/ri";
import { useLoginType } from "@/hooks/use-logintype";
import { CiLogout } from "react-icons/ci";

 
 
export default function Page() {
    const { type } = useLoginType();
  return    ( 
    <div className=' grid  md:grid-cols-2  lg:grid-cols-3  w-full h-screen'>
         
    <div
        defaultValue={type == "employer" ? "employer" : "student"}
        className=' items-center justify-center flex flex-col  w-full  '
         >
          <div className=" flex items-start text-start absolute top-4 right-2"> <Link href={"/"} className=" bg-blue-200 rounded-lg p-2 flex items-center gap-2">  <TbBrandGoogleHome size={22} />
          </Link></div>
        <Signup/>
      </div>

      <div className=' md:block hidden col-span-1  lg:col-span-2 border w-full h-full' >
          <Image src="/loginbg.jpg" alt="login_bg" height={800} width={800} className=' w-full h-full object-cover'/>
        </div>
      </div>

 
)
  
 
}