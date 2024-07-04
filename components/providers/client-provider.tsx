// components/ClientProviders.tsx
'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from "@/components/ui/toaster";

interface ClientProvidersProps {
  children: React.ReactNode;
  session: any; 
}

export const ClientProviders = ({ children, session }: ClientProvidersProps) => {
  const queryClient = new QueryClient();

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster />
      </QueryClientProvider>
    </SessionProvider>
  );
};
