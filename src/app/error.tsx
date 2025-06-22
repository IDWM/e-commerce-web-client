'use client';

import { AlertCircle, Home, RefreshCw } from 'lucide-react';

import { Button } from '@/components';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className='min-h-[60vh] flex items-center justify-center'>
      <div className='max-w-md w-full mx-auto px-4'>
        <div className='text-center space-y-6'>
          <div className='flex justify-center'>
            <div className='w-20 h-20 bg-red-100 rounded-full flex items-center justify-center'>
              <AlertCircle className='w-10 h-10 text-red-600' />
            </div>
          </div>

          <div className='space-y-2'>
            <h1 className='text-2xl font-bold text-gray-900'>¡Algo salió mal!</h1>
            <p className='text-gray-600'>
              Ha ocurrido un error inesperado. Por favor, intenta nuevamente.
            </p>
          </div>

          {process.env.NODE_ENV === 'development' && (
            <div className='bg-red-50 border border-red-200 rounded-lg p-4 text-left'>
              <p className='text-sm text-red-800 font-medium mb-2'>
                Detalles del error (solo en desarrollo):
              </p>
              <p className='text-xs text-red-700 font-mono break-words'>{error.message}</p>
              {error.digest && (
                <p className='text-xs text-red-600 mt-1'>ID del error: {error.digest}</p>
              )}
            </div>
          )}

          <div className='flex flex-col sm:flex-row gap-3 justify-center'>
            <Button onClick={reset} className='flex items-center gap-2' variant='default'>
              <RefreshCw className='w-4 h-4' />
              Intentar nuevamente
            </Button>

            <Button onClick={handleGoHome} variant='outline' className='flex items-center gap-2'>
              <Home className='w-4 h-4' />
              Ir al inicio
            </Button>
          </div>

          <div className='text-sm text-gray-500'>
            <p>
              Si el problema persiste, por favor contacta a nuestro{' '}
              <a href='/contact' className='text-blue-600 hover:text-blue-800 underline'>
                equipo de soporte
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
