import { NextRequest, NextResponse } from 'next/server';

// Middleware to redirect all requests to /abc
export function middleware(req: NextRequest) {
  console.log("1243")

  return NextResponse.redirect(new URL('/abc', req.url));
}

// Optional: Specify which paths should trigger the middleware
export const config = {
  matcher: '/:path*', // This will match all paths
};