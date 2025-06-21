import { useRouter } from 'next/navigation';
import { signIn, signOut } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { LoginRequest } from '@/models';

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      const result = await signIn('credentials', {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error('Correo o contraseña inválidos');
      }

      if (!result?.ok) {
        throw new Error('Error al iniciar sesión');
      }

      return result;
    },
    onSuccess: () => {
      toast.success('¡Bienvenido de vuelta!', {
        description: 'Has iniciado sesión correctamente.',
      });
      router.push('/');
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error('Error al iniciar sesión', {
        description: error.message || 'Ocurrió un error inesperado',
      });
    },
  });
};

export const useLogout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      await signOut({ redirect: false });
    },
    onSuccess: () => {
      toast.success('Sesión cerrada', {
        description: 'Has cerrado sesión correctamente.',
      });
      router.push('/login');
      router.refresh();
    },
  });
};
