import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export const middleware = async (req) => {
  const path = req.nextUrl.pathname;
  const publicPaths = ['/sign-in', '/sign-up'];

  const getCookies = cookies();
  const token = getCookies.get('next14_token')?.value || '';

  if (publicPaths.includes(path)) {
    if (token && !isTokenExpired(token)) {
      return NextResponse.redirect(new URL('/', req.nextUrl));
    }
  } else {
    if (!token || isTokenExpired(token)) {
      return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/', '/blogs', '/sign-in', '/sign-up'],
};

function isTokenExpired(token) {
  try {
    const decoded = jwt.decode(token);
    return decoded.exp < Date.now() / 1000;
  } catch (err) {
    return true;
  }
}
