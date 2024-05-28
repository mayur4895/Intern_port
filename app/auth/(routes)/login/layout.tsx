import EmptyNavbar from '@/components/Navbar/EmptyNavbar'
import MainNavbar from '@/components/Navbar/Student/MainNavbar'
import React from 'react'

const LoginPagelayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className=' w-full'>
     <EmptyNavbar/>
      {children}
    </div>
  )
}

export default LoginPagelayout
