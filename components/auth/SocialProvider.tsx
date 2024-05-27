"use client";
import React, { useState } from "react";

import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { Separator } from "../ui/separator";
  
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react"; 
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
const SocialProvider = () => {
  const SearchParams = useSearchParams();
  const urlError =  SearchParams.get("error") === "OAuthAccountNotLinked";
  const { toast } = useToast();
  const router = useRouter();
  const [isLoding,setisLoding] = useState(false);
 
  const onclick = async( provider:string)=>{
    try {
      setisLoding(true)
    await signIn(provider,{
      callbackUrl:"/student/dashboard"
    });
    } catch (error) {
      setisLoding(false);
    }finally{
      setisLoding(true)
     
    }
 } 

  return (
    <div className="w-full items-center flex flex-col gap-3">
   {isLoding ?   <div className=" fixed top-0 left-0 w-full h-full bg-white/85 "> 
   <div className=" flex items-center justify-center h-full w-full"> 
   <Loader2 size={25} className=" animate-spin"/> </div>
   </div>:  null}
   <span className="flex  whitespace-nowrap items-center justify-center text-sm gap-5 text-zinc-500"> <Separator/> Or Sign in with  <Separator/>  </span>
              <div className="flex  justify-center gap-3 w-full">
                <Button onClick={()=>{onclick('google')}} variant={"outline"} className="flex items-center gap-2 w-full text-gray-500 h-12">
                  <FcGoogle size={25}/>Google
                </Button>

                <Button onClick={()=>{onclick('github')}} variant={"outline"} className="flex items-center gap-2 w-full text-gray-500 h-12">
                  <AiFillGithub size={25}/>Github
                </Button>
 
              
      </div>
    </div>
  );
};

export default SocialProvider;
