import DashboardHeader from '@/components/hire-talent/DashboardHeader'
import React from 'react'

const DashboardLayout = ({children}:{children:React.ReactNode}) => {
  return (
 <div>
 
 <DashboardHeader/>
 


   <div>
      {children}
    </div>
 </div>
  )
}

export default DashboardLayout
