// Plan section 7.2, test 13: loading a page makes no request to another host, sets no
// cookies and transfers at most 500 KB (spec section 6.6.4, items 1 and 2, and 6.6.2, item 4).
import { gzipSync } from "node:zlib";
import { expect, test, type Request } from "@playwright/test";

// The six addresses the site has today (spec section 6.2.1).
const routes = [
  "#/",
  "#/versions",
  "#/documentation/builder",
  "#/documentation/validator",
  "#/documentation/expiry",
  "#/documentation/dictionary",
];

// 1 KB is 1,000 bytes, as in scripts/check-size.mjs.
const TRANSFER_LIMIT = 500 * 1000;

// Responses that GitHub Pages compresses with gzip.
const TEXT_TYPE = /^(text\/|application\/(javascript|json)|image\/svg\+xml)/;

// The bytes this response sent over the network, as plan section 7.1 measures them.
// `vite preview` may not compress a text response that GitHub Pages would, so such a
// response is gzipped here to count what the live site sends.
async function bytesSent(request: Request): Promise<number> {
  const response = await request.response();
  const sizes = await request.sizes();
  if (!response) {
    return 0;
  }

  const headers = response.headers();
  const isText = TEXT_TYPE.test(headers["content-type"] ?? "");
  const isCompressed = headers["content-encoding"] !== undefined;
  const bodySize =
    isText && !isCompressed
      ? gzipSync(await response.body()).length
      : sizes.responseBodySize;

  return sizes.responseHeadersSize + bodySize;
}

for (const route of routes) {
  test(`${route} loads only from its own host, sets no cookies and transfers at most 500 KB`, async ({
    page,
    context,
    baseURL,
  }) => {
    const siteOrigin = new URL(baseURL!).origin;
    const requested: string[] = [];
    const finished: Request[] = [];
    page.on("request", (request) => requested.push(request.url()));
    page.on("requestfinished", (request) => finished.push(request));

    await page.goto(route, { waitUntil: "networkidle" });

    const otherHosts = requested.filter(
      (url) => url.startsWith("http") && new URL(url).origin !== siteOrigin,
    );
    expect(otherHosts).toEqual([]);

    expect(await context.cookies()).toEqual([]);

    const sizes = await Promise.all(finished.map(bytesSent));
    const total = sizes.reduce((sum, size) => sum + size, 0);
    console.log(`${route}: ${(total / 1000).toFixed(1)} KB sent`);
    expect(total).toBeLessThanOrEqual(TRANSFER_LIMIT);
  });
}
