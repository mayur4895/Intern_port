import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
 
import './globals.css';
 
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils';  
 
 
 
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { SessionProvider } from 'next-auth/react';
import MainNavbar from '@/components/Navbar/Student/MainNavbar';
 
import Container from '@/components/ui/container';
import { auth } from '@/auth';
 
 
const font = Poppins({
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'HireIntern',
  description: 'HireIntern build for Modern college',
};

export default  async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 
 
  const session =  await auth();
  return (
 
  <SessionProvider session={session}> 
 
      <html lang="en" suppressHydrationWarning>
        <body className={cn(font.className)}> 
            <Container> 
            {children} 
            </Container>
              <Toaster /> 
 
        </body>

        
      </html>
 
      </SessionProvider>
     
  );
}
