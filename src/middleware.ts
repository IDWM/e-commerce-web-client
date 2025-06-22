import { withAuth } from 'next-auth/middleware';

export default withAuth(function middleware(_request) {}, {
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

export const config = {
  matcher: [],
};
