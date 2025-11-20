import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  
  const accessTokenPresent = authHeader && authHeader.startsWith('Bearer ');
  
  const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard');

  if (isDashboardRoute && !accessTokenPresent) {
    const loginUrl = new URL('/?showLogin=true', request.url);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}