import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
 
import './globals.css';
 
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils';

 

 
 
 
 
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import MainNavbar from '@/components/MainNavbar';
import { auth } from '@/auth';
import Container from '@/components/ui/container';
const font = Poppins({
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Jobhunt',
  description: 'Jobhunt',
};

export default  async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await auth();
 
  
  return (
 
      <html lang="en" suppressHydrationWarning>
        <body className={cn(font.className)}>
      
        <MainNavbar session={session}/>
            <Container>
            {children}
            </Container>
              <Toaster />
 
       
        </body>
      </html>
   
         
  );
}
