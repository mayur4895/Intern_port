import { auth } from '@/auth';
import MainNavbar from '@/components/Navbar/Student/MainNavbar'
import React from 'react'

const Studentlayout = async({children}:{children:React.ReactNode}) => {
  const session = await auth();
  return (
     <div>
      
    <MainNavbar session={session}/>
    <div className='py-20'>
      {children}
    </div>
     </div>
  )
}

export default Studentlayout
