import { ReactNode } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';

import { Footer, Navbar } from '@/components';
import { AppProviders } from '@/providers';

import type { Metadata } from 'next';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'E-Commerce App',
  description: 'Tu E-Commerce de confianza',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='es'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppProviders>
          <div className='flex flex-col min-h-screen'>
            <Navbar />
            <main className='flex-1 py-10'>{children}</main>
            <Footer />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
