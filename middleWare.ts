import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // evita loop su /it e /pt
    if (pathname.startsWith("/it") || pathname.startsWith("/pt")) {
        return NextResponse.next();
    }

    const country =
        request.headers.get("x-vercel-ip-country") || "IT";

    const url = request.nextUrl.clone();

    if (pathname === "/") {
        url.pathname = country === "BR" ? "/pt" : "/it";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|favicon.ico).*)"]
};