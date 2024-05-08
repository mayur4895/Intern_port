import Banner from "@/components/Banner";
import MainNavbar from "@/components/MainNavbar";
 
import Container from "@/components/ui/container";
import Image from "next/image";

export default function Home() {
  return (
 <Container>
  <MainNavbar/>
  <Banner/>
 </Container>
  )
}