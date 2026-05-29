import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
  { prefix: "/admin-dashboard", role: "admin" },
  { prefix: "/trainer-dashboard", role: "trainer" },
  { prefix: "/dashboard", role: "user" },
] as const;

const roleHome = {
  admin: "/admin-dashboard",
  trainer: "/trainer-dashboard",
  user: "/dashboard",
} as const;

const isProtectedPath = (pathname: string) =>
  protectedRoutes.some(({ prefix }) => pathname === prefix || pathname.startsWith(`${prefix}/`));

const normalizeRole = (role: string) => role.toLowerCase();

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("access_token")?.value;
  const role = request.cookies.get("role")?.value;

  if (!accessToken || !role) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const normalizedRole = normalizeRole(role);

  const matchedRoute = protectedRoutes.find(({ prefix }) => pathname === prefix || pathname.startsWith(`${prefix}/`));

  if (matchedRoute && normalizedRole !== matchedRoute.role) {
    return NextResponse.redirect(new URL(roleHome[normalizedRole as keyof typeof roleHome], request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin-dashboard",
    "/admin-dashboard/:path*",
    "/trainer-dashboard",
    "/trainer-dashboard/:path*",
    "/dashboard",
    "/dashboard/:path*",
  ],
};