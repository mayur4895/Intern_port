import React from 'react'
import { Button } from '../ui/button';
import { signOut } from 'next-auth/react';

const NavigationDashboard = () => {
  const routesDahbaord = [
    {
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      label: 'Internships',
      href: '/internships',
    },{
      label:'create post',
      href:'/hire-talent/dashboard/new-post'
    },
    {
      label:'view posts',
      href:'/hire-talent/posts'
    }
  ]
  return (
    <div className='flex items-end gap-5'>
        {
          routesDahbaord.map(({ label, href }) => (
            <div key={label}>
              <a href={href}>{label}</a>
            </div>
          ))
        }
           
    </div>
  )
}

export default NavigationDashboard
