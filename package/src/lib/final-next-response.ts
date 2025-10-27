import { NextURL } from "next/dist/server/web/next-url";
import { NextResponse } from "next/server";

import { FINAL_SYMBOL } from "./constants";

export class FinalNextResponse<Body = unknown> extends NextResponse<Body> {
    [FINAL_SYMBOL]?: boolean;

    static json<JsonBody, NextResponseType = NextResponse>(body: JsonBody, init?: ResponseInit) {
        const next: FinalNextResponse<JsonBody> = super.json(body, init);
        next[FINAL_SYMBOL] = true;
        return next as NextResponseType;
    }

    static redirect<NextResponseType = NextResponse>(url: string | NextURL | URL, init?: number | ResponseInit) {
        const next: FinalNextResponse<unknown> = super.redirect(url, init);
        next[FINAL_SYMBOL] = true;
        return next as NextResponseType;
    }

    static rewrite<NextResponseType = NextResponse>(destination: string | NextURL | URL, init?: ResponseInit) {
        const next: FinalNextResponse<unknown> = super.rewrite(destination, init);
        next[FINAL_SYMBOL] = true;
        return next as NextResponseType;
    }

    static next<NextResponseType = NextResponse>(init?: ResponseInit) {
        const next: FinalNextResponse<unknown> = super.next(init);
        next[FINAL_SYMBOL] = true;
        return next as NextResponseType;
    }
}
