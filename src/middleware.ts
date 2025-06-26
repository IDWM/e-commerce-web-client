import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

import { checkRouteAccess } from '@/libs';

export default withAuth(
  function middleware(request) {
    const { pathname } = request.nextUrl;
    const token = request.nextauth.token;

    const isAuthenticated = !!token;
    const userRole = token?.role;

    const hasAccess = checkRouteAccess(pathname, isAuthenticated, userRole);

    if (!hasAccess) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        const isAuthenticated = !!token;
        const userRole = token?.role;

        return checkRouteAccess(pathname, isAuthenticated, userRole);
      },
    },
  },
);

export const config = {
  matcher: ['/admin/:path*', '/cart/:path*', '/profile/:path*', '/orders/:path*'],
};
