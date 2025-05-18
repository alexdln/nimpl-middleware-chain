# @nimpl/middleware-chain

The package allows you to create a chain of native next.js middlewares without any modifications (_i.e., you can add any ready-made middleware to the chain_)

```ts
// middleware.ts
import { chain } from "@nimpl/middleware-chain";

export default chain([
  [intlMiddleware, { exclude: /^\/private(\/.*)?$/ }],
  authMiddleware,
  (req, event) => {
    event.waitUntil(
      fetch("https://my-analytics-platform.com", {
        method: "POST",
        body: JSON.stringify({ pathname: req.nextUrl.pathname }),
      })
    );
    return NextResponse.next();
  },
  customMiddleware,
]);
```

Visit https://nimpl.dev/docs/middleware-chain to view the full documentation.

## Installation

**Using npm:**

```bash
npm i @nimpl/middleware-chain
```

**Using yarn:**

```bash
yarn add @nimpl/middleware-chain
```

## Motivation

All existing solutions work through their own APIs - made under the style of express or in their own vision. They are useful, well implemented, and convenient. But only in cases where you can update every used middleware.

However, there are many situations where you need to add already prepared solutions. Usually, in the issues of these solutions, you can find “support to add a chain package A, working with chain package B”.

This package follows a plug and play format. In the best traditions of the previous next.js.

This is not Koa and not Express, this is a package for next.js, in its unique style, in the format of its API.

## Examples

- [Base example](https://github.com/vordgi/nimpl-middleware-chain/tree/main/examples/base).
- [next-auth + next-intl example](https://github.com/vordgi/nimpl-middleware-chain/tree/main/examples/auth-intl).

## Development

Read about working on the package and making changes on the contribution page

## Additional

Please consider giving a star if you like it, it shows that the package is useful and helps me continue work on this and other packages.

Create issues with wishes, ideas, difficulties, etc. All of them will definitely be considered and thought over.

## License

[MIT](https://github.com/vordgi/nimpl-middleware-chain/blob/main/LICENSE)
