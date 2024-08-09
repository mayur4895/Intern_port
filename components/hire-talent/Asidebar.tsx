'use client'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Home, Building2, LineChart, Package, Settings } from 'lucide-react'
import { FaPlusCircle } from 'react-icons/fa'
import { usePathname } from 'next/navigation'

const Asidebar = () => {
 
  const  pathname  =  usePathname();

  const isActive = (path:any) => pathname === path

  return (
    <div>
      <aside className="fixed inset-y-0 left-0 z-10 hidden md:w-52 flex-col border-r  bg-gradient-to-tr from-blue-600 to-blue-400 text-white lg:flex">
        <nav className="flex flex-col items-start gap-5 w-full sm:py-5   ">
          <Link href="#"
           
              className={`group flex shrink-0 gap-2 p-2 text-sm font-semibold md:text-base ${
                isActive('#') ? '  text-black' : ''
              }`}
            >
              <Building2 className="h-4 w-4 transition-all group-hover:scale-110" />
              <span>Modern</span>
              {isActive('#') && (
                <div className="top-[1.8px] right-0 absolute bg-blue-100 h-8 w-[2px]" />
              )}
      
          </Link>

          <Link href="/hire-talent/dashboard" 
            
              className={`text-sm flex items-end gap-2 p-2 w-full relative  ${
                isActive('/hire-talent/dashboard') ? ' overflow-hidden bg-gradient-to-r from-blue-500 to-blue-200   text-white' : ''
              }`}
            >
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
              {isActive('/hire-talent/dashboard') && (
                <div className="top-0 right-0 absolute bg-white  h-10 w-[3px]" />
              )}
          
          </Link>

          <Link href="/hire-talent/dashboard/new-post"
           
              className={`text-sm flex items-end gap-2 w-full relative p-2 ${
                isActive('/hire-talent/dashboard/new-post') ? ' overflow-hidden bg-gradient-to-r from-blue-500 to-blue-200   text-white' : ''
              }`}
            >
              <FaPlusCircle className="h-5 w-5" />
              <span>Create post</span>
              {isActive('/hire-talent/dashboard/new-post') && (
                <div className="top-[1.8px] right-0 absolute bg-blue-100 h-8 w-[2px]" />
              )}
        
          </Link>

          <Link href="/hire-talent/dashboard/posts"
       
              className={`text-sm flex items-end gap-2 w-full relative p-2 ${
                isActive('/hire-talent/dashboard/posts') ?  ' overflow-hidden bg-gradient-to-r from-blue-500 to-blue-200   text-white' : ''
              }`}
            >
              <Package className="h-5 w-5" />
              <span>View Posts</span>
              {isActive('/hire-talent/dashboard/posts') && (
                <div className="top-[1.8px] right-0 absolute bg-blue-100 h-8 w-[2px]" />
              )}
           
          </Link>

          <Link href="#"
           
              className={`text-sm flex items-end gap-2  w-full relative p-2${
                isActive('#charts') ?  ' overflow-hidden bg-gradient-to-r from-blue-500 to-blue-200   text-white' : ''
              }`}
            >
              <LineChart className="h-5 w-5" />
              <span>Charts</span>
              {isActive('#charts') && (
                <div className="top-[1.8px] right-0 absolute bg-blue-100 h-8 w-[2px]" />
              )}
      
          </Link>
        </nav>
        <nav className="mt-auto flex flex-col items-start gap-4 px-2 sm:py-5">
          <Link href="#"
       
              className={`text-sm flex items-end gap-2 w-full relative p-2${
                isActive('#settings') ? ' overflow-hidden bg-gradient-to-r from-blue-500 to-blue-200   text-white' : ''
              }`}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
              {isActive('#settings') && (
                <div className="top-[1.8px] right-0 absolute bg-blue-100 h-8 w-[2px]" />
              )}
     
          </Link>
        </nav>
      </aside>
    </div>
  )
}

export default Asidebar
