'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

export const Navbar = () => {
  return (
    <header className='sticky top-0 z-10 w-full border-b flex justify-center items-center'>
      <div className='container flex items-center justify-between py-2'>
        {/* Logo */}
        <Link href='/'>
          <span className='font-bold text-lg'>E-Commerce</span>
        </Link>

        {/* Auth Buttons */}
        <div className='flex items-center space-x-2'>
          <Button variant='ghost' asChild>
            <Link href='/register'>Registrarse</Link>
          </Button>

          <Button asChild>
            <Link href='/login'>Iniciar Sesión</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
