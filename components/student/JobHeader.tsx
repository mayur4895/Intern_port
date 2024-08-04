import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const JobHeader = () => {
  return (
    <div className=' bg-white shadow-sm border p-2'>
           <div className=' flex items-center gap-2'>
           <Input type="text" placeholder="Search by title, company or keyword" />
           <Button>Search</Button>
           </div>
    </div>
  )
}

export default JobHeader
