import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose/jwt/verify";

const JWT_SECRET = process.env.JWT_SECRET!;
const SESSION_COOKIE_NAME = "kr_admin_session";

const protectedRoutes = [
  "/admin/dashboard",
  "/admin/fleet",
  "/admin/bookings",
  "/admin/messages",
  "/admin/analytics",
  "/admin/settings",
  "/admin/profile",
  "/admin/reset-password",
];
const authRoutes = ["/admin/login"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Verify token if present
  let isValidToken = false;
  if (token) {
    try {
      const secretKey = new TextEncoder().encode(JWT_SECRET);
      await jwtVerify(token, secretKey);
      isValidToken = true;
    } catch {
      isValidToken = false;
    }
  }

  // Redirect to login if accessing protected route without valid token
  if (isProtectedRoute && !isValidToken) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to dashboard if accessing auth route with valid token
  if (isAuthRoute && isValidToken) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};