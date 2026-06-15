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
  pathname === "/payment/payment-success" ||
  pathname.startsWith("/payment/payment-success/") ||
  protectedRoutes.some(({ prefix }) => pathname === prefix || pathname.startsWith(`${prefix}/`));

const normalizeRole = (role: string) => role.toLowerCase();

const decodeRoleFromToken = (token: string) => {
  try {
    const payload = token.split(".")[1];

    if (!payload) {
      return null;
    }

    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const decoded = JSON.parse(atob(padded));

    const role = decoded?.role ?? decoded?.user?.role ?? decoded?.data?.role;

    return typeof role === "string" ? role : null;
  } catch {
    return null;
  }
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  const access_token = request.cookies.get("access_token")?.value;
  const role = access_token ? decodeRoleFromToken(access_token) : null;

  if (!access_token || !role) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const normalizedRole = normalizeRole(role);

  if (pathname === "/payment/payment-success" || pathname.startsWith("/payment/payment-success/")) {
    const paymentInitiated = request.cookies.get("payment_initiated")?.value === "true";
    const hasSessionId = request.nextUrl.searchParams.has("session_id");
    const hasPaymentIntent = request.nextUrl.searchParams.has("payment_intent");

    if (!paymentInitiated && !hasSessionId && !hasPaymentIntent) {
      return NextResponse.redirect(new URL(roleHome[normalizedRole as keyof typeof roleHome] || "/", request.url));
    }

    const response = NextResponse.next();
    if (paymentInitiated) {
      response.cookies.delete("payment_initiated");
    }
    return response;
  }

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
    "/payment/payment-success",
    "/payment/payment-success/:path*",
  ],
};