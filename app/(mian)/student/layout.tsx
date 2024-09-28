'use client'
import { auth } from '@/auth';
import MainNavbar from '@/components/Navbar/Student/MainNavbar'
import Footer from '@/components/ui/footer';
import { CurrentUser,   } from '@/hooks/use-current-user';
 
 
import { UserType } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';
 

const StudentLayout = ({ children }: { children: React.ReactNode }) => {
  const  currentUser  =   CurrentUser();
  useEffect(() => {
    if (!currentUser || currentUser?.role !== UserType.STUDENT) {
      redirect("/auth/login");
    }
 
   
  }, [currentUser]);

 
 
 
  return (
    <div className='flex flex-col min-h-screen'> 
      <main className='flex-grow   '>
        {children}
      </main>
        </div>
  );
}

export default StudentLayout;
