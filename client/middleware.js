import { NextResponse } from "next/server";

function decodeCookie(value = "") {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function middleware(request) {
  const token = request.cookies.get("ci_token")?.value;
  const rawUser = request.cookies.get("ci_user")?.value;
  const pathname = request.nextUrl.pathname;

  let user = null;
  if (rawUser) {
    try {
      user = JSON.parse(decodeCookie(rawUser));
    } catch {
      user = null;
    }
  }

  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/signup");
  const isDashboardPage = pathname.startsWith("/dashboard");
  const isAdminPage = pathname.startsWith("/admin");

  if (!token && (isDashboardPage || isAdminPage)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthPage && token && user?.role) {
    const redirectTo = user.role === "admin" ? "/admin" : "/";
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  if (isAdminPage && user?.role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/dashboard/:path*", "/admin/:path*"]
};
