import { auth } from "@/auth";
import { AuroraBackgrounMain } from "@/components/AuroraBackground";
import Banner from "@/components/Banner";
 
 
import Container from "@/components/ui/container";
import Image from "next/image";
import { redirect } from "next/navigation";
 
 

export default async function Home() {
 

  const session = await auth();
  if(session){
    return redirect ("/student/dashboard");
  }

  return (
 <Container> 
  
    <AuroraBackgrounMain >
  <Banner/>
  </AuroraBackgrounMain>
 </Container>
  )
}