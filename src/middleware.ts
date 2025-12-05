import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './auth';
import paths from './paths';

export async function middleware(request: NextRequest) {
  const session = await auth();
  const isAuthenticated = !!session?.user?.email;

  if (!isAuthenticated && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL(paths.signIn(), request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
