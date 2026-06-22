import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (
        pathname.startsWith("/_next") ||
        pathname.includes(".") ||
        pathname.startsWith("/it") ||
        pathname.startsWith("/pt")
    ) {
        return NextResponse.next();
    }

    if (pathname === "/") {
        const country =
            request.headers.get("x-vercel-ip-country") || "IT";

        const url = request.nextUrl.clone();
        url.pathname = country === "BR" ? "/pt" : "/it";

        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/"
};