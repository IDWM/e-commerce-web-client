'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLogin } from '@/hooks';
import { type LoginRequest, loginSchema } from '@/models';

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();

  const form = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginRequest) => {
    await loginMutation.mutateAsync(data);
  };

  return (
    <div className='mx-auto w-md space-y-6'>
      <h1 className='text-3xl font-bold text-center'>Iniciar Sesión</h1>

      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            type='email'
            placeholder='tu@email.com'
            {...form.register('email')}
            className={form.formState.errors.email ? 'border-red-500' : ''}
            disabled={loginMutation.isPending}
          />
          {form.formState.errors.email && (
            <p className='text-sm text-red-500'>{form.formState.errors.email.message}</p>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='password'>Contraseña</Label>
          <div className='relative'>
            <Input
              id='password'
              type={showPassword ? 'text' : 'password'}
              placeholder='••••••••'
              {...form.register('password')}
              className={form.formState.errors.password ? 'border-red-500 pr-10' : 'pr-10'}
              disabled={loginMutation.isPending}
            />
            <Button
              type='button'
              variant='ghost'
              size='icon'
              className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent cursor-pointer'
              onClick={() => setShowPassword(!showPassword)}
              disabled={loginMutation.isPending}
            >
              {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
            </Button>
          </div>
          {form.formState.errors.password && (
            <p className='text-sm text-red-500'>{form.formState.errors.password.message}</p>
          )}
        </div>

        <Button type='submit' className='w-full cursor-pointer' disabled={loginMutation.isPending}>
          {loginMutation.isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          {loginMutation.isPending ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </Button>
      </form>

      <div className='text-center text-sm'>
        ¿No tienes una cuenta?{' '}
        <Link href='/register' className='underline'>
          Regístrate
        </Link>
      </div>
    </div>
  );
}
