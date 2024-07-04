// layout.tsx
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Container from '@/components/ui/container';
import { auth } from '@/auth';
import { ClientProviders } from '@/components/providers/client-provider';
 

const font = Poppins({
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'HireIntern',
  description: 'HireIntern build for Modern college',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(font.className)}>
        <ClientProviders session={session}>
          <Container>
            {children}
          </Container>
        </ClientProviders>
      </body>
    </html>
  );
}
