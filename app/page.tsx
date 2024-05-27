 
import { auth } from "@/auth";
import { AuroraBackgrounMain } from "@/components/animations/AuroraBackground";
import Banner from "@/components/Banner";
import MainNavbar from "@/components/Navbar/Student/MainNavbar";
import Navbar from "@/components/Navbar/Student/Navbar";
 
 
import Container from "@/components/ui/container";
import { UserType } from "@prisma/client";
import { redirect } from "next/navigation";
 
 
 

export default async function Home() {
 

 
 
  const currentUser = await auth();

if(currentUser?.user?.role  === UserType.STUDENT){
  return redirect("/student/dashboard")
}else if( currentUser?.user?.role === UserType.EMPLOYER){
 return  redirect("/hire-talent/profile")
}
 
  return (
     <div> 
    <MainNavbar session={currentUser?.user} />
 <Container>  
    <AuroraBackgrounMain >
  <Banner/>
  </AuroraBackgrounMain>
 </Container>
    </div>
  )
}