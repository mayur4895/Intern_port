 
import { auth } from '@/auth';
import MainNavbar from '@/components/Navbar/Employer/MainNavbar'
import React from 'react'

const HireTalentLayout = async({children}:{children:React.ReactNode}) => {
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

export default HireTalentLayout
