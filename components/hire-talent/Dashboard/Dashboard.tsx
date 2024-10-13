"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  PiClockClockwiseThin,
  PiEye,
  PiEyeThin,
  PiPackageThin,
  PiUsersThin,
} from "react-icons/pi";
import { CiBookmarkCheck, CiEdit, CiLocationOn } from "react-icons/ci";
import { Package } from "lucide-react";
 
import { useGetCompanyPosts } from "@/features/post/api/get-allComapnyPosts";
import { useGetSavedApplicationofPost } from "@/features/application/api/get-saved-application";
import { CurrentUser } from "@/hooks/use-current-user";
import { Skeleton } from "../../ui/skeleton";
import { redirect } from "next/navigation";
import { useGetSelectedApplicationofPost } from "@/features/application/api/get-selected-applications";
import Link from "next/link";
import DaysAgo from "../Post/daysAgo";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Chart } from "./chart";
import { FaGhost } from "react-icons/fa";

export function Dashboard() {
  const currentUser = CurrentUser();

  // Use hooks unconditionally
  const { data: posts, isLoading: postCountLoading } = useGetCompanyPosts();
  const { data: Savedapplications, isLoading: SavedApplicationCountLoading } =
    useGetSavedApplicationofPost(currentUser?.id || "");
  const {
    data: Selectedapplications,
    isLoading: SelectedApplicationCountLoading,
  } = useGetSelectedApplicationofPost(currentUser?.id || "");
 
  if (!currentUser) {
    redirect("/auth/login");
    
  }

  
  return (
    <div className="py-4 px-4 h-full bg-gray-50">
 
      <div className="mt-4 grid gap-4 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-medium">
                {postCountLoading ? (
                  <Skeleton className="h-10 w-10 rounded-md" />
                ) : (
                  posts?.length
                )}
              </CardTitle>
              <CardDescription className="text-nowrap">
                Posted Jobs
              </CardDescription>
            </div>
            <div className="h-12 w-12 bg-blue-50 border-blue-500 border text-blue-600 rounded-full flex items-center justify-center">
              <PiPackageThin size={22} />
            </div>
          </CardHeader>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-medium">
                {SelectedApplicationCountLoading ? (
                  <Skeleton className="h-10 w-10 rounded-md" />
                ) : (
                  Selectedapplications?.length
                )}
              </CardTitle>
              <CardDescription className="text-nowrap">
                Shortlisted
              </CardDescription>
            </div>
            <div className="h-12 w-12 bg-blue-50 border-blue-500 border text-blue-600 rounded-full flex items-center justify-center">
              <CiBookmarkCheck size={22} />
            </div>
          </CardHeader>
        </Card>
 

        <Card className="shadow-sm">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-medium">
                {SavedApplicationCountLoading ? (
                  <Skeleton className="h-10 w-10 rounded-md" />
                ) : (
                  Savedapplications?.length
                )}
              </CardTitle>
              <CardDescription className="text-nowrap">
                Saved Candidate
              </CardDescription>
            </div>
            <div className="h-12 w-12 bg-blue-50 border-blue-500 border text-blue-600 rounded-full flex items-center justify-center">
              <CiEdit size={22} />
            </div>
          </CardHeader>
        </Card>
      </div>
      <div className="grid lg:grid-cols-3 mt-4 gap-4 ">
        <div className="lg:col-span-2">
        <Chart posts={posts || []} />
        </div>
        <div className="w-full h-full">
          <Card className="shadow-sm w-full">
            <CardHeader>
              <CardTitle className=" font-medium">Recent Posts</CardTitle>
            </CardHeader>
            {
              (!posts || posts.length === 0 )  && (<div className="     h-[350px]  flex items-center w-full   justify-center"> 
              <div className=" flex flex-col items-center text-gray-500 gap-2 -translate-y-8">
              <FaGhost  size={42} className=" opacity-65"/>
                pretty empty around here.
              </div>
              
              </div>)
            }

             <ScrollArea className="h-auto  max-h-[495px]  w-full rounded-md border">
              {posts?.slice(0, 5).map((post) => {
                return (
                  <Card  key={post?.id} className=" shadow-none border-none">
                 
                
                      <div>
                        <CardHeader>
                          <CardTitle className=" text-sm flex items-center gap-2">
                            <Avatar>
                              {post?.companyLogo && (
                                <AvatarImage
                                  src={post?.companyLogo}></AvatarImage>
                              )}
                              <AvatarFallback></AvatarFallback>
                            </Avatar>
                            {post?.internshipProfile}
                          </CardTitle>
                          <CardDescription className=" flex flex-wrap items-center gap-3">
                            <span className="  text-xs text-gray-500 flex items-center gap-1">
                             
                              <PiClockClockwiseThin  size={20}/>
                              {post?.createdAt && (
                                <DaysAgo
                                  dateString={post?.createdAt?.toDateString()}
                                />
                              )}
                            </span>
                            <span className="  text-xs text-gray-500 flex items-center gap-1">
                         
                            <PiUsersThin size={20}/>
                              {post?.applications.length} apllications
                            </span>

                            <span className="  text-xs text-gray-500 flex items-center gap-1"> 
                         <CiLocationOn size={20}/>
                           {post?.cities[0]} 
                         </span>
                           
                          </CardDescription>
                        </CardHeader>{" "}
                      </div>
                  
           
                      <Separator className="my-2" />
                    </Card>
               
                );
              })}
              </ScrollArea>
          
          </Card>
        </div>
      </div>
    </div>
  );
}
