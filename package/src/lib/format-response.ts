import { NextResponse } from "next/server";

import { type Summary } from "./types";

export const formatResponse = (summary: Summary) => {
    const nextConfig = {
        status: summary.status,
        statusText: summary.statusText,
        headers: summary.headers,
    };
    let next: NextResponse;
    if (summary.type === "json") {
        next = NextResponse.json(summary.body);
    } else if (summary.type === "redirect") {
        next = NextResponse.redirect(summary.destination!, nextConfig);
    } else if (summary.type === "rewrite") {
        next = NextResponse.rewrite(summary.destination!, nextConfig);
    } else {
        next = NextResponse.next(nextConfig);
    }

    summary.cookies.forEach((cookie) => {
        next.cookies.set(cookie.name, cookie.value, cookie);
    });

    return next;
};
