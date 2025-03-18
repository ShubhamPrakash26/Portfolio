import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path === "/auth/login" || path === "/auth/register"

  // Define admin paths that require admin role
  const isAdminPath = path.startsWith("/blog/admin")

  // Get the session token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // Redirect logic for public paths
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/blog", request.url))
  }

  // Redirect logic for protected paths
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  // Redirect logic for admin paths
  if (isAdminPath && token?.role !== "admin") {
    return NextResponse.redirect(new URL("/blog", request.url))
  }

  return NextResponse.next()
}

// Configure which paths the middleware runs on
export const config = {
  matcher: ["/blog/:path*", "/auth/:path*"],
}

