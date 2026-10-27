import type { Plugin } from "vite";

// Plan section 3.5, "Content security policy". The browser blocks anything that is not
// from the site's own origin (spec section 6.6.4, item 2). Emotion, which MUI uses,
// adds its styles in inline <style> tags, so inline styles are allowed.
const POLICY = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self'",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
].join("; ");

// GitHub Pages cannot set response headers, so the policy is a <meta> tag. It is added
// to the built index.html only, because `npm run dev` needs an inline refresh script.
export default function contentSecurityPolicy(): Plugin {
  return {
    name: "content-security-policy",
    apply: "build",
    transformIndexHtml() {
      return [
        {
          tag: "meta",
          attrs: { "http-equiv": "Content-Security-Policy", content: POLICY },
          // A policy in a <meta> tag only covers what comes after it.
          injectTo: "head-prepend",
        },
      ];
    },
  };
}
