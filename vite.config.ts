/// <reference types="vitest/config" />
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import contentSecurityPolicy from "./scripts/csp.ts";

export default defineConfig({
  // GitHub Pages serves the site from https://ollierumbol.github.io/JWTValidator/.
  base: "/JWTValidator/",
  // The React Compiler runs through Babel. The plugin's Rust compiler is still experimental.
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    contentSecurityPolicy(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    // No asset becomes a data: address, which the content security policy would block.
    assetsInlineLimit: 0,
    // The size check reads the manifest to find the files each route loads.
    manifest: true,
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    // Component tests sit beside their components. The Playwright tests in e2e/ run separately.
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
