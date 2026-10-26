// Checks the size limits in spec section 6.6.2 on the build in dist/ (plan section 7.2, test 14):
// the gzipped JavaScript that each route loads on first load, and the size of each image.
// Run it after `npm run build`. It exits with 1 when a limit is exceeded.
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join } from "node:path";
import { gzipSync } from "node:zlib";

// 1 KB is 1,000 bytes, as in Vite's build report. This is the stricter reading of "KB".
const KB = 1000;
const SCRIPT_LIMIT = 300 * KB;
const IMAGE_LIMIT = 200 * KB;
const IMAGE_EXTENSIONS = [
  ".avif",
  ".gif",
  ".ico",
  ".jpeg",
  ".jpg",
  ".png",
  ".svg",
  ".webp",
];

const distDir = "dist";
const manifestPath = join(distDir, ".vite", "manifest.json");
if (!existsSync(manifestPath)) {
  console.error(`${manifestPath} was not found. Run npm run build first.`);
  process.exit(1);
}
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

const formatKb = (bytes) => `${(bytes / KB).toFixed(1)} KB`;

// The chunk for `key` and every chunk it imports statically. These load together.
// Dynamic imports load later, so they are not followed.
function staticClosure(key, seen = new Set()) {
  if (seen.has(key)) {
    return seen;
  }
  seen.add(key);
  for (const imported of manifest[key].imports ?? []) {
    staticClosure(imported, seen);
  }
  return seen;
}

function gzippedScriptSize(keys) {
  let total = 0;
  for (const key of keys) {
    const file = manifest[key].file;
    if (file.endsWith(".js")) {
      total += gzipSync(readFileSync(join(distDir, file))).length;
    }
  }
  return total;
}

function findImages(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      return findImages(path);
    }
    return IMAGE_EXTENSIONS.includes(extname(name).toLowerCase()) ? [path] : [];
  });
}

// 1. Work out what each route loads first. Every route loads the entry. A lazy route also
//    loads its own chunk, which the manifest lists as a dynamic import. A chunk that a lazy
//    route itself loads lazily on its first render is not counted, so avoid that pattern.
const entryKey = Object.keys(manifest).find((key) => manifest[key].isEntry);
const entryChunks = staticClosure(entryKey);
const lazyKeys = Object.keys(manifest).filter(
  (key) => manifest[key].isDynamicEntry,
);

const routes = [
  {
    name: lazyKeys.length === 0 ? "Every route (no lazy routes)" : "Entry only",
    chunks: entryChunks,
  },
  ...lazyKeys.map((key) => ({
    name: `Entry + ${key}`,
    chunks: new Set([...entryChunks, ...staticClosure(key)]),
  })),
];

// 2. Check the script size of each route.
let failed = false;
console.log(
  `JavaScript on first load, gzipped (limit ${formatKb(SCRIPT_LIMIT)}):`,
);
for (const route of routes) {
  const size = gzippedScriptSize(route.chunks);
  const tooBig = size > SCRIPT_LIMIT;
  failed ||= tooBig;
  console.log(
    `  ${tooBig ? "FAIL" : "ok  "} ${formatKb(size).padStart(10)}  ${route.name}`,
  );
}

// 3. Check the size of each image.
console.log(`\nImages (limit ${formatKb(IMAGE_LIMIT)} each):`);
for (const path of findImages(distDir)) {
  const size = statSync(path).size;
  const tooBig = size > IMAGE_LIMIT;
  failed ||= tooBig;
  console.log(
    `  ${tooBig ? "FAIL" : "ok  "} ${formatKb(size).padStart(10)}  ${path}`,
  );
}

// 4. Report the result.
if (failed) {
  console.error("\nA size limit is exceeded (spec section 6.6.2).");
  process.exit(1);
}
console.log("\nAll sizes are within the limits.");
