import { auth } from "@/auth";
import { AuroraBackgrounMain } from "@/components/AuroraBackground";
import Banner from "@/components/Banner";
import MainNavbar from "@/components/Navbar/Student/MainNavbar";
import Navbar from "@/components/Navbar/Student/Navbar";
 
 
import Container from "@/components/ui/container";
import Image from "next/image";
import { redirect } from "next/navigation";
 
 

export default async function Home() {
 

  const session = await auth();
  if(session){
    return redirect ("/student/dashboard");
  }

 
  return (
     <div>
      
    <MainNavbar session={session}/>
 <Container>  
    <AuroraBackgrounMain >
  <Banner/>
  </AuroraBackgrounMain>
 </Container>
    </div>
  )
}