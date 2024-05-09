import { AuroraBackgrounMain } from '@/components/AuroraBackground'
import React from 'react'

// const FormLayout = ({children}:{children:React.ReactNode}) => {
//   return (
//     <AuroraBackgrounMain  >
//     <div className=' flex  items-center justify-center    h-[100vh]'>
 
//     {children}
 
//     </div>
//     </AuroraBackgrounMain>
 



const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return ( 
    <AuroraBackgrounMain   >
      <div className="h-full w-full flex items-center justify-center">
      {children}
    </div>
    </AuroraBackgrounMain>
   );
}
 
export default AuthLayout;
