import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log(1)
  const token = request.cookies.get('refreshToken');
  const pathname = request.nextUrl.pathname;
  console.log(pathname, "pathname")
  const isDashboardRoute = pathname.startsWith('/dashboard');

  if (isDashboardRoute && !token) {
    const loginUrl = new URL('/?showLogin=true', request.url);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    '/dashboard/:path*',
  ],
};