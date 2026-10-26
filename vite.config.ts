import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // GitHub Pages serves the site from https://ollierumbol.github.io/JWTValidator/.
  base: "/JWTValidator/",
  plugins: [react()],
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
});
