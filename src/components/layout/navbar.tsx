'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { LogOut } from 'lucide-react';

import { Button } from '@/components';
import { useLogout } from '@/hooks';

export const Navbar = () => {
  const { data: session, status } = useSession();
  const logoutMutation = useLogout();

  return (
    <header className='sticky top-0 z-10 h-16 w-full border-b flex justify-center items-center bg-white'>
      <div className='container flex items-center justify-between'>
        <Link href='/'>
          <span className='font-bold text-lg'>E-Commerce</span>
        </Link>

        {status !== 'loading' &&
          (session ? (
            <div className='flex items-center space-x-2'>
              <span className='text-sm text-gray-600'>Hola, {session.user?.name}</span>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => logoutMutation.mutate()}
                className='flex items-center space-x-1 cursor-pointer'
              >
                <LogOut className='h-4 w-4' />
                <span>Salir</span>
              </Button>
            </div>
          ) : (
            <div className='flex items-center space-x-2'>
              <Button variant='ghost' asChild>
                <Link href='/register'>Registrarse</Link>
              </Button>

              <Button asChild>
                <Link href='/login'>Iniciar Sesión</Link>
              </Button>
            </div>
          ))}
      </div>
    </header>
  );
};
