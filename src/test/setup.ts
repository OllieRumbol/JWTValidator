import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// The simulated browser has no scrolling, and prints "Not implemented" each time the
// router's ScrollRestoration calls this. The end-to-end tests check scrolling.
window.scrollTo = () => {};

// Testing Library cleans up by itself only when Vitest globals are on, and they are off.
afterEach(() => {
  cleanup();
});
