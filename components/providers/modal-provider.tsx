'use client'

import { useEffect, useState } from "react"
import DeletePost from "../modal/delete-post"
 
 
 
 
 
  

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
    </>)
}

export default ModalProvider;