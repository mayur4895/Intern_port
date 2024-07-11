 'use client'
 
 import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button"
import { Progress } from "../ui/progress"
import { LuPencil } from "react-icons/lu"
import { PiEye, PiEyeThin, PiPackageThin } from "react-icons/pi"
import { CiBookmarkCheck, CiEdit } from "react-icons/ci"
import { Package } from "lucide-react"
import { Chart } from "./Dashboard/chart"
export function Dashboard() {
  return (
  
      
      <div className=" py-4 px-4">
             <h2 className="text-2xl font-medium">Dashboard</h2>
             <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
               
              <Card  className="  shadow-sm"  >
              <CardHeader className=" flex flex-row items-center justify-between">
              <div> 
              <CardTitle className="text-3xl font-medium">08</CardTitle>
              <CardDescription className=" text-nowrap">Posted Jobs</CardDescription>
              </div>
              <div className=" h-12 w-12 bg-slate-200 rounded-full flex items-center justify-center">
              <PiPackageThin   size={22}/> 
                </div>  
                </CardHeader>  
              </Card>
                 
              <Card  className=" shadow-sm">
             <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div>
        
                <CardTitle className="text-3xl font-medium">04</CardTitle>
                <CardDescription className=" text-nowrap">Shortlisted</CardDescription>
                </div>
                <div className=" h-12 w-12 bg-slate-200 rounded-full flex items-center justify-center">
         
                <CiBookmarkCheck  size={22}/>
                </div>  
                </CardHeader>
               
              </Card>
                 
              <Card  className=" shadow-sm">
             <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div>
 
                <CardTitle className="text-3xl font-medium">200</CardTitle>
                <CardDescription className=" text-nowrap">Applications</CardDescription>
                </div>
                <div className=" h-12 w-12 bg-slate-200 rounded-full flex items-center justify-center">
                <PiEyeThin  size={22}/>
                </div>  
                </CardHeader> 
              </Card>
              <Card  className=" shadow-sm">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div>
 
                <CardTitle className="text-3xl font-medium">03</CardTitle>
                <CardDescription className=" text-nowrap">Save Candidate</CardDescription>
                </div>
                <div className=" h-12 w-12 bg-slate-200 rounded-full flex items-center justify-center">
                <CiEdit  size={22}/>
                </div>  
                </CardHeader> 
              </Card>
            </div>
            <div className=" grid md:grid-cols-3 mt-4 gap-4">
 <div className="md:col-span-2">
 <Chart/>
 </div>
<div>
 <Card className=" shadow-sm">
<CardHeader>
  <CardTitle>Recent Posts</CardTitle>
  <CardDescription>View all  recent posts</CardDescription> 
</CardHeader>
 </Card>
</div>
            </div>
      </div>
 
  )
}
