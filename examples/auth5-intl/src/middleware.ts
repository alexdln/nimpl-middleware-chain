import { auth } from "@/auth";
import createMiddleware from "next-intl/middleware";
import { chain, FinalNextResponse, type Middleware } from "@nimpl/middleware-chain";

const intlMiddleware = createMiddleware({
    locales: ["en", "dk"],
    defaultLocale: "en",
});

export default chain([
    intlMiddleware,
    (req) => {
        if (req.summary.type === "redirect") return FinalNextResponse.next();
    },
    auth((req) => {
        const [, language = "en", pathname] = req.nextUrl.pathname.match(/\/(en|dk)(.*)/) || [];

        if (req.auth) {
            if (pathname === "/login") {
                return FinalNextResponse.redirect(new URL(`/${language}`, req.nextUrl.origin));
            }
        } else if (pathname !== "/login") {
            return FinalNextResponse.redirect(new URL(`/${language}/login`, req.nextUrl.origin));
        }

        return FinalNextResponse.next();
    }) as unknown as Middleware,
]);

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
