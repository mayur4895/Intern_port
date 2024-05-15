'use client'
import React from 'react'

const Container = ({children}:{children:React.ReactNode}) => {
  return (
    <div className=' w-full '>
      {children}
    </div>
  )
}

export default Container
