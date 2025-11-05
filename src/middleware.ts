import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import paths from './paths';
import { auth } from './auth';

export async function middleware(request: NextRequest) {
  const session = await auth();
  const isAuthenticated = !!(session?.user?.email);

  if (!isAuthenticated && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL(paths.signIn(), request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/admin/:path*'],
};
