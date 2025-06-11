import { type NextFetchEvent, type NextRequest, type NextResponse } from "next/server";
import { type ChainItem, type ChainConfig, type BaseRequest } from "./lib/types";
import { collectData } from "./lib/collect-data";
import { formatResponse } from "./lib/format-response";
import { Logger } from "./lib/logger";

export { type ChainItem, type ChainConfig, type BaseRequest, type Middleware } from "./lib/types";
export { FinalNextResponse } from "./lib/final-next-response";

export const chain =
    <RequestType extends Request & BaseRequest = NextRequest, ResponseType extends Response = NextResponse>(
        middlewares: ChainItem<RequestType, ResponseType>[],
        config?: ChainConfig,
    ) =>
    async (req: RequestType, event: NextFetchEvent) => {
        const logger = new Logger(config?.logger);
        const summary = await collectData<RequestType, ResponseType>(req, event, middlewares, logger);
        const next = formatResponse(summary);

        return next;
    };

export default chain;
