'use client'
import React from 'react'

const Container = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='max-w-10xl md:max-w-screen-lg lg:max-w-screen-xl sm:max-w-screen-sm m-auto sm:mx-3'>
      {children}
    </div>
  )
}

export default Container
