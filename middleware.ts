import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ROLE_COOKIE = 'vakeel-role';
const SESSION_COOKIE = 'vakeel-session';

const roleToHome: Record<string, string> = {
  client: '/user/dashboard',
  user: '/user/dashboard',
  lawyer: '/lawyer/dashboard',
  admin: '/admin/dashboard',
};

const protectedMatchers = [
  ['/user', 'user'],
  ['/lawyer', 'lawyer'],
  ['/admin', 'admin'],
];

export function middleware(request: NextRequest) {
  const role = request.cookies.get(ROLE_COOKIE)?.value;
  const session = request.cookies.get(SESSION_COOKIE)?.value;
  const { pathname } = request.nextUrl;

  for (const [prefix, expectedRole] of protectedMatchers) {
    if (pathname.startsWith(prefix)) {
      if (!role || !session) {
        const url = new URL('/auth/login', request.url);
        url.searchParams.set('next', pathname);
        return NextResponse.redirect(url);
      }
      if (expectedRole === 'user' && role !== 'client') {
        return NextResponse.redirect(new URL(roleToHome[role] ?? '/', request.url));
      }
      if (expectedRole !== 'user' && role !== expectedRole) {
        return NextResponse.redirect(new URL(roleToHome[role] ?? '/', request.url));
      }
    }
  }

  if (pathname.startsWith('/auth') && role && session) {
    return NextResponse.redirect(new URL(roleToHome[role] ?? '/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/user/:path*', '/lawyer/:path*', '/admin/:path*', '/auth/:path*'],
};
