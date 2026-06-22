import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const country =
        request.headers.get("x-vercel-ip-country") || "IT";

    const { pathname } = request.nextUrl;

    if (pathname === "/") {
        const url = request.nextUrl.clone();
        url.pathname = country === "BR" ? "/pt" : "/it";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/"
};