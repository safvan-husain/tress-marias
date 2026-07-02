import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/app/lib/auth/session";
import { STAFF_ROLES } from "@/app/lib/auth/definitions";
import type { UserRole } from "@/app/lib/auth/definitions";

const STAFF_ROLE_SET = new Set<UserRole>(STAFF_ROLES);

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const sessionCookie = req.cookies.get("session")?.value;
  const session = await decrypt(sessionCookie);

  const isAdminRoute = path.startsWith("/admin");
  const isAdminLogin = path === "/admin/login";
  const isCustomerAuthRoute = path === "/login" || path === "/signup";
  const isAccountRoute = path === "/account";

  if (isAdminRoute && !isAdminLogin) {
    if (!session?.userId || !STAFF_ROLE_SET.has(session.role)) {
      return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
    }
    return NextResponse.next();
  }

  if (isAdminLogin) {
    if (session?.userId && STAFF_ROLE_SET.has(session.role)) {
      return NextResponse.redirect(new URL("/admin", req.nextUrl));
    }
    return NextResponse.next();
  }

  if (isCustomerAuthRoute) {
    if (session?.userId && session.role === "customer") {
      return NextResponse.redirect(new URL("/account", req.nextUrl));
    }
    return NextResponse.next();
  }

  if (isAccountRoute) {
    if (!session?.userId || session.role !== "customer") {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/signup", "/account"],
};
