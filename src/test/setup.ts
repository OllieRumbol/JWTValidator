import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Testing Library cleans up by itself only when Vitest globals are on, and they are off.
afterEach(() => {
  cleanup();
});
