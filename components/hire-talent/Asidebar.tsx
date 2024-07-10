'use client'
import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import Link from 'next/link'
import { Building2, Home, LineChart, Package, Package2, Settings, ShoppingCart, Users2 } from 'lucide-react'
import { FaPlusCircle } from 'react-icons/fa'
const Asidebar = () => {
  return (
    <div>
 <aside className="fixed inset-y-0 left-0 z-10 hidden md:w-48 flex-col border-r bg-background  lg:flex">
        <nav className="flex flex-col items-start gap-5 px-2 sm:py-5">
      
       
       
        <Link
        href="#"
        className="group flex  shrink-0 gap-2   text-sm font-semibold  md:text-base"
      >
        <Building2 className="h-4 w-4 transition-all group-hover:scale-110" />
        <span>Modern </span>
      </Link>
       
              <Link
                href="/hire-talent/dashboard"
             className='text-sm flex item-end gap-2'
              >
                <Home className="h-5 w-5" />
                <span className="">Dashboard</span>
              </Link>
       
 
     
              <Link
                href="/hire-talent/dashboard/new-post"
               className='text-sm flex item-end gap-2'
              >
                <FaPlusCircle className="h-5 w-5" />
                <span className="">Create post</span>
              </Link>
            
           <Link
       href="/hire-talent/dashboard/posts"
                className='text-sm flex item-end gap-2'
              >
                <Package className="h-5 w-5" />
                <span >View Posts</span>
              </Link>
      
              <Link
                href="#"
                className='text-sm flex item-end gap-2'
              >
                <LineChart className="h-5 w-5" />
                <span  >charts</span>
              </Link>
         
        </nav>
        <nav className="mt-auto flex flex-col items-start gap-4 px-2 sm:py-5">
        
              <Link
                href="#"
                className='text-sm flex item-end gap-2'
              >
                <Settings className="h-5 w-5" />
                <span >Settings</span>
              </Link>
         
        </nav>
      </aside>
    </div>
  )
}

export default Asidebar
