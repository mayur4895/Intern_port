'use client'

import Signup from "@/components/auth/Signup";
import Image from "next/image";
import Link from "next/link";
import { TbBrandGoogleHome } from "react-icons/tb";
import { RiUser3Line } from "react-icons/ri";

 
 
export default function Page() {
  return   <div className="flex items-center justify-center h-screen bg-blue-500/10     w-full">
 
  
 
 <div className=" md:grid grid-cols-2  justify-center items-center     shadow-md bg-white px-0  w-full md:w-[900px]      overflow-hidden    ">
  <div className=" w-full  h-full  relative  overflow-hidden   ">
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