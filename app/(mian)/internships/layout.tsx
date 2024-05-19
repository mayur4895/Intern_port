import { auth } from '@/auth';
import MainNavbar from '@/components/Navbar/Student/MainNavbar'
import React from 'react'

const InternShipPageLayout = async({children}:{children:React.ReactNode}) => {
    const session = await auth();
    return (
       <div>
        
      <MainNavbar session={session}/>
      <div>
    {children}
      </div>
    </div>
  )
}

export default InternShipPageLayout
