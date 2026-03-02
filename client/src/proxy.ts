// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value
  const refreshToken = request.cookies.get('refresh_token')?.value
  const { pathname } = request.nextUrl

  // allow public routes
  const publicPaths = ['/login', '/_next']
  if (publicPaths.some(p => pathname.startsWith(p))) return NextResponse.next()

  if (!accessToken || !refreshToken) {
    // not logged in -> redirect to login and preserve redirect back url
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // optionally: verify token here (see notes)
  return NextResponse.next()
}

// apply middleware to all app routes (adjust matcher to your needs)
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}