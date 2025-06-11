import { type ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { type NextRequest, type NextResponse, type NextFetchEvent } from "next/server";
import { type FinalNextResponse, type FinalSymbol } from "./final-next-response";
import { type Logger } from "./logger";

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
    status: number;
    statusText?: string;
};

export interface ChainNextRequest extends BaseRequest {
    summary: Readonly<Summary>;
}

export type ChainNextResponse<ResponseType extends Response = Response> =
    | FinalNextResponse
    | (ResponseType & { [FinalSymbol]?: undefined });

export type MiddlewareResult<ResponseType extends Response = Response> =
    | ChainNextResponse<ResponseType>
    | Response
    | void
    | undefined
    | null
    | Promise<MiddlewareResult<ResponseType>>;

export type Middleware<T extends BaseRequest = NextRequest, ResponseType extends Response = NextResponse> = (
    req: ChainNextRequest & T,
    event: NextFetchEvent,
) => MiddlewareResult<ResponseType>;

export type ChainItem<T extends BaseRequest = NextRequest, ResponseType extends Response = NextResponse> =
    | Middleware<T, ResponseType>
    | [Middleware<T, ResponseType>, { include?: RegExp; exclude?: RegExp }?];

export type ChainConfig = {
    logger?: Logger | boolean | null;
};
