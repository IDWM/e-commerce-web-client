import { ReactNode } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';

import { Footer, Navbar } from '@/components';

import { Providers } from './providers';

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
  title: 'E-commerce App',
  description: 'Modern e-commerce application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='es'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <Navbar />
          <main className='flex-grow'>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
