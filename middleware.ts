import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // SOLO homepage
    if (pathname !== "/") {
        return NextResponse.next();
    }

    const country =
        request.headers.get("x-vercel-ip-country") || "IT";

    const url = request.nextUrl.clone();
    url.pathname = country === "BR" ? "/pt" : "/it";

    return NextResponse.redirect(url);
}

export const config = {
    matcher: "/"
};