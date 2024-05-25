import { auth } from '@/auth'; 
import { UserType } from '@prisma/client'; 
import { redirect } from 'next/navigation';
import React from 'react'

const Employerpage = async() => {

  const session = await  auth();

  console.log(session?.user.role as UserType !== "EMPLOYER");

  if(session?.user.role as UserType !== "EMPLOYER"){
    return redirect("/");
  }
  
  return (
    <div>
      PRofilePage 
    </div>
  )
}

export default Employerpage
