import { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      accessToken: string;
      role: string;
    } & DefaultSession['user'];
    accessToken: string;
  }

  interface User extends DefaultUser {
    accessToken: string;
    role: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    accessToken: string;
    userId: string;
    role: string;
  }
}
