import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const middleware = async (req) => {
  const path = req.nextUrl.pathname;
  const publicPaths = path === '/sign-in' || path === '/sign-up';

  const getCookies = cookies();
  const token = getCookies.get('next14_token')?.value || '';

  if (publicPaths && token !== '') {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  if (!publicPaths && token === '') {
    return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
  }
};

export const config = {
  matcher: ['/sign-in', '/sign-up'],
};
