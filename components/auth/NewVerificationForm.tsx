'use client'
import React, { useCallback, useEffect, useState } from 'react'
import {BeatLoader} from "react-spinners"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from '../ui/button'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { db } from '@/lib/db'
import { NewVerification } from '@/actions/newVerification'
import { useToast } from '../ui/use-toast'
  
const NewVerificationForm = () => {

const  {toast} = useToast();
 const searchParam = useSearchParams();
const token = searchParam.get("token")
const [Error,setError] = useState("");

const [Success,setSuccess] = useState("");
 const onSubmit = useCallback(()=>{
  if(Success || Error) {
    return;
  }

  if(!token){
   return  setError("Token Does not Exist")
  }
   NewVerification(token).then((data)=>{
    if(data.success){ 
       console.log(data);
       
      return  setSuccess(data.success)
    }
    if(data.error){
      return  setError(data.error)
    }
    
  }).catch((error)=>{
    return setError("something went wrong")
  })

 },[token,setError,setSuccess])
    


 useEffect(() => {
onSubmit();
 },[onSubmit])
    
  return (
    <div className=' flex justify-center items-center   min-h-screen'>
<Card className='w-full text-center'>
  <CardHeader>
    <CardTitle className='text-2xl'>Confirming Your Email</CardTitle>
    <CardDescription>wait for confirming your verification</CardDescription>
  </CardHeader>
  <CardContent>
    <div className='flex  flex-col justify-center items-center'>
 {
   !Error && !Success && ( 
      <BeatLoader size={10} color={'#000000'} loading={true} /> 
)}

   <div className='p-2 bg-green-300 border-green-500 border w-full'>{Success}</div>

   {!Success && (
     <div className='p-2 bg-red-300 border-red-500 border w-full'>{Error}</div> 

   )}
    </div>
  </CardContent>
  <CardFooter className='text-center flex flex-col justify-center' > 
    <Link href={"/auth/login"}>
    <Button  onClick={()=>{ }}>Back To Login</Button></Link>
  </CardFooter>
</Card>

     </div>
  )
}

export default NewVerificationForm
