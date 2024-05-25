 
import { auth } from "@/auth";
import { AuroraBackgrounMain } from "@/components/animations/AuroraBackground";
import Banner from "@/components/Banner";
import MainNavbar from "@/components/Navbar/Student/MainNavbar";
import Navbar from "@/components/Navbar/Student/Navbar";
 
 
import Container from "@/components/ui/container";
import { getUserById } from "@/data/user";
import { CurrentUser } from "@/hooks/use-current-user"; 
import { UserType } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
 
 

export default async function Home() {
 

  const session = await  auth();  
 console.log(session?.user.id);



 const  User = await getUserById(session?.user.id);

 if(User){
 if(User.role as UserType === "STUDENT"){
   return redirect("/student/dashboard")
 }
  
 }


 
 
 
  
 
  return (
     <div> 
    <MainNavbar session={session?.user}/>
 <Container>  
    <AuroraBackgrounMain >
  <Banner/>
  </AuroraBackgrounMain>
 </Container>
    </div>
  )
}