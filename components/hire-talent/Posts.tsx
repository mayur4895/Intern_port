'use client';

import { Badge } from "@/components/ui/badge";
 import { File, ListFilter, Loader2, MoreHorizontal, PlusCircle } from 'lucide-react';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCompanyPosts } from "@/hooks/use-company-posts";
import InternshipResponsibilities from "./MarkupContent";
import MarkupContent from "./MarkupContent";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Image from "next/image";
import { FaRegBuilding, FaSuitcase } from "react-icons/fa";
import { CurrentUser } from "@/hooks/use-current-user";
import { BsCheck2All } from "react-icons/bs";
import { Separator } from "../ui/separator";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button";
import PostsTable from "@/app/posts/page";
const Posts = () => {
 
 
 
  return (
    <div>
      <PostsTable/>
    </div>
  //   <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
  //   <Tabs defaultValue="all">
  //     <div className="flex items-center">
  //       <TabsList>
  //         <TabsTrigger value="all">All</TabsTrigger>
  //         <TabsTrigger value="active">Active</TabsTrigger>
  //         <TabsTrigger value="draft">Draft</TabsTrigger>
  //         <TabsTrigger value="archived" className="hidden sm:flex">
  //           Archived
  //         </TabsTrigger>
  //       </TabsList>
  //       <div className="ml-auto flex items-center gap-2">
  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button variant="outline" size="sm" className="h-8 gap-1">
  //               <ListFilter className="h-3.5 w-3.5" />
  //               <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
  //                 Filter
  //               </span>
  //             </Button>
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent align="end">
  //             <DropdownMenuLabel>Filter by</DropdownMenuLabel>
  //             <DropdownMenuSeparator />
  //             <DropdownMenuCheckboxItem checked>
  //               Active
  //             </DropdownMenuCheckboxItem>
  //             <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
  //             <DropdownMenuCheckboxItem>
  //               Archived
  //             </DropdownMenuCheckboxItem>
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //         <Button size="sm" variant="outline" className="h-8 gap-1">
  //           <File className="h-3.5 w-3.5" />
  //           <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
  //             Export
  //           </span>
  //         </Button>
  //         <Button size="sm" className="h-8 gap-1">
  //           <PlusCircle className="h-3.5 w-3.5" />
  //           <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
  //             Add Product
  //           </span>
  //         </Button>
  //       </div>
  //     </div>
  //     <TabsContent value="all">
  //       <Card x-chunk="dashboard-06-chunk-0">
  //         <CardHeader>
  //           <CardTitle>Posts</CardTitle>
  //           <CardDescription>
  //             Manage your Posts and view their applicants.
  //           </CardDescription>
  //         </CardHeader>
  //         <CardContent>
  //           <Table>
  //             <TableHeader>
  //               <TableRow>
  //                 <TableHead className="hidden w-[100px] sm:table-cell">
  //                   <span className="sr-only">Image</span>
  //                 </TableHead>
  //                 <TableHead>Company Name</TableHead>
  //                 <TableHead>Status</TableHead>
                 
  //                 <TableHead className="hidden md:table-cell">
  //                   Total Applications
  //                 </TableHead>
  //                 <TableHead className="hidden md:table-cell">
  //                   Created at
  //                 </TableHead>
  //                 <TableHead>
  //                   <span className="sr-only">Actions</span>
  //                 </TableHead>
  //               </TableRow>
  //             </TableHeader>
  //             <TableBody>
  //               <TableRow>
  //                 <TableCell className="hidden sm:table-cell">
                    // <Image
                    //   alt="Product image"
                    //   className="aspect-square rounded-md object-cover"
                    //   height="64"
                    //   src="/placeholder.svg"
                    //   width="64"
                    // />
  //                 </TableCell>
  //                 <TableCell className="font-medium">
  //                   Laser Lemonade Machine
  //                 </TableCell>
  //                 <TableCell>
  //                   <Badge variant="outline">Draft</Badge>
  //                 </TableCell>
              
  //                 <TableCell className="hidden md:table-cell">
  //                   25
  //                 </TableCell>
  //                 <TableCell className="hidden md:table-cell">
  //                   2023-07-12 10:42 AM
  //                 </TableCell>
  //                 <TableCell>
  //                   <DropdownMenu>
  //                     <DropdownMenuTrigger asChild>
  //                       <Button
  //                         aria-haspopup="true"
  //                         size="icon"
  //                         variant="ghost"
  //                       >
  //                         <MoreHorizontal className="h-4 w-4" />
  //                         <span className="sr-only">Toggle menu</span>
  //                       </Button>
  //                     </DropdownMenuTrigger>
  //                     <DropdownMenuContent align="end">
  //                       <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //                       <DropdownMenuItem>Edit</DropdownMenuItem>
  //                       <DropdownMenuItem>Delete</DropdownMenuItem>
  //                     </DropdownMenuContent>
  //                   </DropdownMenu>
  //                 </TableCell>
  //               </TableRow>
  //               <TableRow>
  //                 <TableCell className="hidden sm:table-cell">
  //                   <Image
  //                     alt="Product image"
  //                     className="aspect-square rounded-md object-cover"
  //                     height="64"
  //                     src="/placeholder.svg"
  //                     width="64"
  //                   />
  //                 </TableCell>
  //                 <TableCell className="font-medium">
  //                   Hypernova Headphones
  //                 </TableCell>
  //                 <TableCell>
  //                   <Badge variant="outline">Active</Badge>
  //                 </TableCell>
                 
  //                 <TableCell className="hidden md:table-cell">
  //                   100
  //                 </TableCell>
  //                 <TableCell className="hidden md:table-cell">
  //                   2023-10-18 03:21 PM
  //                 </TableCell>
  //                 <TableCell>
  //                   <DropdownMenu>
  //                     <DropdownMenuTrigger asChild>
  //                       <Button
  //                         aria-haspopup="true"
  //                         size="icon"
  //                         variant="ghost"
  //                       >
  //                         <MoreHorizontal className="h-4 w-4" />
  //                         <span className="sr-only">Toggle menu</span>
  //                       </Button>
  //                     </DropdownMenuTrigger>
  //                     <DropdownMenuContent align="end">
  //                       <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //                       <DropdownMenuItem>Edit</DropdownMenuItem>
  //                       <DropdownMenuItem>Delete</DropdownMenuItem>
  //                     </DropdownMenuContent>
  //                   </DropdownMenu>
  //                 </TableCell>
  //               </TableRow>
  //               <TableRow>
  //                 <TableCell className="hidden sm:table-cell">
  //                   <Image
  //                     alt="Product image"
  //                     className="aspect-square rounded-md object-cover"
  //                     height="64"
  //                     src="/placeholder.svg"
  //                     width="64"
  //                   />
  //                 </TableCell>
  //                 <TableCell className="font-medium">
  //                   AeroGlow Desk Lamp
  //                 </TableCell>
  //                 <TableCell>
  //                   <Badge variant="outline">Active</Badge>
  //                 </TableCell>
               
  //                 <TableCell className="hidden md:table-cell">
  //                   50
  //                 </TableCell>
  //                 <TableCell className="hidden md:table-cell">
  //                   2023-11-29 08:15 AM
  //                 </TableCell>
  //                 <TableCell>
  //                   <DropdownMenu>
  //                     <DropdownMenuTrigger asChild>
  //                       <Button
  //                         aria-haspopup="true"
  //                         size="icon"
  //                         variant="ghost"
  //                       >
  //                         <MoreHorizontal className="h-4 w-4" />
  //                         <span className="sr-only">Toggle menu</span>
  //                       </Button>
  //                     </DropdownMenuTrigger>
  //                     <DropdownMenuContent align="end">
  //                       <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //                       <DropdownMenuItem>Edit</DropdownMenuItem>
  //                       <DropdownMenuItem>Delete</DropdownMenuItem>
  //                     </DropdownMenuContent>
  //                   </DropdownMenu>
  //                 </TableCell>
  //               </TableRow>
  //               <TableRow>
  //                 <TableCell className="hidden sm:table-cell">
  //                   <Image
  //                     alt="Product image"
  //                     className="aspect-square rounded-md object-cover"
  //                     height="64"
  //                     src="/placeholder.svg"
  //                     width="64"
  //                   />
  //                 </TableCell>
  //                 <TableCell className="font-medium">
  //                   TechTonic Energy Drink
  //                 </TableCell>
  //                 <TableCell>
  //                   <Badge variant="secondary">Draft</Badge>
  //                 </TableCell>
 
  //                 <TableCell className="hidden md:table-cell">
  //                   0
  //                 </TableCell>
  //                 <TableCell className="hidden md:table-cell">
  //                   2023-12-25 11:59 PM
  //                 </TableCell>
  //                 <TableCell>
  //                   <DropdownMenu>
  //                     <DropdownMenuTrigger asChild>
  //                       <Button
  //                         aria-haspopup="true"
  //                         size="icon"
  //                         variant="ghost"
  //                       >
  //                         <MoreHorizontal className="h-4 w-4" />
  //                         <span className="sr-only">Toggle menu</span>
  //                       </Button>
  //                     </DropdownMenuTrigger>
  //                     <DropdownMenuContent align="end">
  //                       <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //                       <DropdownMenuItem>Edit</DropdownMenuItem>
  //                       <DropdownMenuItem>Delete</DropdownMenuItem>
  //                     </DropdownMenuContent>
  //                   </DropdownMenu>
  //                 </TableCell>
  //               </TableRow>
  //               <TableRow>
  //                 <TableCell className="hidden sm:table-cell">
  //                   <Image
  //                     alt="Product image"
  //                     className="aspect-square rounded-md object-cover"
  //                     height="64"
  //                     src="/placeholder.svg"
  //                     width="64"
  //                   />
  //                 </TableCell>
  //                 <TableCell className="font-medium">
  //                   Gamer Gear Pro Controller
  //                 </TableCell>
  //                 <TableCell>
  //                   <Badge variant="outline">Active</Badge>
  //                 </TableCell>
  
  //                 <TableCell className="hidden md:table-cell">
  //                   75
  //                 </TableCell>
  //                 <TableCell className="hidden md:table-cell">
  //                   2024-01-01 12:00 AM
  //                 </TableCell>
  //                 <TableCell>
  //                   <DropdownMenu>
  //                     <DropdownMenuTrigger asChild>
  //                       <Button
  //                         aria-haspopup="true"
  //                         size="icon"
  //                         variant="ghost"
  //                       >
  //                         <MoreHorizontal className="h-4 w-4" />
  //                         <span className="sr-only">Toggle menu</span>
  //                       </Button>
  //                     </DropdownMenuTrigger>
  //                     <DropdownMenuContent align="end">
  //                       <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //                       <DropdownMenuItem>Edit</DropdownMenuItem>
  //                       <DropdownMenuItem>Delete</DropdownMenuItem>
  //                     </DropdownMenuContent>
  //                   </DropdownMenu>
  //                 </TableCell>
  //               </TableRow>
  //               <TableRow>
  //                 <TableCell className="hidden sm:table-cell">
  //                   <Image
  //                     alt="Product image"
  //                     className="aspect-square rounded-md object-cover"
  //                     height="64"
  //                     src="/placeholder.svg"
  //                     width="64"
  //                   />
  //                 </TableCell>
  //                 <TableCell className="font-medium">
  //                   Luminous VR Headset
  //                 </TableCell>
  //                 <TableCell>
  //                   <Badge variant="outline">Active</Badge>
  //                 </TableCell>
                 
  //                 <TableCell className="hidden md:table-cell">
  //                   30
  //                 </TableCell>
  //                 <TableCell className="hidden md:table-cell">
  //                   2024-02-14 02:14 PM
  //                 </TableCell>
  //                 <TableCell>
  //                   <DropdownMenu>
  //                     <DropdownMenuTrigger asChild>
  //                       <Button
  //                         aria-haspopup="true"
  //                         size="icon"
  //                         variant="ghost"
  //                       >
  //                         <MoreHorizontal className="h-4 w-4" />
  //                         <span className="sr-only">Toggle menu</span>
  //                       </Button>
  //                     </DropdownMenuTrigger>
  //                     <DropdownMenuContent align="end">
  //                       <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //                       <DropdownMenuItem>Edit</DropdownMenuItem>
  //                       <DropdownMenuItem>Delete</DropdownMenuItem>
  //                     </DropdownMenuContent>
  //                   </DropdownMenu>
  //                 </TableCell>
  //               </TableRow>
  //             </TableBody>
  //           </Table>
  //         </CardContent>
  //         <CardFooter>
  //           <div className="text-xs text-muted-foreground">
  //             Showing <strong>1-10</strong> of <strong>32</strong>{" "}
  //             Posts
  //           </div>
  //         </CardFooter>
  //       </Card>
  //     </TabsContent>
  //   </Tabs>
  // </main>
    // <div>
    //   <div className='mt-5 flex flex-col gap-3'>
    //     <h3 className='text-xl'>Your Posts</h3>
    //     <div className='flex flex-col gap-3'>
    //       {Posts?.map((post, index) => (
            
    //         <Card key={post.id}>
    //           <CardHeader>
    //             <CardTitle className='text-xl   flex flex-col gap-4'>  
    //               {post?.companyLogo &&  <span className=" flex items-center gap-2"><Image src={post?.companyLogo} alt="logo" height={45} width={45}/> Spotify</span>}
    //               {post.internshipProfile}  </CardTitle>
    //               <div className="flex h-5 items-center text-gray-500 space-x-4 text-sm">
    //     <div>{post.partOrFullTime} </div>
    //     <Separator orientation="vertical"  className=" bg-gray-500"/>
    //     <div>{
                  
    //               post.cities.map((city, index)=>{
    //                return (<div>
    //                  {city}
    //                </div>)
    //               })
    //                 } </div>
    //     <Separator orientation="vertical"  className=" bg-gray-500"/>
    //     <div>{post?.noOfOpenings} </div>
    //   </div>
                   
                    
 
                
          
                   
 
                
    //               <span className='flex text-sm items-center gap-2 text-gray-500'><FaRegBuilding size={15}/> {currentUser?.companyDetails?.employees} Employees </span>
    //               <span className="text-sm text-gray-500 flex items-center gap-2"><FaSuitcase size={15}/> {post.internshipType}</span>
             
    //               <div className=" flex items-center text-sm gap-2 text-gray-500">   
    //               <BsCheck2All size={22}/>skills
    //             <span className='flex-auto gap-2 text-gray-500'>    
             
    //               {
    //               post?.requiredSkills?.map((skill, skillIndex) => (
    //                 <Badge key={skillIndex} className="ml-2 border px-4 py-1 border-gray-700 text-gray-600 pointer-events-none bg-slate-400/30">{skill}</Badge>
    //               ))
    //             }</span>
    //             </div>
                
    //             <MarkupContent className='text-gray-600' content={post.whoCanApply} />
    //             <MarkupContent className='text-gray-600'  content={post.internResponsibilities} />
    //             <MarkupContent className='text-gray-600' content={post.additionalPreferences} />
    //           </CardHeader>
    //           <CardContent className="flex flex-col gap-2">
  
           
           
    //           </CardContent>
    //           <CardFooter>
            
    //           </CardFooter>
    //         </Card>
    //       ))}
    //     </div>
    //   </div>
    // </div>
  );
}

export default Posts;
