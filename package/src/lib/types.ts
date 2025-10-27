import { type ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { type NextRequest, type NextResponse, type NextFetchEvent } from "next/server";

import { type FinalNextResponse } from "./final-next-response";
import { type Logger } from "./logger";
import { type FINAL_SYMBOL } from "./constants";

export type BaseRequest = {
    nextUrl: URL;
};

export type NextType = "rewrite" | "redirect" | "json" | "none" | undefined;

export type Summary = {
    type: NextType;
    destination?: string | URL;
    body?: ReadableStream<Uint8Array>;
    cookies: Map<string, ResponseCookie>;
    headers: Headers;
    requestHeaders: Headers;
    status: number;
    statusText?: string;
};

export interface ChainNextRequest extends BaseRequest {
    summary: Readonly<Summary>;
}

export type ChainNextResponse<ResponseType extends Response = Response> =
    | FinalNextResponse
    | (ResponseType & { [FINAL_SYMBOL]?: undefined });

export type MiddlewareResult<ResponseType extends Response = Response> =
    | ChainNextResponse<ResponseType>
    | Response
    | void
    | undefined
    | null
    | Promise<MiddlewareResult<ResponseType>>;

export type Middleware<
    RequestType extends BaseRequest = NextRequest,
    ResponseType extends Response = NextResponse,
    NextFetchEventType = NextFetchEvent,
> = (req: ChainNextRequest & RequestType, event: NextFetchEventType) => MiddlewareResult<ResponseType>;

export type ChainItem<
    RequestType extends BaseRequest = NextRequest,
    ResponseType extends Response = NextResponse,
    NextFetchEventType = NextFetchEvent,
> =
    | Middleware<RequestType, ResponseType, NextFetchEventType>
    | [Middleware<RequestType, ResponseType, NextFetchEventType>, { include?: RegExp; exclude?: RegExp }?];

export type ChainConfig = {
    logger?: Logger | boolean | null;
};
