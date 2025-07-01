// middleware.js
import { NextResponse } from 'next/server';

// We add this JSDoc comment to get type checking and autocompletion in VSCode
/** @param {import('next/server').NextRequest} request */
export function middleware(request) {
  // 1. Define the pages for unauthenticated users
  const authRoutes = ['/sign-in', '/sign-up', '/reset-password'];

  // 2. Define the pages that require authentication
  const protectedRoutes = ['/dashboard/*', '/settings', '/profile'];

  // 3. Get the session token from the cookies and the current path
  const sessionToken = request.cookies.get('session_info');
  const { pathname } = request.nextUrl;
  console.log(sessionToken);
  if (sessionToken && sessionToken.value.isNewUser == 1) {
    return NextResponse.redirect(new URL('/dashboards/trader-profile'));
  }
  // 4. Redirect logged-in users from auth pages to the dashboard
  if (sessionToken && authRoutes.includes(pathname)) {
    // If the user is logged in and tries to visit login/signup, redirect them.
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 5. Redirect unauthenticated users from protected pages to the login page
  if (!sessionToken && protectedRoutes.includes(pathname)) {
    // If the user is NOT logged in and tries to visit a protected route, redirect them.
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // 6. If none of the above, let the request continue as normal
  return NextResponse.next();
}

// 7. Configure the matcher to run the middleware only on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    // '/sign-in',
    // '/dashboard',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
