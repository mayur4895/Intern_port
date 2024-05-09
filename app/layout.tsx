import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
 
import './globals.css';
 
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils';

 

 
 
 
 
import { ThemeProvider } from '@/components/providers/ThemeProvider';
const font = Poppins({
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Jobhunt',
  description: 'Jobhunt',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

 
  return (
 
      <html lang="en" suppressHydrationWarning>
        <body className={cn(font.className)}>
      
 
              {children}
              <Toaster />
 
       
        </body>
      </html>
   
         
  );
}
