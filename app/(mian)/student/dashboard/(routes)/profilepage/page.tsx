import StudentProfilePage from '@/components/student/StudentProfilePage'
import { CurrentUser } from '@/hooks/use-current-user'
import React from 'react'

const ProfilePage = () => {

  
  return (
    <div className='py-2'>
        <StudentProfilePage/>
    </div>
  )
}

export default ProfilePage
