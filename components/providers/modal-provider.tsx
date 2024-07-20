'use client'

import { useEffect, useState } from "react"
import DeletePost from "../modal/delete-post"
import ApplyPost from "../modal/apply-post"
import DeleteApplication from "../modal/delete-appliction"
 
 
 
 
 
  

const ModalProvider = ()=>{

const [isMounted,setisMounted] = useState(false)


useEffect(()=>{
setisMounted(true);
},[setisMounted])

if(!isMounted){
    return null
}

    return(<>
    <DeletePost/> 
    <ApplyPost/>
    <DeleteApplication/>
    </>)
}

export default ModalProvider;