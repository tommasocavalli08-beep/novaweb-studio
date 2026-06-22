import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;


    // lascia passare asset e lingue già corrette
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/it") ||
        pathname.startsWith("/pt") ||
        pathname.includes(".")
    ) {
        return NextResponse.next();
    }

    // SOLO root
    if (pathname === "/") {
        const country =
            request.headers.get("x-vercel-ip-country") || "IT";

        const url = request.nextUrl.clone();
        url.pathname = country === "BR" ? "/pt" : "/it";

        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

// 👇 QUESTO è IL PUNTO CHIAVE
export const config = {
    matcher: ["/:path*"]
};