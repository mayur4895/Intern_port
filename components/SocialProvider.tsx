"use client";
import React from "react";

import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { Separator } from "./ui/separator";

import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
const SocialProvider = () => {
  const SearchParams = useSearchParams();
  const urlError = SearchParams.get("error") === "OAuthAccountNotLinked";
  const { toast } = useToast();
  const router = useRouter();



  const onclick = async (provider: string) => {
    const res = await signIn(provider, {
      callbackUrl: "/",
    });
    if (urlError) {
      toast({
        variant: "destructive",
        title: "Email alerday in used",
      });
    }
    if (res?.error) {
      toast({
        variant: "destructive",
        title: res?.error,
      });
      router.refresh();
    }
  };

  return (
    <div className="w-full items-center flex flex-col gap-3">
      <span className="flex  w-fit  whitespace-nowrap items-center justify-center text-sm gap-5 text-zinc-500">
        {" "}
        <Separator /> Or Sign in with <Separator />{" "}
      </span>
      <div className="flex  justify-center gap-3 w-full">
        <Button
          onClick={() => {
            onclick("google");
          }}
          variant={"outline"}
          className="flex items-center gap-2 w-full text-gray-500 h-12">
          <FcGoogle size={25} />
          Google
        </Button>

        <Button
          onClick={() => {
            onclick("github");
          }}
          variant={"outline"}
          className="flex items-center gap-2 w-full text-gray-500 h-12">
          <AiFillGithub size={25} />
          Github
        </Button>
      </div>
    </div>
  );
};

export default SocialProvider;
