import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { jwtDecode } from 'jwt-decode';

import { authClient } from '@/clients';
import { LoginRequest } from '@/models';
import { JWTPayload } from '@/types';

import type { NextAuthOptions } from 'next-auth';

const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const loginData: LoginRequest = {
            email: credentials.email,
            password: credentials.password,
          };

          const response = await authClient.login(loginData);

          if (response.success && response.data) {
            const decoded = jwtDecode<JWTPayload>(response.data.token);

            return {
              id: response.data.email,
              name: `${response.data.firtsName} ${response.data.lastName}`,
              email: response.data.email,
              accessToken: response.data.token,
              role: decoded.role.toLowerCase(),
            };
          }

          return null;
        } catch (error) {
          console.error('Error en authorize:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.userId = user.id;
        token.role = user.role.toLowerCase();
      } else if (token.accessToken && !token.role) {
        const decoded = jwtDecode<JWTPayload>(token.accessToken as string);
        token.role = decoded.role.toLowerCase();
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken as string;
        session.user.id = token.userId as string;
        session.user.accessToken = token.accessToken as string;
        session.user.role = token.role.toLowerCase() as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
