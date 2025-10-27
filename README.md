# @nimpl/proxy-chain

The package allows you to create a chain of native next.js proxies without any modifications (_i.e., you can add any ready-made proxy to the chain_)

```ts filename="proxy.ts"
// proxy.ts
import { chain } from "@nimpl/proxy-chain";

export default chain([
  [intlProxy, { exclude: /^\/private(\/.*)?$/ }],
  authProxy,
  (req, event) => {
    event.waitUntil(
      fetch("https://my-analytics-platform.com", {
        method: "POST",
        body: JSON.stringify({ pathname: req.nextUrl.pathname }),
      })
    );
    return NextResponse.next();
  },
  customProxy,
]);
```

Visit https://nimpl.dev/docs/proxy-chain to view the full documentation.

## Compatibility

The utility is fully compatible with **all versions of Next.js** that support middleware/proxy.

If you're using a version **below 16.0.0**, create a `middleware.ts` instead of `proxy.ts` file:

```ts filename="middleware.ts"
import { chain } from "@nimpl/proxy-chain";
import { NextRequest, NextResponse, NextFetchEvent } from "next/types";

export const middleware = chain<NextRequest, NextResponse, NextFetchEvent>([
  // ...
]);
```

> [!TIP]
> Explicitly pass the types NextRequest, NextResponse, and NextFetchEvent as generics to the chain function to ensure proper type safety and autocompletion.

## Installation

**Using npm:**

```bash
npm i @nimpl/proxy-chain
```

**Using yarn:**

```bash
yarn add @nimpl/proxy-chain
```

## Motivation

All existing solutions work through their own APIs - made under the style of express or in their own vision. They are useful, well implemented, and convenient. But only in cases where you can update every used proxy.

However, there are many situations where you need to add already prepared solutions. Usually, in the issues of these solutions, you can find “support to add a chain package A, working with chain package B”.

This package follows a plug and play format. In the best traditions of the previous next.js.

This is not Koa and not Express, this is a package for next.js, in its unique style, in the format of its API.

## Examples

- [Base example](https://github.com/alexdln/nimpl-proxy-chain/tree/main/examples/base).
- [next-auth + next-intl example](https://github.com/alexdln/nimpl-proxy-chain/tree/main/examples/auth-intl).
- [next-auth5 + next-intl example](https://github.com/alexdln/nimpl-proxy-chain/tree/main/examples/auth5-intl).

## Development

Read about working on the package and making changes on the [contribution page](https://nimpl.dev/contribution)

## Additional

Please consider giving a star if you like it, it shows that the package is useful and helps me continue work on this and other packages.

Create issues with wishes, ideas, difficulties, etc. All of them will definitely be considered and thought over.

## License

[MIT](https://github.com/alexdln/nimpl-proxy-chain/blob/main/LICENSE)
