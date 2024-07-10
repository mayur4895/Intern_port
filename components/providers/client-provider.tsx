// components/ClientProviders.tsx
'use client'; 
import React from 'react';
 
import { SessionProvider } from 'next-auth/react';
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from './query-provider';

interface ClientProvidersProps {
  children: React.ReactNode;
  session: any; 
}

export const ClientProviders = ({ children, session }: ClientProvidersProps) => {
 

  return (
    <SessionProvider session={session}>
      <QueryProvider >
        {children}
        <Toaster /> 
      </QueryProvider>
    </SessionProvider>
  );
};
