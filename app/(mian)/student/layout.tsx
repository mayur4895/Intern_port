'use client'
import { auth } from '@/auth';
import MainNavbar from '@/components/Navbar/Student/MainNavbar'
import Footer from '@/components/ui/footer';
import { CurrentUser } from '@/hooks/use-current-user';
import { UserType } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';

const StudentLayout = ({ children }: { children: React.ReactNode }) => {
  const session = CurrentUser();

  useEffect(() => {
    if (!session || session?.role !== UserType.STUDENT) {
      redirect("/auth/login");
    }

    if (session?.role === UserType.EMPLOYER) {
      redirect("/dashboard");
    }
  }, [session]);

  return (
    <div className='flex flex-col min-h-screen'>
      <MainNavbar session={session?.role === UserType.STUDENT ? session : null} />
      <main className='flex-grow py-20'>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default StudentLayout;
