'use client'

import Signup from "@/components/auth/Signup";
import Image from "next/image";
import Link from "next/link";
import { TbBrandGoogleHome } from "react-icons/tb";
import { RiUser3Line } from "react-icons/ri";

 
 
export default function Page() {
  return   <div className="flex items-center justify-center h-screen bg-blue-500/20     w-full">
 
  
 
 <div className=" md:flex  justify-center items-center md:rounded-tr-[80px]    shadow-md bg-white px-0  w-full md:w-[900px] md:rounded-bl-[80px]  md:justify-between  overflow-hidden    ">
  <div className=" w-full md:w-[850px]  relative  overflow-hidden h-[500px]">
    <div className="   absolute bg-blue-400 shadow-md p-2  cursor-pointer text-white"><Link href={"/"}><TbBrandGoogleHome />
    </Link></div>
   <Image height={400} width={500}  src={"/loginbgg.jpeg"} alt={"img"}  className="p-1 h-full w-full   object-cover" />
  </div> 
  <div className=" w-full">
    
 <Signup/>
  </div>
 </div>
  
  </div> 
}