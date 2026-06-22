import { NextResponse } from "next/server";

export function middleware() {
    return NextResponse.redirect(new URL("/it", "https://example.com"));
}

export const config = {
    matcher: "/:path*"
};