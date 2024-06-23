import { default as nextAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";
import { chain } from "@nimpl/middleware-chain";
import { NextResponse } from "next/server";

const intlMiddleware = createMiddleware({
    locales: ["en", "dk"],
    defaultLocale: "en",
});

export default chain([
    [intlMiddleware, { exclude: /^\/private(\/.*)?$/ }],
    () => {
        const next = new NextResponse();
        next.cookies.set("custom-cookie", Date.now().toString());
        return next;
    },
    [nextAuth, { include: /^\/private(\/.*)?$/ }],
]);

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
