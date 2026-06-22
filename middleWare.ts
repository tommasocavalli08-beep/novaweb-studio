import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // NON toccare asset Next
    if (pathname.startsWith("/_next") || pathname.includes(".")) {
        return NextResponse.next();
    }

    // SOLO homepage
    if (pathname === "/") {
        const country =
            request.headers.get("x-vercel-ip-country");

        const lang = country === "BR" ? "pt" : "it";

        const url = request.nextUrl.clone();
        url.pathname = `/${lang}`;

        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

// IMPORTANTISSIMO: NON mettere regex aggressive
export const config = {
    matcher: "/"
};