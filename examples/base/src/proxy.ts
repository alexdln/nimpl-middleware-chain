import { NextResponse, type NextRequest } from "next/server";
import { chain } from "@nimpl/proxy-chain";

async function loggetProxy(): Promise<NextResponse> {
    console.log("Logger proxy");
    return NextResponse.next();
}

export const proxy = chain<NextRequest, NextResponse>(
    [
        loggetProxy,
        async (request) => {
            const next = NextResponse.next({
                headers: new Headers({ "x-rewritten-by-middleware": "true" }),
                request: { headers: new Headers({ "x-request-pathname": request.nextUrl.pathname }) },
            });
            next.cookies.set("test", "cookie", { maxAge: 1000 * 60 * 60 * 24 * 30 });

            return next;
        },
        async (request) => {
            if (request.nextUrl.pathname === "/") {
                return NextResponse.rewrite(new URL("/rewritten", request.url));
            }

            return NextResponse.next();
        },
    ],
    {
        logger: {
            log: (msg) => console.log(`Info: ${msg}`),
            warn: (msg) => console.warn(`Warning: ${msg}`),
            error: (msg) => console.error(`Error: ${msg}`),
        },
    },
);

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.well-known).*)"],
};
