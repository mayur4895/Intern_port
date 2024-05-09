import React from 'react'
import { auth } from '@/auth'
const DashBoard =async() => {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}
    </div>
  )
}

export default DashBoard
